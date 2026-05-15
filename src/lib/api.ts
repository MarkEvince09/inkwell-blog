import type { Post } from '../types/post'
import { getPostBySlug } from './posts'

const API_BASE = '/api'

export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_BASE}/posts/${encodeURIComponent(slug)}`)
    if (res.ok) {
      return (await res.json()) as Post
    }
  } catch {
    // API unavailable — fall back to bundled markdown
  }
  return getPostBySlug(slug) ?? null
}

export async function fetchPostSummaries(): Promise<Omit<Post, 'content'>[] | null> {
  try {
    const res = await fetch(`${API_BASE}/posts`)
    if (res.ok) {
      return (await res.json()) as Omit<Post, 'content'>[]
    }
  } catch {
    // ignore
  }
  return null
}
