import { useParams } from 'react-router-dom'
import { getPostsByCategory, getPostsByTag } from '../lib/posts'
import { PostList } from '../components/PostList'
import { usePageTitle } from '../hooks/usePageTitle'
import './Blog.css'

interface FilteredPostsProps {
  type: 'category' | 'tag'
}

export function FilteredPosts({ type }: FilteredPostsProps) {
  const { name } = useParams<{ name: string }>()
  const decodedName = name ? decodeURIComponent(name) : ''

  const posts =
    type === 'category'
      ? getPostsByCategory(decodedName)
      : getPostsByTag(decodedName)

  const label = type === 'category' ? 'Category' : 'Tag'
  usePageTitle(`${label}: ${decodedName}`)

  return (
    <div className="blog-page">
      <header className="page-header">
        <h1>
          {label}: <span className="filter-name">{decodedName}</span>
        </h1>
        <p>
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} found.
        </p>
      </header>
      <PostList
        posts={posts}
        emptyMessage={`No posts found for this ${type}.`}
      />
    </div>
  )
}
