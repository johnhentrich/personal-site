'use client'

import { useState } from 'react'
import { Project, ProjectCategory } from '@/types'
import { ProjectCard } from './ProjectCard'
import { cn } from '@/lib/utils'

interface ProjectGridProps {
  projects: Project[]
  categories?: ProjectCategory[]
  featuredProjects?: Project[]
  showFilters?: boolean
  variant?: 'default' | 'showcase' | 'compact'
  className?: string
}

export function ProjectGrid({ 
  projects, 
  categories = [],
  featuredProjects = [],
  showFilters = true,
  variant = 'default',
  className 
}: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  // Filter projects based on selected filters
  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory
    const statusMatch = selectedStatus === 'all' || project.status === selectedStatus
    return categoryMatch && statusMatch
  })

  // Get unique statuses from projects
  const statuses = [...new Set(projects.map(p => p.status))]

  const getGridClasses = () => {
    switch (variant) {
      case 'showcase':
        return 'grid gap-8 md:gap-10 grid-cols-1 lg:grid-cols-2'
      case 'compact':
        return 'grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      default:
        return 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Filters */}
      {showFilters && (categories.length > 0 || statuses.length > 0) && (
        <div className="mb-8 p-6 bg-white rounded-xl border border-gray-100">
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
            Filter Projects
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                      selectedCategory === 'all'
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                        selectedCategory === category.name
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Status Filter */}
            {statuses.length > 0 && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedStatus('all')}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                      selectedStatus === 'all'
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    All
                  </button>
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                        selectedStatus === status
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Showing {filteredProjects.length} of {projects.length} projects
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              {selectedStatus !== 'all' && ` with status ${selectedStatus}`}
            </p>
          </div>
        </div>
      )}

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (selectedCategory === 'all' && selectedStatus === 'all') && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-gray-900">
              Featured Projects
            </h2>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {featuredProjects.length} featured
            </div>
          </div>
          
          <div className={cn(
            variant === 'showcase' 
              ? 'grid gap-8 md:gap-10 grid-cols-1 xl:grid-cols-2'
              : 'grid gap-6 grid-cols-1 md:grid-cols-2'
          )}>
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={true}
                variant={variant === 'compact' ? 'default' : variant}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Projects Section */}
      <section>
        {featuredProjects.length > 0 && (selectedCategory === 'all' && selectedStatus === 'all') && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-gray-900">
              All Projects
            </h2>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {filteredProjects.length} projects
            </div>
          </div>
        )}

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or check back later for new projects.
            </p>
            {(selectedCategory !== 'all' || selectedStatus !== 'all') && (
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedStatus('all')
                }}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className={getGridClasses()}>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={featuredProjects.some(fp => fp.id === project.id)}
                variant={variant}
              />
            ))}
          </div>
        )}
      </section>

      {/* Load More Button (for future pagination) */}
      {filteredProjects.length > 0 && filteredProjects.length >= 6 && (
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors">
            Load more projects
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}