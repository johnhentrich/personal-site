'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/types'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  featured?: boolean
  variant?: 'default' | 'compact' | 'showcase'
  className?: string
}

const categoryColors = {
  'Infrastructure': 'bg-blue-50 text-blue-700 border-blue-200',
  'Web Development': 'bg-green-50 text-green-700 border-green-200',
  'Data Science': 'bg-purple-50 text-purple-700 border-purple-200',
  'Automation': 'bg-orange-50 text-orange-700 border-orange-200',
  'Cloud': 'bg-indigo-50 text-indigo-700 border-indigo-200',
} as const

const statusColors = {
  'Active': 'bg-green-100 text-green-800 border-green-200',
  'Completed': 'bg-blue-100 text-blue-800 border-blue-200',
  'On Hold': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Archived': 'bg-gray-100 text-gray-800 border-gray-200',
} as const

export function ProjectCard({ 
  project, 
  featured = false, 
  variant = 'default',
  className 
}: ProjectCardProps) {
  const categoryColor = categoryColors[project.category as keyof typeof categoryColors] || 
    'bg-gray-50 text-gray-700 border-gray-200'
  
  const statusColor = statusColors[project.status as keyof typeof statusColors] || 
    'bg-gray-100 text-gray-800 border-gray-200'

  if (variant === 'showcase') {
    return (
      <article className={cn(
        'group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500',
        'border border-gray-100 hover:border-primary/30',
        'transform hover:-translate-y-2',
        className
      )}>
        <Link href={`/projects/${project.slug}`} className="block">
          {/* Hero Image */}
          {project.image && (
            <div className="relative h-56 lg:h-64 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Floating badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className={cn(
                  'inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border backdrop-blur-sm',
                  categoryColor.replace('bg-', 'bg-white/90 ').replace('text-', 'text-').replace('border-', 'border-')
                )}>
                  {project.category}
                </span>
                <span className={cn(
                  'inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border backdrop-blur-sm',
                  statusColor.replace('bg-', 'bg-white/90 ').replace('text-', 'text-').replace('border-', 'border-')
                )}>
                  {project.status}
                </span>
              </div>

              {featured && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/90 text-white backdrop-blur-sm">
                    ⭐ Featured
                  </span>
                </div>
              )}

              {/* Overlay content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl font-heading font-bold mb-2 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-gray-200 line-clamp-2 mb-3">
                  {project.description}
                </p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="text-xs text-gray-500 self-center">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>

            {/* Highlights */}
            <div className="space-y-2 mb-6">
              {project.highlights.slice(0, 3).map((highlight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600 leading-relaxed">{highlight}</p>
                </div>
              ))}
            </div>

            {/* Metrics */}
            {Object.keys(project.metrics).length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.entries(project.metrics).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-primary">{value}</div>
                    <div className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Demo
                  </a>
                )}
              </div>
              
              <div className="flex items-center text-primary font-semibold group-hover:text-primary-dark transition-colors">
                View project
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

  if (variant === 'compact') {
    return (
      <article className={cn(
        'group flex gap-4 p-4 rounded-xl bg-white hover:bg-gray-50 transition-all duration-300',
        'border border-gray-100 hover:border-primary/30 hover:shadow-md',
        className
      )}>
        <Link href={`/projects/${project.slug}`} className="flex gap-4 flex-1">
          {/* Thumbnail */}
          {project.image && (
            <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="64px"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
                categoryColor
              )}>
                {project.category}
              </span>
              <span className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
                statusColor
              )}>
                {project.status}
              </span>
            </div>

            <h3 className="font-heading font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1 mb-1">
              {project.title}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {project.description}
            </p>

            <div className="flex gap-1">
              {project.technologies.slice(0, 3).map((tech) => (
                <span key={tech} className="text-xs text-gray-500">
                  {tech}
                </span>
              ))}
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
      <Link href={`/projects/${project.slug}`} className="block">
        {/* Image */}
        {project.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={cn(
                'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
                categoryColor
              )}>
                {project.category}
              </span>
              <span className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
                statusColor
              )}>
                {project.status}
              </span>
            </div>
            {featured && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs text-gray-500 self-center">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Key Highlight */}
          {project.highlights.length > 0 && (
            <div className="flex items-start gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-gray-700">{project.highlights[0]}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Demo
                </a>
              )}
            </div>
            
            <div className="flex items-center text-primary font-medium group-hover:text-primary-dark transition-colors">
              View project
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