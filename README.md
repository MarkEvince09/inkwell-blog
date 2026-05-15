# Inkwell — Portfolio Blog

A read-only blog built with **React**, **Vite**, and **markdown** frontmatter. Designed as a portfolio piece to demonstrate routing, component architecture, and content-driven UI.

## Features

- Home page with hero and latest posts
- Blog listing with post cards
- Individual post pages rendered from markdown
- Filter by category (`/category/:name`) or tag (`/tag/:name`)
- Reading time, responsive layout, accessible markup
- SEO-friendly page titles and meta descriptions

## Tech stack

- React 19 + TypeScript
- Vite
- react-router-dom
- react-markdown + remark-gfm
- gray-matter

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Adding posts

Create a new `.md` file in `src/content/posts/` with YAML frontmatter:

```markdown
---
title: "Your Post Title"
slug: your-post-slug
date: 2026-05-15
excerpt: "Short description for cards and SEO."
coverImage: "https://example.com/image.jpg"
author: Your Name
categories: [React]
tags: [hooks]
---

Your markdown content here...
```

Posts are loaded at build time via `import.meta.glob` — no server required.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |

## Deploy

### Vercel

1. Push to GitHub and import on [vercel.com](https://vercel.com).
2. Build command: `npm run build`
3. Output directory: `dist`

For client-side routing, `vercel.json` is included to rewrite all routes to `index.html`.

### Netlify / GitHub Pages

Run `npm run build` and deploy the `dist` folder. For GitHub Pages, set `base` in `vite.config.ts` to your repository name.

## Project structure

```
src/
├── content/posts/     # Markdown blog posts
├── components/        # UI components
├── pages/             # Route pages
├── lib/               # Post loading & utilities
└── types/             # TypeScript types
```
