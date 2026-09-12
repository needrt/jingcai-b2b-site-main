# Next.js migration and technical SEO

Completed 2026-09-06. Intended production origin: https://jingcaithread.com.

## Implemented

- Standard Next.js 16.3.4 / React 19.2.6: next dev, next build, next start. No Vinext, Vite or Cloudflare compatibility runtime.
- Ten prerendered locale routes; localized initial HTML, html lang/dir, titles, descriptions and share metadata. English at /; no Chinese website route.
- Self-canonical URLs and reciprocal hreflang for all locales plus x-default; matching XML sitemap. Real locale links in menu and footer.
- Verified company/contact information in Organization, WebSite and WebPage JSON-LD. FAQ schema matches the complete FAQ answers present in HTML.
- Self-hosted Geist, Next Image hero optimization on the standard server, lazy loading for other photos and videos.
- Separate production indexing configuration and private-preview noindex. Optional Search Console verification token; no analytics or external submission was silently added.

## Validation

- Standard Next.js production build and TypeScript check.
- Production and private-preview static export SEO checks across all ten locales, without executing JavaScript.
- Standard Next.js HTTP check: ten locale pages 200, unsupported paths 404, trailing-slash 308, sitemap/robots 200, image optimizer 200 and MP4 byte-range 206.

The Sites publication is a private preview of the official Next.js static export. The normal Next.js server build is the production deployment option. Domain registration, DNS, public access and Search Console ownership/submission are not completed by this code migration. Configure the production host and domain before requesting Google indexing. Technical SEO does not establish ranking or organic traffic results.

References:
- https://nextjs.org/docs/app/guides/static-exports
- https://nextjs.org/docs/app/api-reference/file-conventions/layout
- https://developers.google.com/search/docs/specialty/international/localized-versions
