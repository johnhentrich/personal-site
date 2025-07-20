import { readFile } from 'fs/promises'
import { join } from 'path'

/**
 * Centralized data fetching utility with async operations and error handling
 * Replaces synchronous file operations throughout the application
 */

export interface DataFetchError {
  code: 'FILE_NOT_FOUND' | 'INVALID_JSON' | 'UNKNOWN_ERROR'
  message: string
  filePath: string
}

export class DataFetchException extends Error {
  constructor(public error: DataFetchError) {
    super(error.message)
    this.name = 'DataFetchException'
  }
}

/**
 * Fetch and parse JSON data from the data directory
 * @param fileName - Name of the JSON file (without path)
 * @param fallbackData - Fallback data to use if file cannot be read
 * @returns Parsed JSON data or fallback
 */
export async function fetchJsonData<T>(
  fileName: string,
  fallbackData?: T
): Promise<T> {
  try {
    const fullPath = join(process.cwd(), 'data', fileName)
    const fileContents = await readFile(fullPath, 'utf8')
    return JSON.parse(fileContents) as T
  } catch (error) {
    const filePath = join(process.cwd(), 'data', fileName)
    
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      const dataError: DataFetchError = {
        code: 'FILE_NOT_FOUND',
        message: `Data file not found: ${fileName}`,
        filePath
      }
      
      if (fallbackData !== undefined) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Data file not found, using fallback: ${fileName}`)
        }
        return fallbackData
      }
      
      throw new DataFetchException(dataError)
    }
    
    if (error instanceof SyntaxError) {
      const dataError: DataFetchError = {
        code: 'INVALID_JSON',
        message: `Invalid JSON in file: ${fileName}`,
        filePath
      }
      
      if (fallbackData !== undefined) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`Invalid JSON detected, using fallback data: ${fileName}`)
        }
        return fallbackData
      }
      
      throw new DataFetchException(dataError)
    }
    
    const dataError: DataFetchError = {
      code: 'UNKNOWN_ERROR',
      message: `Unknown error reading file: ${fileName}`,
      filePath
    }
    
    if (fallbackData !== undefined) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Error reading file, using fallback data: ${fileName}`)
      }
      return fallbackData
    }
    
    throw new DataFetchException(dataError)
  }
}

/**
 * Fetch multiple JSON files concurrently
 * @param fileConfigs - Array of file configurations with name and optional fallback
 * @returns Promise resolving to array of results
 */
export async function fetchMultipleJsonData<T>(
  fileConfigs: Array<{ fileName: string; fallbackData?: T }>
): Promise<T[]> {
  const promises = fileConfigs.map(config => 
    fetchJsonData(config.fileName, config.fallbackData)
  )
  
  return Promise.all(promises)
}

/**
 * Create a cached version of fetchJsonData for development
 * In production, Next.js handles caching through ISR/SSG
 */
const dataCache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 1000 * 60 * 5 // 5 minutes in development

export async function fetchJsonDataCached<T>(
  fileName: string,
  fallbackData?: T
): Promise<T> {
  // Only use cache in development
  if (process.env.NODE_ENV === 'development') {
    const cached = dataCache.get(fileName)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data as T
    }
  }
  
  const data = await fetchJsonData(fileName, fallbackData)
  
  if (process.env.NODE_ENV === 'development') {
    dataCache.set(fileName, { data, timestamp: Date.now() })
  }
  
  return data
}