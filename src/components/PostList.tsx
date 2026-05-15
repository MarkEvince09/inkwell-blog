import type { Post } from '../types/post'
import { PostCard } from './PostCard'
import './PostList.css'

interface PostListProps {
  posts: Post[]
  emptyMessage?: string
}

export function PostList({ posts, emptyMessage = 'No posts found.' }: PostListProps) {
  if (posts.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
