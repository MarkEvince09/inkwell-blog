# Inkwell — Portfolio Blog

A portfolio blog built with **React**, **Vite**, and **markdown** frontmatter. Includes an optional Node API with simulated Redis (post cache) and Kafka-style comment queuing.

## Features

- Amber–orange–black gradient theme with white content panels
- Horizontal rectangular post cards
- Home page with hero and latest posts
- Blog listing with post cards
- Individual post pages rendered from markdown
- Filter by category (`/category/:name`) or tag (`/tag/:name`)
- Comments on posts (via API + async event queue)
- Reading time, responsive layout, accessible markup
- SEO-friendly page titles and meta descriptions

## Tech stack

- React 19 + TypeScript
- Vite
- react-router-dom
- react-markdown + remark-gfm
- js-yaml (frontmatter parsing)
- Express API (optional, local dev)
- Simulated Redis (in-memory post JSON cache)
- Simulated Kafka (in-memory comment queue + consumer)

## Getting started

### Frontend only

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Frontend + API (posts cache + comments)

```bash
npm install
npm run dev:all
```

This runs the Vite dev server and the API on port 3001. Post detail pages fetch from the cache API; comments require the API.

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

Posts are bundled via `import.meta.glob`. The API warms an in-memory cache of each post as a single JSON string on startup.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run dev:server` | Start Express API only |
| `npm run dev:all` | Start API + Vite together |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Deploy

### Vercel (frontend)

1. Push to GitHub and import on [vercel.com](https://vercel.com).
2. Build command: `npm run build`
3. Output directory: `dist`

For client-side routing, `vercel.json` is included to rewrite all routes to `index.html`.

The API is for local development. Deploy it separately (Railway, Render, etc.) if you need comments in production.

## Project structure

```
src/
├── content/posts/     # Markdown blog posts
├── components/        # UI components
├── pages/             # Route pages
├── lib/               # Post loading, API client
└── types/             # TypeScript types
server/
├── cache/             # Simulated Redis (JSON string store)
├── messaging/         # Simulated Kafka (comment queue)
├── routes/            # Express routes
└── services/          # Post loading & cache warming
```
