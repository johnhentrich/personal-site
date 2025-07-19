import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, extname } from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import { PageLayout } from '@/components/template/PageLayout'
import { PostFrontmatter, Post } from '@/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

function getPost(slug: string): Post | null {
  try {
    const postsDirectory = join(process.cwd(), 'data', 'posts')
    
    if (!existsSync(postsDirectory)) {
      return null
    }
    
    const fileNames = readdirSync(postsDirectory)
    
    for (const fileName of fileNames) {
      if (extname(fileName) !== '.md') continue
      
      try {
        const filePath = join(postsDirectory, fileName)
        const fileContents = readFileSync(filePath, 'utf8')
        const { data: frontmatter, content } = matter(fileContents)
        
        if (frontmatter.slug === slug && frontmatter.published !== false) {
          return {
            frontmatter: frontmatter as PostFrontmatter,
            content,
            wordCount: content.trim().split(/\s+/).length,
            fileName
          }
        }
      } catch (error) {
        console.warn(`Error reading post ${fileName}:`, error)
      }
    }
    
    return null
  } catch (error) {
    console.error('Error reading posts:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: `${post.frontmatter.title} | John Hentrich`,
    description: post.frontmatter.excerpt,
    keywords: post.frontmatter.tags,
  }
}

export async function generateStaticParams() {
  try {
    const postsDirectory = join(process.cwd(), 'data', 'posts')
    
    if (!existsSync(postsDirectory)) {
      return []
    }
    
    const fileNames = readdirSync(postsDirectory)
    const slugs: string[] = []
    
    for (const fileName of fileNames) {
      if (extname(fileName) !== '.md') continue
      
      try {
        const filePath = join(postsDirectory, fileName)
        const fileContents = readFileSync(filePath, 'utf8')
        const { data: frontmatter } = matter(fileContents)
        
        if (frontmatter.slug && frontmatter.published !== false) {
          slugs.push(frontmatter.slug)
        }
      } catch (error) {
        console.warn(`Error reading post ${fileName}:`, error)
      }
    }
    
    return slugs.map((slug) => ({
      slug,
    }))
  } catch {
    return []
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = getPost(slug)
  
  if (!post) {
    notFound()
  }
  
  const estimatedReadingTime = Math.ceil(post.wordCount / 200)
  
  return (
    <PageLayout currentPage="blog">
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <header className="p-8 lg:p-12 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {post.frontmatter.category}
            </span>
            {post.frontmatter.featured && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
            {post.frontmatter.title}
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            {post.frontmatter.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {estimatedReadingTime} min read
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              {post.wordCount} words
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>
        
        <div className="p-8 lg:p-12">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
        
        <footer className="p-8 lg:p-12 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <Link 
              href="/blog"
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
            >
              ← Back to Blog
            </Link>
            
            <div className="text-sm text-gray-500">
              By {post.frontmatter.author}
            </div>
          </div>
        </footer>
      </article>
    </PageLayout>
  )
}