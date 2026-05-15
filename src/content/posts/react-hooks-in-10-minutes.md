---
title: "React Hooks in 10 Minutes"
slug: react-hooks-in-10-minutes
date: 2026-05-05
excerpt: "A quick primer on useState and useEffect — the two hooks you'll reach for most often."
coverImage: "https://picsum.photos/seed/react-hooks/800/450"
author: Bharat
categories: [React, Tutorial]
tags: [hooks, useState, useEffect]
---

## useState

`useState` lets functional components hold local state:

```jsx
const [count, setCount] = useState(0)
```

Call `setCount` with a new value (or updater function) to trigger a re-render.

## useEffect

`useEffect` runs side effects after render — fetching data, subscribing to events, or syncing with the DOM:

```jsx
useEffect(() => {
  document.title = `Count: ${count}`
}, [count])
```

The dependency array controls **when** the effect re-runs. An empty array means "run once on mount."

## Rules of hooks

1. Only call hooks at the **top level** of a component (not inside loops or conditions).
2. Only call hooks from **React functions** — components or custom hooks.

## When to extract a custom hook

If you repeat the same state + effect logic across components, wrap it in `useSomething()` — for example `usePageTitle(title)` in this very blog.

That pattern keeps components focused on UI while sharing behavior cleanly.
