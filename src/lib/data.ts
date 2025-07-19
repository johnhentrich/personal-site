import { readFileSync, readdirSync, existsSync, statSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

/**
 * Utility functions for reading data files
 */

export interface DataFile {
  path: string
  exists: boolean
  size?: number
  lastModified?: Date
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

/**
 * Check if a file exists and get its metadata
 */
export function checkFile(relativePath: string): DataFile {
  const fullPath = join(process.cwd(), relativePath)
  
  try {
    if (!existsSync(fullPath)) {
      return { path: relativePath, exists: false }
    }

    const stats = statSync(fullPath)
    return {
      path: relativePath,
      exists: true,
      size: stats.size,
      lastModified: stats.mtime
    }
  } catch {
    return { path: relativePath, exists: false }
  }
}

/**
 * Get health status of all data files
 */
export function getDataHealth(): DataHealth {
  const configFile = checkFile('data/config.json')
  const projectsFile = checkFile('data/projects.json')
  
  // Check posts directory
  const postsDir = join(process.cwd(), 'data', 'posts')
  let postsFile: DataFile & { count?: number } = { path: 'data/posts', exists: false }
  
  try {
    if (existsSync(postsDir)) {
      const files = readdirSync(postsDir).filter(f => f.endsWith('.md'))
      const stats = statSync(postsDir)
      
      postsFile = {
        path: 'data/posts',
        exists: true,
        size: stats.size,
        lastModified: stats.mtime,
        count: files.length
      }
    }
  } catch (error) {
    console.error('Error checking posts directory:', error)
  }

  // Determine overall health status
  let status: 'healthy' | 'partial' | 'error' = 'healthy'
  
  if (!configFile.exists || !projectsFile.exists || !postsFile.exists) {
    status = 'error'
  } else if (postsFile.count === 0) {
    status = 'partial'
  }

  return {
    status,
    files: {
      config: configFile,
      projects: projectsFile,
      posts: postsFile
    },
    timestamp: new Date().toISOString()
  }
}

/**
 * Read and validate JSON file
 */
export function readJsonFile<T>(relativePath: string): T {
  try {
    const fullPath = join(process.cwd(), relativePath)
    const fileContents = readFileSync(fullPath, 'utf8')
    return JSON.parse(fileContents) as T
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('ENOENT')) {
        throw new Error(`File not found: ${relativePath}`)
      }
      if (error.message.includes('JSON')) {
        throw new Error(`Invalid JSON in file: ${relativePath}`)
      }
    }
    throw new Error(`Failed to read file: ${relativePath}`)
  }
}

/**
 * Read and parse markdown file with frontmatter
 */
export function readMarkdownFile(relativePath: string) {
  try {
    const fullPath = join(process.cwd(), relativePath)
    const fileContents = readFileSync(fullPath, 'utf8')
    const { data: frontmatter, content } = matter(fileContents)
    
    return {
      frontmatter,
      content,
      wordCount: content.trim().split(/\s+/).length
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('ENOENT')) {
        throw new Error(`File not found: ${relativePath}`)
      }
      if (error.message.includes('YAML') || error.message.includes('matter')) {
        throw new Error(`Invalid frontmatter in file: ${relativePath}`)
      }
    }
    throw new Error(`Failed to read markdown file: ${relativePath}`)
  }
}

/**
 * Get all markdown files from a directory
 */
export function getMarkdownFiles(dirPath: string) {
  try {
    const fullPath = join(process.cwd(), dirPath)
    
    if (!existsSync(fullPath)) {
      return []
    }

    const files = readdirSync(fullPath)
    return files
      .filter(file => file.endsWith('.md'))
      .map(file => join(dirPath, file))
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
    return []
  }
}

/**
 * Validate post frontmatter
 */
export function validatePostFrontmatter(frontmatter: Record<string, unknown>, fileName: string): string[] {
  const errors: string[] = []
  const requiredFields = ['title', 'slug', 'date', 'author', 'excerpt']
  
  for (const field of requiredFields) {
    if (!frontmatter[field]) {
      errors.push(`Missing required field '${field}' in ${fileName}`)
    }
  }

  // Validate date format
  if (frontmatter.date && typeof frontmatter.date === 'string' && isNaN(Date.parse(frontmatter.date))) {
    errors.push(`Invalid date format in ${fileName}`)
  }

  // Validate slug format (should be URL-friendly)
  if (frontmatter.slug && typeof frontmatter.slug === 'string' && !/^[a-z0-9-]+$/.test(frontmatter.slug)) {
    errors.push(`Invalid slug format in ${fileName} (use lowercase letters, numbers, and hyphens only)`)
  }

  return errors
}

/**
 * Cache management for API responses
 */
export const CACHE_DURATIONS = {
  CONFIG: 3600,      // 1 hour
  PROJECTS: 1800,    // 30 minutes  
  POSTS: 1800,       // 30 minutes
  POST: 3600,        // 1 hour (individual posts)
  PROJECT: 3600      // 1 hour (individual projects)
} as const

export function getCacheHeaders(duration: number) {
  return {
    'Cache-Control': `public, s-maxage=${duration}, stale-while-revalidate=${duration * 2}`,
    'CDN-Cache-Control': `public, s-maxage=${duration}`,
    'Vercel-CDN-Cache-Control': `public, s-maxage=${duration}`
  }
}