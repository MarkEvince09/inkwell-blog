import type { Post, PostFrontmatter } from '../types/post'
import { calculateReadingTime } from './readingTime'
import { parseFrontmatter } from './parseFrontmatter'

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }
  return String(value)
}

const postModules = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parsePost(raw: string, filepath: string): Post {
  const { data, content } = parseFrontmatter<PostFrontmatter>(raw)
  const fm = data
  const filename = filepath.split('/').pop()?.replace('.md', '') ?? ''
  const slug = fm.slug || filename

  return {
    title: fm.title,
    slug,
    date: normalizeDate(fm.date),
    excerpt: fm.excerpt,
    coverImage: fm.coverImage,
    author: fm.author,
    categories: fm.categories ?? [],
    tags: fm.tags ?? [],
    content,
    readingTime: calculateReadingTime(content),
  }
}

const allPosts: Post[] = Object.entries(postModules)
  .map(([path, raw]) => parsePost(raw, path))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getAllPosts(): Post[] {
  return allPosts
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((post) => post.slug === slug)
}

export function getPostsByCategory(category: string): Post[] {
  const normalized = category.toLowerCase()
  return allPosts.filter((post) =>
    post.categories.some((c) => c.toLowerCase() === normalized),
  )
}

export function getPostsByTag(tag: string): Post[] {
  const normalized = tag.toLowerCase()
  return allPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === normalized),
  )
}

export function getAllCategories(): string[] {
  const categories = new Set<string>()
  allPosts.forEach((post) => post.categories.forEach((c) => categories.add(c)))
  return Array.from(categories).sort()
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  allPosts.forEach((post) => post.tags.forEach((t) => tags.add(t)))
  return Array.from(tags).sort()
}
