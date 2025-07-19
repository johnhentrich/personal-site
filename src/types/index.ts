// Site Configuration Types
export interface SiteConfig {
  site: {
    title: string
    description: string
    url: string
    author: {
      name: string
      email: string
      bio: string
      location: string
      twitter?: string
      linkedin: string
      github: string
    }
  }
  navigation: NavigationItem[]
  social: {
    linkedin: string
    github: string
    email: string
    website: string
  }
  features: {
    blog: boolean
    projects: boolean
    resume: boolean
    analytics: boolean
    newsletter: boolean
    darkMode: boolean
  }
  seo: {
    keywords: string[]
    ogImage: string
    twitterCard: string
  }
}

export interface NavigationItem {
  label: string
  href: string
  description: string
}

// Project Types
export interface Project {
  id: string
  title: string
  slug: string
  description: string
  technologies: string[]
  category: string
  status: 'Active' | 'Completed' | 'On Hold' | 'Archived'
  startDate: string
  endDate: string | null
  image: string
  gallery: string[]
  github: string | null
  demo: string | null
  website: string | null
  highlights: string[]
  metrics: Record<string, string | number>
}

export interface ProjectCategory {
  name: string
  description: string
  color: string
}

export interface ProjectsData {
  featured: Project[]
  other: Project[]
  categories: ProjectCategory[]
}

export interface ProjectsResponse {
  projects: Project[]
  categories: ProjectCategory[]
  meta: {
    total: number
    featured: number
    other: number
    filters: {
      category: string | null
      status: string | null
      featured: string | null
      limit: number | null
    }
  }
}

export interface ProjectResponse {
  project: Project
  related: Project[]
  meta: {
    isFeatured: boolean
    category?: ProjectCategory
  }
}

// Blog Post Types
export interface PostFrontmatter {
  title: string
  slug: string
  date: string
  updated?: string
  author: string
  excerpt: string
  tags: string[]
  category: string
  featured: boolean
  published: boolean
  readingTime: number
  image?: string
  imageAlt?: string
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
}

export interface Post {
  frontmatter: PostFrontmatter
  content: string
  wordCount: number
  fileName: string
}

export interface PostSummary {
  frontmatter: PostFrontmatter
  excerpt: string
  wordCount: number
  fileName: string
}

export interface PostsResponse {
  posts: (Post | PostSummary)[]
  meta: {
    total: number
    filtered: number
    offset: number
    limit: number
    categories: string[]
    tags: string[]
    filters: {
      category: string | null
      tag: string | null
      featured: string | null
      search: string | null
      includeContent: boolean | null
    }
  }
}

export interface PostResponse {
  post: Post
  related: PostSummary[]
  navigation: {
    previous: {
      title: string
      slug: string
      excerpt: string
    } | null
    next: {
      title: string
      slug: string
      excerpt: string
    } | null
  }
  meta: {
    estimatedReadingTime: number
    lastModified: string
    wordCount: number
    tags: string[]
    category: string
  }
}

// Resume Types
export interface WorkExperience {
  name: string
  position: string
  url: string
  startDate: string
  endDate: string | null
  summary: string
  highlights: string[]
}

export interface Skill {
  title: string
  competency: number
}

export interface SkillCategory {
  title: string
  skills: Skill[]
}

// API Response Types
export interface ApiError {
  error: string
  details?: string
  timestamp?: string
}

export interface DataHealth {
  status: 'healthy' | 'partial' | 'error'
  files: {
    config: DataFile
    projects: DataFile
    posts: DataFile & { count?: number }
  }
  timestamp: string
}

export interface DataFile {
  path: string
  exists: boolean
  size?: number
  lastModified?: Date
}

// Utility Types
export interface PaginationParams {
  limit?: number
  offset?: number
}

export interface FilterParams {
  category?: string
  tag?: string
  status?: string
  featured?: boolean
  search?: string
}

export interface CacheConfig {
  duration: number
  staleWhileRevalidate?: number
}

// Component Prop Types
export interface PageLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

export interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export interface PostCardProps {
  post: PostSummary
  featured?: boolean
}

export interface SkillBarProps {
  skill: Skill
  animated?: boolean
}

export interface ExperienceItemProps {
  job: WorkExperience
  index?: number
}