# Axodus Academy Institutional Website

Static institutional website for Axodus Academy, built with Next.js and ready
for deployment on Vercel.

## Local development

Requirements:

- Node.js 22.13 or newer
- npm

Install and run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

The project uses Next.js static export. Generated files are written to `out/`.

## Deploy with Vercel

1. Add this folder to a GitHub repository.
2. Import the repository at `vercel.com/new`.
3. Keep the detected framework as **Next.js**.
4. Leave the root directory as the repository root, or select this folder if it
   is stored inside a monorepo.
5. Deploy. No environment variables are required.

## Main links

- Public development environment: `https://dev.academy.country`
- Institutional canonical URL configured in metadata: `https://academy.country`

## Project structure

- `app/page.tsx` — landing page content and CTA tracking.
- `app/globals.css` — complete responsive visual system.
- `app/layout.tsx` — SEO and social metadata.
- `public/assets/` — official Axodus visual identity assets.

CTA clicks dispatch an `academy:cta` browser event and use `window.dataLayer`
when an analytics integration provides it.
