'use client';
/* oxlint-disable next/no-img-element -- Images are pre-optimized local WebP assets with reserved layout dimensions. */
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Layers3,
  MoveUpRight,
  MessageCircle,
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import {
  ColorSection,
  AboutSection,
  FAQSection,
  ContactSection,
  ProductDetails,
  WA,
} from './sections';
import { useI18n } from '@/lib/i18n';
import { SUPPORTED_LOCALES, localePath } from '@/lib/i18n';
import { LanguageSwitcher } from '@/components/language-switcher';

const FB = 'https://www.facebook.com/isla.zhu';

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const { t, dir } = useI18n();

  return (
    <>
      <a href="#main" className="skip-link">
        {t.header.skipLink}
      </a>
      <div className="topline" id="top">
        <span>{t.topline.company}</span>
        <span>{t.topline.tagline}</span>
      </div>
      <header className="header" dir="ltr">
        <a className="wordmark" href="#top" aria-label="Jingcai home">
          JINGCAI<span>{t.header.wordmarkSub}</span>
        </a>
        <nav className={menu ? 'nav open' : 'nav'} aria-label="Main navigation">
          <a onClick={() => setMenu(false)} href="#products">
            {t.header.navProducts}
          </a>
          <a onClick={() => setMenu(false)} href="#colors">
            {t.header.navColors}
          </a>
          <a onClick={() => setMenu(false)} href="#about">
            {t.header.navFactory}
          </a>
          <a onClick={() => setMenu(false)} href="#films">
            {t.header.navFilms}
          </a>
          <div className="mobile-language-switcher">
            <LanguageSwitcher />
          </div>
        </nav>
        <div className="header-actions">
          <div className="desktop-language-switcher">
            <LanguageSwitcher />
          </div>
          <a className="button small" href="#contact" dir={dir}>
            {t.header.cta} <ArrowUpRight size={17} />
          </a>
          <button
            className="menu-toggle"
            aria-label={menu ? t.header.menuClose : t.header.menuOpen}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              {t.hero.eyebrow}
            </p>
            <h1>
              {t.hero.title1}
              <br />
              {t.hero.title2}
              <br />
              <em>{t.hero.title3}</em>
            </h1>
            <p className="hero-description">
              {t.hero.desc1}
              <br />
              {t.hero.desc2}
            </p>
            <div className="hero-buttons">
              <a className="button" href="#products">
                {t.hero.btnProducts} <ArrowUpRight size={19} />
              </a>
              <a className="text-link" href="#contact">
                {t.hero.btnContact} <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-note">
              <span className="tiny-line" />
              {t.hero.note}
            </div>
          </div>
          <div className="hero-visual">
            <Image
              width={1600}
              height={1200}
              sizes="(max-width: 760px) 100vw, 55vw"
              src="/images/hero.webp"
              alt="Editorial arrangement of sewing thread cones with natural woven fabric"
              preload
            />
            <span className="image-label">{t.hero.visualLabel}</span>
            <a
              href="#products"
              className="visual-arrow"
              aria-label={t.hero.btnProducts}
            >
              <MoveUpRight />
            </a>
          </div>
          <div className="hero-index">
            <span>{t.hero.collectionIndex}</span>
            <span>{t.hero.scrollPrompt}</span>
          </div>
        </section>
        <section className="proof-strip">
          <div>
            <strong>{t.proof.yearVal}</strong>
            <span>{t.proof.yearLabel}</span>
          </div>
          <div>
            <strong>
              {t.proof.colorsVal.replace('+', '')}
              <span>+</span>
            </strong>
            <span>{t.proof.colorsLabel}</span>
          </div>
          <div>
            <strong>{t.proof.partnerVal}</strong>
            <span>{t.proof.partnerLabel}</span>
          </div>
          <div className="proof-last">
            <Layers3 size={25} />
            <span>
              {t.proof.badge1}
              <br />
              {t.proof.badge2}
            </span>
          </div>
        </section>
        <section className="section" id="products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{t.products.eyebrow}</p>
              <h2>
                {t.products.title1}
                <br />
                {t.products.title2}
              </h2>
            </div>
            <p>
              {t.products.subtitle1}
              <br />
              {t.products.subtitle2}
            </p>
          </div>
          <div className="product-grid">
  {[
    {
      key: 'polyester',
      image: 'collection',
      name: '100% Spun polyester Sewing Thread',
      note: '100% Polyester',
      description: 'Supports customization',
      comingSoon: false,
    },
    {
      key: 'bag-closing',
      image: 'close bag',
      name: 'Bag Closing Thread',
      note: 'For bag closing',
      description: 'Supports customization',
      comingSoon: false,
    },
    {
      key: 'greige-yarn',
      image: 'greige-yarn',
      name: 'Yarn',
      note: 'Greige Yarn',
      description: 'Colorful yarn for further processing',
      comingSoon: false,
    },
    {
  key: 'cotton',
  image: 'cotton',
  name: '100% Cotton Sewing Thread',
  note: 'Cotton Thread',
  description: 'Supports customization',
  comingSoon: false,
},
    {
      key: 'coming-soon-1',
      image: null,
      name: 'Coming Soon',
      note: 'New Product',
      description: 'More products coming soon',
      comingSoon: true,
    },
    {
      key: 'coming-soon-2',
      image: null,
      name: 'Coming Soon',
      note: 'New Product',
      description: 'More products coming soon',
      comingSoon: true,
    },
  ].map((p) => (
    <button
      key={p.key}
      className="product-card"
      disabled={p.comingSoon}
      onClick={() => {
        if (!p.comingSoon && p.image) {
          setSelected(p.image);
        }
      }}
    >
      <div className="product-image">
        {p.image ? (
          <img
            width={1600}
            height={1200}
            src={'/images/' + p.image + '.webp'}
            alt={p.name}
            loading="lazy"
          />
        ) : (
          <div className="product-placeholder">
            <span>COMING SOON</span>
          </div>
        )}

        <span className="product-tag">
          {p.comingSoon ? 'COMING SOON' : 'PRODUCT'}
        </span>

        {!p.comingSoon && (
          <span className="product-arrow">
            <ArrowUpRight size={20} />
          </span>
        )}
      </div>

      <p className="eyebrow">{p.note}</p>
      <h3>{p.name}</h3>
      <p>{p.description}</p>
    </button>
  ))}
</div>
          <div className="range-note">
            <p>{t.products.rangeNote}</p>
            <a className="text-link" href="#contact">
              {t.products.rangeCta} <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
        <ColorSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>
      <footer>
        <a className="wordmark" href="#top">
          JINGCAI<span>{t.header.wordmarkSub}</span>
        </a>
        <p>{t.footer.company}</p>
        <a href={FB} target="_blank" rel="noreferrer">
          Facebook <ArrowUpRight size={15} />
        </a>
      </footer>
      <nav className="footer-languages" aria-label={t.header.langSelectLabel}>
        {SUPPORTED_LOCALES.map(item => <a key={item.code} href={localePath(item.code)} hrefLang={item.code} lang={item.code}>{item.nativeName}</a>)}
      </nav>
      <div className="footer-base">
        <span>
          {t.footer.rights.replace('{year}', String(new Date().getFullYear()))}
        </span>
        <span>{t.footer.tagline}</span>
      </div>
      <a
        className="floating-contact"
        href={WA}
        target="_blank"
        rel="noreferrer"
        aria-label={t.footer.waAria}
      >
        <MessageCircle size={22} />
      </a>
      <ProductDetails selected={selected} onClose={() => setSelected(null)} />
    </>
  );
}
