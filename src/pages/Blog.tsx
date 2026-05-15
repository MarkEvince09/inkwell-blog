import { getAllPosts } from '../lib/posts'
import { PostList } from '../components/PostList'
import { usePageTitle } from '../hooks/usePageTitle'
import './Blog.css'

export function Blog() {
  usePageTitle('Blog')
  const posts = getAllPosts()

  return (
    <div className="blog-page">
      <header className="page-header">
        <h1>All posts</h1>
        <p>{posts.length} articles on development, design, and more.</p>
      </header>
      <PostList posts={posts} />
    </div>
  )
}
