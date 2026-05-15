import { Link } from 'react-router-dom'
import type { Post } from '../types/post'
import { formatDate } from '../lib/formatDate'
import { CategoryTag } from './CategoryTag'
import './PostCard.css'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <Link to={`/blog/${post.slug}`} className="post-card__image-link">
        {post.coverImage ? (
          <img src={post.coverImage} alt="" className="post-card__image" loading="lazy" />
        ) : (
          <div className="post-card__placeholder" aria-hidden="true" />
        )}
      </Link>
      <div className="post-card__body">
        <div className="pill-list">
          {post.categories.map((category) => (
            <CategoryTag key={category} label={category} type="category" />
          ))}
        </div>
        <h2 className="post-card__title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="post-card__excerpt">{post.excerpt}</p>
        <div className="post-card__meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </article>
  )
}
