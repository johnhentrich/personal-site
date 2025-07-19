'use client'

import Link from 'next/link'
import Image from 'next/image'
import { PostSummary } from '@/types'
import { cn } from '@/lib/utils'

interface BlogPostCardProps {
  post: PostSummary
  featured?: boolean
  variant?: 'default' | 'compact' | 'hero'
  className?: string
}

const categoryColors = {
  'Business Strategy': 'bg-blue-50 text-blue-700 border-blue-200',
  'Product Strategy': 'bg-green-50 text-green-700 border-green-200',
  'Technical': 'bg-purple-50 text-purple-700 border-purple-200',
  'Growth': 'bg-orange-50 text-orange-700 border-orange-200',
  'Analytics': 'bg-indigo-50 text-indigo-700 border-indigo-200',
} as const

export function BlogPostCard({ 
  post, 
  featured = false, 
  variant = 'default',
  className 
}: BlogPostCardProps) {
  const categoryColor = categoryColors[post.frontmatter.category as keyof typeof categoryColors] || 
    'bg-gray-50 text-gray-700 border-gray-200'

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (variant === 'hero') {
    return (
      <article className={cn(
        'group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500',
        'border border-gray-100 hover:border-primary/30',
        className
      )}>
        <Link href={`/blog/${post.frontmatter.slug}`} className="block">
          {/* Hero Image */}
          {post.frontmatter.image && (
            <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.imageAlt || post.frontmatter.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Floating category badge */}
              <div className="absolute top-4 left-4">
                <span className={cn(
                  'inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border backdrop-blur-sm',
                  categoryColor.replace('bg-', 'bg-white/90 ').replace('text-', 'text-').replace('border-', 'border-')
                )}>
                  {post.frontmatter.category}
                </span>
              </div>

              {featured && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/90 text-white backdrop-blur-sm">
                    ⭐ Featured
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-4">
              <time className="text-sm text-gray-500 font-medium">
                {formatDate(post.frontmatter.date)}
              </time>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.frontmatter.readingTime} min read
              </div>
            </div>

            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">
              {post.frontmatter.title}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-3">
              {post.frontmatter.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.frontmatter.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
              {post.frontmatter.tags.length > 4 && (
                <span className="text-xs text-gray-500 self-center">
                  +{post.frontmatter.tags.length - 4} more
                </span>
              )}
            </div>

            {/* Read more CTA */}
            <div className="flex items-center text-primary font-semibold group-hover:text-primary-dark transition-colors">
              Read full article
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'compact') {
    return (
      <article className={cn(
        'group flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white hover:bg-gray-50 transition-all duration-300',
        'border border-gray-100 hover:border-primary/30 hover:shadow-md',
        className
      )}>
        <Link href={`/blog/${post.frontmatter.slug}`} className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Thumbnail */}
          {post.frontmatter.image && (
            <div className="relative w-full sm:w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.imageAlt || post.frontmatter.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="96px"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
                categoryColor
              )}>
                {post.frontmatter.category}
              </span>
              <time className="text-xs text-gray-500">
                {formatDate(post.frontmatter.date)}
              </time>
            </div>

            <h3 className="font-heading font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {post.frontmatter.title}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {post.frontmatter.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {post.frontmatter.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs text-gray-500">
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {post.frontmatter.readingTime} min
              </span>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  // Default variant
  return (
    <article className={cn(
      'group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300',
      'border border-gray-100 hover:border-primary/30 overflow-hidden',
      'transform hover:-translate-y-1',
      className
    )}>
      <Link href={`/blog/${post.frontmatter.slug}`} className="block">
        {/* Image */}
        {post.frontmatter.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.frontmatter.image}
              alt={post.frontmatter.imageAlt || post.frontmatter.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className={cn(
                'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
                categoryColor
              )}>
                {post.frontmatter.category}
              </span>
              {featured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  ⭐ Featured
                </span>
              )}
            </div>
            <time className="text-sm text-gray-500">
              {formatDate(post.frontmatter.date)}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.frontmatter.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {post.frontmatter.excerpt}
          </p>

          {/* Tags and Reading Time */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {post.frontmatter.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
              {post.frontmatter.tags.length > 3 && (
                <span className="text-xs text-gray-500 self-center">
                  +{post.frontmatter.tags.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center text-sm text-gray-500 ml-4">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.frontmatter.readingTime} min
            </div>
          </div>

          {/* Read More */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-primary font-medium group-hover:text-primary-dark transition-colors">
              Read article
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}