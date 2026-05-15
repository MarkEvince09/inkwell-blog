---
title: "Deploying a Vite App to Vercel"
slug: deploying-vite-to-vercel
date: 2026-05-12
excerpt: "Ship your static React build in minutes with Vercel's zero-config hosting."
coverImage: "https://picsum.photos/seed/vercel-deploy/800/450"
author: Bharat
categories: [DevOps]
tags: [vite, vercel, deployment]
---

## Build locally first

Always verify the production build before deploying:

```bash
npm run build
npm run preview
```

If `preview` looks correct, you're ready to deploy.

## Deploy with Vercel

1. Push your project to GitHub.
2. Import the repo at [vercel.com](https://vercel.com).
3. Vercel auto-detects Vite — default settings usually work:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`

## Environment notes

This blog has **no backend** — it's a static SPA. Vercel serves the built files from `dist/` and handles client-side routing if you add a `vercel.json` rewrite (optional for SPAs using `BrowserRouter`).

## Alternatives

- **Netlify** — drag-and-drop the `dist` folder or connect Git
- **GitHub Pages** — set `base` in `vite.config.ts` to your repo name

Choose whichever fits your workflow; the build output is the same.
