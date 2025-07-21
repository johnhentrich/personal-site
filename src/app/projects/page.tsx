import { Metadata } from 'next'
import { PageLayout } from '@/components/template/PageLayout'
import { fetchJsonData } from '@/lib/dataFetcher'

export const metadata: Metadata = {
  title: 'Projects | John Hentrich',
  description: 'Explore my software development, infrastructure, and data science projects across various domains.',
}

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  category: string
  featured: boolean
  image?: string
  github?: string
  demo?: string
  website?: string
  highlights: string[]
}

interface ProjectCategory {
  name: string
  description: string
  color: string
}

interface ProjectsData {
  featured: Project[]
  other: Project[]
  categories: ProjectCategory[]
}

function ProjectCard({ project }: { project: Project }) {
  const categoryColors = {
    'Infrastructure': 'bg-blue-100 text-blue-800',
    'Web Development': 'bg-green-100 text-green-800',
    'Data Science': 'bg-purple-100 text-purple-800',
    'Automation': 'bg-orange-100 text-orange-800',
    'Cloud': 'bg-indigo-100 text-indigo-800',
  }

  const categoryColor = categoryColors[project.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
                {project.title}
              </h3>
              {project.featured && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  Featured
                </span>
              )}
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
              {project.category}
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Key Highlights:</h4>
          <ul className="space-y-1">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {(project.github || project.demo || project.website) && (
          <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            {project.website && (
              <a
                href={project.website}
                className="text-sm text-primary hover:text-primary-dark font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Site →
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                className="text-sm text-primary hover:text-primary-dark font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code →
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                className="text-sm text-primary hover:text-primary-dark font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default async function ProjectsPage() {
  // Fallback data for resilience
  const fallbackData: ProjectsData = {
    featured: [],
    other: [],
    categories: []
  }
  
  const data = await fetchJsonData<ProjectsData>('projects.json', fallbackData)
  
  const featuredProjects = data.featured
  const otherProjects = data.other

  return (
    <PageLayout currentPage="projects">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 border-l-4 border-l-info p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Technical Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A collection of software development, infrastructure, and data science projects
            demonstrating technical expertise across various domains.
          </p>
        </header>

        {featuredProjects.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Featured Projects
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {otherProjects.length > 0 && (
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Other Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  )
}