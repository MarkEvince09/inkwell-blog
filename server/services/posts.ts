import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postCache, postKey } from '../cache/postCache.js'
import { parseFrontmatter } from '../lib/parseFrontmatter.js'
import type { Post, PostFrontmatter } from '../types/post.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = path.resolve(__dirname, '../../src/content/posts')

function normalizeDate(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10)
  }
  return String(value)
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

function parsePost(raw: string, filename: string): Post {
  const { data, content } = parseFrontmatter<PostFrontmatter>(raw)
  const slug = data.slug || filename.replace(/\.md$/, '')

  return {
    title: data.title,
    slug,
    date: normalizeDate(data.date),
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    author: data.author,
    categories: data.categories ?? [],
    tags: data.tags ?? [],
    content,
    readingTime: calculateReadingTime(content),
  }
}

export function cachePostAsString(post: Post): void {
  postCache.set(postKey(post.slug), JSON.stringify(post))
}

export async function warmPostCache(): Promise<number> {
  const files = await readdir(POSTS_DIR)
  const mdFiles = files.filter((f) => f.endsWith('.md'))
  const posts: Post[] = []

  for (const file of mdFiles) {
    const raw = await readFile(path.join(POSTS_DIR, file), 'utf8')
    posts.push(parsePost(raw, file))
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  for (const post of posts) {
    cachePostAsString(post)
  }

  return posts.length
}

export function getCachedPost(slug: string): Post | null {
  const raw = postCache.get(postKey(slug))
  if (!raw) return null
  return JSON.parse(raw) as Post
}

export function getCachedPostSummaries(): Omit<Post, 'content'>[] {
  return postCache
    .keys()
    .filter((k) => k.startsWith('post:'))
    .map((k) => {
      const raw = postCache.get(k)!
      const post = JSON.parse(raw) as Post
      const { content: _, ...summary } = post
      return summary
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
