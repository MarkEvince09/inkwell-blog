import { Link, useParams } from 'react-router-dom'
import { getPostBySlug } from '../lib/posts'
import { formatDate } from '../lib/formatDate'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { CategoryTag } from '../components/CategoryTag'
import { usePageTitle, useMetaDescription } from '../hooks/usePageTitle'
import './PostDetail.css'

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  usePageTitle(post?.title ?? 'Post not found')
  useMetaDescription(post?.excerpt ?? 'The requested post could not be found.')

  if (!post) {
    return (
      <div className="post-not-found">
        <h1>Post not found</h1>
        <p>The article you are looking for does not exist.</p>
        <Link to="/blog">Back to blog</Link>
      </div>
    )
  }

  return (
    <article className="post-detail">
      {post.coverImage && (
        <img src={post.coverImage} alt="" className="post-detail__cover" />
      )}
      <header className="post-detail__header">
        <div className="pill-list">
          {post.categories.map((category) => (
            <CategoryTag key={category} label={category} type="category" />
          ))}
        </div>
        <h1>{post.title}</h1>
        <div className="post-detail__meta">
          <span>{post.author}</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime} min read</span>
        </div>
        {post.tags.length > 0 && (
          <div className="pill-list post-detail__tags">
            {post.tags.map((tag) => (
              <CategoryTag key={tag} label={tag} type="tag" />
            ))}
          </div>
        )}
      </header>
      <MarkdownRenderer content={post.content} />
      <footer className="post-detail__footer">
        <Link to="/blog">&larr; Back to all posts</Link>
      </footer>
    </article>
  )
}
