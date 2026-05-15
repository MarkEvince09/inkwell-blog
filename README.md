# Inkwell — Portfolio Blog

**Inkwell** is a portfolio-ready blog built with React, Vite, and markdown. It demonstrates modern front-end patterns (routing, component architecture, content-driven UI) plus an optional Node.js API that simulates **Redis** (post caching) and **Kafka** (comment load handling) for learning and demos.

**Live repo:** [github.com/MarkEvince09/inkwell-blog](https://github.com/MarkEvince09/inkwell-blog)

---

## Features

### Design & UI

- **Amber–orange gradient background** — warm full-page gradient (no black in the gradient)
- **Black content panels** — header, footer, cards, hero, blog sections, and article areas use a dark surface
- **White typography** — headings, body copy, and meta text tuned for contrast on black panels
- **Horizontal rectangular post cards** — image on the left, title and excerpt on the right; stacks vertically on mobile
- **Responsive layout** — readable from phone to desktop
- **Accessible markup** — semantic HTML, focus styles, ARIA where needed

### Content & routing

- **Home page** — hero section and latest posts
- **Blog listing** — all posts in rectangular cards
- **Post detail pages** — markdown rendered with GFM (tables, task lists, etc.)
- **Category & tag filters** — `/category/:name` and `/tag/:name`
- **Reading time** — estimated from word count
- **SEO helpers** — dynamic page titles and meta descriptions

### Backend patterns (local API)

- **Simulated Redis** — each post cached as a **single JSON string** (`post:{slug}`) for fast repeated reads
- **Simulated Kafka** — comments enqueued and processed by a background consumer so many simultaneous writes do not block the HTTP thread
- **Comment section** — name + body form on each post; `POST` returns `202 Accepted` quickly
- **Graceful fallback** — if the API is offline, post pages still load from bundled markdown

---

## What we built & achieved

This project grew from a static Vite blog into a fuller portfolio piece. Here is what was delivered:

| Area | What we did | What we achieved |
|------|-------------|------------------|
| **Styling** | Amber/orange gradient theme, black panels, white text, rectangular cards | A distinctive, cohesive visual identity suitable for a portfolio |
| **Content** | Markdown + YAML frontmatter, `import.meta.glob` loading | Add posts without a CMS; fast local dev and static deploy |
| **Reliability** | Replaced `gray-matter` with browser-safe `js-yaml` parsing | Fixed blank-page crash (`Buffer is not defined`) in production builds |
| **Caching** | Express + in-memory Redis-shaped cache | Posts served as one string per slug; demonstrates cache-warm on startup |
| **Comments** | In-memory queue + consumer (Kafka-shaped) | Non-blocking comment API under concurrent submissions |
| **Git** | 11 commits on `master` (initial + 10 feature commits) | Clear history: theme → panels → cache → comments → cards |
| **Deploy** | Vercel-ready static build + `vercel.json` SPA rewrites | Frontend deploys to Vercel; API runs locally or on a separate host |

### Commit history (high level)

1. Initial commit — Inkwell blog scaffold  
2. Gradient theme tokens  
3. White/black panel system (later refined to **black panels + white text**)  
4. Hero and layout panels  
5. Post detail & markdown surfaces  
6. Post cache layer (simulated Redis)  
7. Cache API + Vite proxy + `PostDetail` fetch  
8. Comment event bus (simulated Kafka)  
9. Comment UI on post pages  
10. Rectangular post cards  
11. Responsive card polish  

---

## Tech stack

| Layer | Tools |
|-------|--------|
| **Frontend** | React 19, TypeScript, Vite 8, react-router-dom |
| **Content** | Markdown, js-yaml, react-markdown, remark-gfm |
| **API** | Express, cors, tsx |
| **Dev** | ESLint, concurrently |
| **Simulated infra** | In-memory Map (Redis-shaped), in-memory queue (Kafka-shaped) |

---

## Getting started

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm

### Install

```bash
npm install
```

### Frontend only

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Frontend + API (cache + comments)

```bash
npm run dev:all
```

- Vite: `http://localhost:5173`  
- API: `http://localhost:3001`  
- Vite proxies `/api` → the API server  

---

## Adding posts

Create a `.md` file in `src/content/posts/`:

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

Rebuild or restart dev; the API re-reads markdown on startup when using `dev:server` / `dev:all`.

---

## API overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/posts` | List posts (summaries, no body) |
| `GET` | `/api/posts/:slug` | Full post from cache |
| `GET` | `/api/posts/:slug/comments` | Comments for a post |
| `POST` | `/api/posts/:slug/comments` | Queue a comment (`202 Accepted`) |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run dev:server` | Express API only |
| `npm run dev:all` | API + Vite together |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview `dist` locally |
| `npm run lint` | ESLint |

---

## Deploy

### Vercel (frontend)

1. Import the GitHub repo on [vercel.com](https://vercel.com).  
2. **Build command:** `npm run build`  
3. **Output directory:** `dist`  

`vercel.json` rewrites all routes to `index.html` for client-side routing.

The **API is optional** for production static hosting. Deploy `server/` separately (Railway, Render, Fly.io, etc.) if you need live comments in production.

---

## Project structure

```
blog-post-website/
├── public/                 # Static assets (favicon, etc.)
├── src/
│   ├── content/posts/      # Markdown source of truth
│   ├── components/         # PostCard, CommentSection, layout, etc.
│   ├── pages/              # Home, Blog, PostDetail, filters
│   ├── lib/                # posts.ts, api.ts, parseFrontmatter.ts
│   └── types/
├── server/
│   ├── cache/              # Simulated Redis (postCache.ts)
│   ├── messaging/          # Simulated Kafka (commentBus.ts)
│   ├── routes/             # posts, comments
│   └── services/           # Load markdown, warm cache
├── index.html
├── vite.config.ts          # Includes /api proxy in dev
└── vercel.json
```

---

## Author

Built as a **portfolio blog** by Bharat — showcasing React, Vite, markdown content, and backend-style patterns (cache + message queue) in a deployable front-end project.
