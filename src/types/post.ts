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

export interface Post extends PostFrontmatter {
  content: string
  readingTime: number
}
