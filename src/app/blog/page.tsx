import { Metadata } from 'next'
import Link from 'next/link'
import { PageLayout } from '@/components/template/PageLayout'
import { PostSummary, PostFrontmatter } from '@/types'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, extname } from 'path'
import matter from 'gray-matter'

export const metadata: Metadata = {
  title: 'Blog | John Hentrich',
  description: 'Thoughts on business strategy, digital transformation, and growth in the automotive industry.',
}

function getPosts(): PostSummary[] {
  try {
    const postsDirectory = join(process.cwd(), 'data', 'posts')
    
    if (!existsSync(postsDirectory)) {
      return []
    }
    
    const fileNames = readdirSync(postsDirectory)
    const posts: PostSummary[] = []
    
    for (const fileName of fileNames) {
      if (extname(fileName) !== '.md') continue
      
      try {
        const filePath = join(postsDirectory, fileName)
        const fileContents = readFileSync(filePath, 'utf8')
        const { data: frontmatter, content } = matter(fileContents)
        
        if (frontmatter.published !== false) {
          posts.push({
            frontmatter: frontmatter as PostFrontmatter,
            excerpt: frontmatter.excerpt || content.slice(0, 160) + '...',
            wordCount: content.trim().split(/\s+/).length,
            fileName
          })
        }
      } catch (error) {
        console.warn(`Error reading post ${fileName}:`, error)
      }
    }
    
    return posts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date)
      const dateB = new Date(b.frontmatter.date)
      return dateB.getTime() - dateA.getTime()
    })
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

function PostCard({ post }: { post: PostSummary }) {
  const categoryColors = {
    'Business Strategy': 'bg-blue-100 text-blue-800',
    'Product Strategy': 'bg-green-100 text-green-800',
    'Technical': 'bg-purple-100 text-purple-800',
    'Growth': 'bg-orange-100 text-orange-800',
  }

  const categoryColor = categoryColors[post.frontmatter.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
                {post.frontmatter.category}
              </span>
              {post.frontmatter.featured && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  Featured
                </span>
              )}
            </div>
            <time className="text-sm text-gray-500">
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </div>

        <h2 className="text-xl font-heading font-bold text-gray-900 mb-3 hover:text-primary transition-colors">
          <Link href={`/blog/${post.frontmatter.slug}`}>
            {post.frontmatter.title}
          </Link>
        </h2>

        <p className="text-gray-600 leading-relaxed mb-4">
          {post.frontmatter.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
            {post.frontmatter.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{post.frontmatter.tags.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.frontmatter.readingTime} min read
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link 
            href={`/blog/${post.frontmatter.slug}`}
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function BlogPage() {
  const posts = getPosts()
  const featuredPosts = posts.filter(post => post.frontmatter.featured)
  const otherPosts = posts.filter(post => !post.frontmatter.featured)

  return (
    <PageLayout currentPage="blog">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-primary p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-600">
            Thoughts on business strategy, digital transformation, and growth in the automotive industry
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        ) : (
          <>
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                  Featured Posts
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {featuredPosts.map((post) => (
                    <PostCard key={post.frontmatter.slug} post={post} />
                  ))}
                </div>
              </section>
            )}

            {otherPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                  {featuredPosts.length > 0 ? 'All Posts' : 'Recent Posts'}
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {otherPosts.map((post) => (
                    <PostCard key={post.frontmatter.slug} post={post} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </PageLayout>
  )
}