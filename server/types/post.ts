export interface Post {
  title: string
  slug: string
  date: string
  excerpt: string
  coverImage?: string
  author: string
  categories: string[]
  tags: string[]
  content: string
  readingTime: number
}

export interface PostFrontmatter {
  title: string
  slug: string
  date: string
  excerpt: string
  coverImage?: string
  author: string
  categories: string[]
  tags: string[]
}
