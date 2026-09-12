import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const root=path.resolve(process.env.SEO_OUTPUT_DIR || 'out');
const origin=(process.env.NEXT_PUBLIC_SITE_URL || 'https://jingcaithread.com').replace(/\/$/,'');
const indexable=process.env.SEO_INDEXABLE !== 'false';
const locales=['en','ar','es','ru','fr','pt','de','ja','ko','vi'];
const urlFor=locale => origin+(locale==='en' ? '/' : `/${locale}/`);
const attributes=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match=>[match[1],match[2].replaceAll('&amp;','&')]));
const titles=new Set();
for (const locale of locales) {
  const file=path.join(root,locale==='en' ? 'index.html' : `${locale}/index.html`);
  const html=readFileSync(file,'utf8');
  const body=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
  const htmlAttrs=attributes(html.match(/<html\b[^>]*>/)[0]);
  assert.equal(htmlAttrs.lang,locale,`${locale}: server HTML language`);
  assert.equal(htmlAttrs.dir,locale==='ar'?'rtl':'ltr',`${locale}: server HTML direction`);
  assert.equal((body.match(/<h1\b/g)||[]).length,1,`${locale}: one visible H1`);
  assert.ok(body.includes('JINGCAI') && body.includes('id="products"') && body.includes('id="factory"') && body.includes('id="contact"'),`${locale}: pre-rendered page sections`);
  const title=html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title),`${locale}: unique localized title`);titles.add(title);
  const metas=[...html.matchAll(/<meta\b[^>]*>/g)].map(match=>attributes(match[0]));
  assert.ok(metas.find(meta=>meta.name==='description')?.content.length>50,`${locale}: description`);
  const robots=metas.find(meta=>meta.name==='robots')?.content || '';
  assert.ok(indexable ? !robots.includes('noindex') && robots.includes('index') : robots.includes('noindex'),`${locale}: indexing policy`);
  assert.equal(metas.find(meta=>meta.property==='og:url')?.content,urlFor(locale));
  assert.equal(metas.find(meta=>meta.name==='twitter:card')?.content,'summary_large_image');
  const links=[...html.matchAll(/<link\b[^>]*>/g)].map(match=>attributes(match[0]));
  assert.equal(links.find(link=>link.rel==='canonical')?.href,urlFor(locale),`${locale}: self canonical`);
  const alternates=links.filter(link=>link.rel==='alternate' && link.hrefLang);
  assert.equal(alternates.length,11,`${locale}: complete hreflang cluster`);
  for(const other of locales) assert.equal(alternates.find(link=>link.hrefLang===other)?.href,urlFor(other));
  assert.equal(alternates.find(link=>link.hrefLang==='x-default')?.href,origin+'/');
  assert.ok(!alternates.some(link=>link.hrefLang==='zh'));
  const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const faq=graph.find(item=>item['@type']==='FAQPage');
  assert.ok(faq.mainEntity.length>=3);
  for(const item of faq.mainEntity) {
    const decode=value=>value.replaceAll('&amp;','&').replaceAll('&#x27;',"'").replaceAll('&quot;','"').replaceAll('&#39;',"'");
    assert.ok(decode(body).includes(item.acceptedAnswer.text),`${locale}: FAQ answer exists without executing JavaScript`);
  }
  for (const tag of body.matchAll(/<img\b[^>]*>/g)) assert.notEqual(attributes(tag[0]).alt,undefined,`${locale}: image alternative text`);
  for (const tag of body.matchAll(/<(?:img|video|source|script|link)\b[^>]*>/g)) {
    const attrs=attributes(tag[0]);
    for(const value of [attrs.src,attrs.poster,attrs.rel==='stylesheet'?attrs.href:undefined]) {
      if(value?.startsWith('/') && !value.startsWith('//') && !value.startsWith('/_next/image')) assert.ok(existsSync(path.join(root,value.split('?')[0])),`${locale}: local asset ${value}`);
    }
  }
  assert.ok(!html.includes('vinext'),`${locale}: no compatibility runtime`);
}
const sitemap=readFileSync(path.join(root,'sitemap.xml'),'utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,10);
for(const locale of locales)assert.ok(sitemap.includes(`<loc>${urlFor(locale)}</loc>`));
const robots=readFileSync(path.join(root,'robots.txt'),'utf8');
assert.ok(indexable?robots.includes(`Sitemap: ${origin}/sitemap.xml`):robots.includes('Disallow: /'));
assert.ok(existsSync(path.join(root,'404.html')));
console.log(`SEO checks passed: ${locales.length} localized HTML pages, canonical/hreflang, server-rendered FAQ, metadata, schema, assets, sitemap and ${indexable?'production indexing':'preview noindex'}.`);
