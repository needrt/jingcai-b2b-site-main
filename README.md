# JINGCAI Thread — standard Next.js

Standard Next.js 16 App Router, React 19, TypeScript and Tailwind CSS. Vinext, Vite, the compatibility type aliases and the Cloudflare-specific runtime have been removed. Node 22.13+ is recommended.

## Run locally or deploy to a Next.js host

```sh
npm ci
cp .env.example .env.local
npm run dev
# Production Node.js or a standard Next.js host:
npm run build
npm start
```

Production origin: `https://jingcaithread.com`. Configure `NEXT_PUBLIC_SITE_URL` before building; set `SEO_INDEXABLE=true` only for the production deployment. `GOOGLE_SITE_VERIFICATION` optionally supplies a Search Console HTML verification token. Never put a Google API key here.

`npm run build` uses the real `next build`; `npm start` uses `next start`. Deploy this directory to a standard Next.js hosting provider without a compatibility adapter. The primary build keeps Next.js image optimization available.

## SEO and languages

- English `/`; Arabic `/ar/`; Spanish `/es/`; Russian `/ru/`; French `/fr/`; Portuguese `/pt/`; German `/de/`; Japanese `/ja/`; Korean `/ko/`; Vietnamese `/vi/`.
- Each route produces localized HTML at build time, including its document `lang`/`dir`, content, unique title/description, self-canonical, reciprocal hreflang with x-default, Open Graph and Twitter metadata. No browser-language redirect or localStorage-dependent initial translation. Chinese is not a website locale.
- Language menu and footer use real links. Explicit legacy `?lang=ar` / `?locale=ar` links navigate to the corresponding path in the browser.
- `/sitemap.xml` lists all 10 canonical routes with language alternates. No fabricated last-modified dates.
- `/robots.txt` and metadata share the build-time `SEO_INDEXABLE` setting.
- JSON-LD describes the company, website, localized page and visible FAQs. Sales languages are limited to the verified English/Chinese contact languages, independently of translated site languages. There are no invented reviews, prices, certification claims or video upload dates.
- FAQ answers remain in the initial HTML, even when collapsed. Hero uses Next Image; other supplied WebP photographs retain dimensions, alternative text and lazy loading. Geist is self-hosted, with swap, and does not require Google Fonts requests at build/runtime.
- Videos retain the compact gallery and viewport-based loading. SEO work does not change the inquiry flow: it prepares a WhatsApp message, which the visitor sends themselves.

## Optional static export and private preview

```sh
npm run build:static
npm run check:seo
# Private preview (do not let staging compete with production):
SEO_INDEXABLE=false npm run build:static
SEO_INDEXABLE=false npm run check:seo
```

Static export is an official Next.js output mode. It writes `out/`. Run `npm run build` again before `npm start` when switching back from export to the Node.js server build. Static hosts serve exported HTML and assets; the exported hero uses the preoptimized original WebP because a static host cannot run the Next Image service. Configure directory-index routing and serve `404.html` for unknown paths; do not use a catch-all SPA fallback. `.openai/hosting.json` configures the existing Sites preview only, not the production Next.js runtime.

## Validate

```sh
npm run build
npm run typecheck
npm run build:static
npm run check:seo
# With npm start -- --port 3001 running:
npm run check:server
```

The SEO check reads exported HTML without executing client JavaScript. It checks all 10 locales, canonical/hreflang reciprocity, descriptions, schemas, FAQ text, local assets, sitemap and indexing policy.

## Files

- `app/home.tsx`, `app/sections.tsx`, `app/factory.tsx`: existing design and interaction.
- `app/(english)/` and `app/[locale]/`: standard Next.js routes and root layouts.
- `app/site-layout.tsx`: server-rendered language/direction, self-hosted font and schema.
- `lib/seo/`: localized SEO text, origin, metadata and structured data.
- `lib/i18n/`: translations and locale paths; the client receives only the active dictionary.
- `content/`: original company, image and video provenance.

## Public launch checklist

1. Deploy the standard Next.js build to the production host, bind `jingcaithread.com`, and enable HTTPS. Redirect `www` to the chosen apex origin at that host.
2. Build production with `NEXT_PUBLIC_SITE_URL=https://jingcaithread.com` and `SEO_INDEXABLE=true`; keep the Sites preview private and noindex.
3. Verify domain ownership in Search Console and submit `https://jingcaithread.com/sitemap.xml` after the domain serves the new site. No submission or domain/DNS changes are performed by this migration.
4. Check public 200 responses, unknown-path 404, canonical URLs, robots and language links on the real domain. Private preview checks do not establish that Google can index the public site.
