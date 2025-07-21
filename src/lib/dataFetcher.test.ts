import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

// Mock fs/promises with hoisted function
vi.mock('fs/promises', () => ({
  readFile: vi.fn()
}))

// Mock path.join to return predictable paths
vi.mock('path', () => ({
  join: vi.fn((...paths) => paths.join('/'))
}))

import { fetchJsonData, fetchMultipleJsonData, fetchJsonDataCached, DataFetchException } from './dataFetcher'
import { readFile } from 'fs/promises'

const mockReadFile = vi.mocked(readFile)

describe('Data Fetcher Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock process.cwd to return a predictable path
    vi.spyOn(process, 'cwd').mockReturnValue('/mock/project/root')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('fetchJsonData', () => {
    it('should successfully fetch and parse JSON data', async () => {
      const mockData = { test: 'data', items: [1, 2, 3] }
      mockReadFile.mockResolvedValue(JSON.stringify(mockData))

      const result = await fetchJsonData('test.json')

      expect(mockReadFile).toHaveBeenCalledWith('/mock/project/root/data/test.json', 'utf8')
      expect(result).toEqual(mockData)
    })

    it('should handle file not found error with fallback data', async () => {
      const fallbackData = { fallback: true }
      const error = new Error('ENOENT: no such file or directory') as NodeJS.ErrnoException
      error.code = 'ENOENT'
      mockReadFile.mockRejectedValue(error)

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      process.env.NODE_ENV = 'development'

      const result = await fetchJsonData('missing.json', fallbackData)

      expect(result).toEqual(fallbackData)
      expect(consoleSpy).toHaveBeenCalledWith('Data file not found, using fallback: missing.json')
      
      consoleSpy.mockRestore()
    })

    it('should throw DataFetchException when file not found and no fallback', async () => {
      const error = new Error('ENOENT: no such file or directory') as NodeJS.ErrnoException
      error.code = 'ENOENT'
      mockReadFile.mockRejectedValue(error)

      await expect(fetchJsonData('missing.json')).rejects.toThrow(DataFetchException)
      
      try {
        await fetchJsonData('missing.json')
      } catch (e) {
        expect(e).toBeInstanceOf(DataFetchException)
        if (e instanceof DataFetchException) {
          expect(e.error.code).toBe('FILE_NOT_FOUND')
          expect(e.error.message).toBe('Data file not found: missing.json')
        }
      }
    })

    it('should handle invalid JSON with fallback data', async () => {
      const fallbackData = { valid: 'data' }
      mockReadFile.mockResolvedValue('{ invalid json')

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      process.env.NODE_ENV = 'development'

      const result = await fetchJsonData('invalid.json', fallbackData)

      expect(result).toEqual(fallbackData)
      expect(consoleSpy).toHaveBeenCalledWith('Invalid JSON detected, using fallback data: invalid.json')
      
      consoleSpy.mockRestore()
    })

    it('should throw DataFetchException for invalid JSON without fallback', async () => {
      mockReadFile.mockResolvedValue('{ invalid json')

      await expect(fetchJsonData('invalid.json')).rejects.toThrow(DataFetchException)
      
      try {
        await fetchJsonData('invalid.json')
      } catch (e) {
        expect(e).toBeInstanceOf(DataFetchException)
        if (e instanceof DataFetchException) {
          expect(e.error.code).toBe('INVALID_JSON')
          expect(e.error.message).toBe('Invalid JSON in file: invalid.json')
        }
      }
    })

    it('should handle unknown errors with fallback data', async () => {
      const fallbackData = { safe: 'fallback' }
      mockReadFile.mockRejectedValue(new Error('Permission denied'))

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      process.env.NODE_ENV = 'development'

      const result = await fetchJsonData('error.json', fallbackData)

      expect(result).toEqual(fallbackData)
      expect(consoleSpy).toHaveBeenCalledWith('Error reading file, using fallback data: error.json')
      
      consoleSpy.mockRestore()
    })

    it('should throw DataFetchException for unknown errors without fallback', async () => {
      mockReadFile.mockRejectedValue(new Error('Permission denied'))

      await expect(fetchJsonData('error.json')).rejects.toThrow(DataFetchException)
      
      try {
        await fetchJsonData('error.json')
      } catch (e) {
        expect(e).toBeInstanceOf(DataFetchException)
        if (e instanceof DataFetchException) {
          expect(e.error.code).toBe('UNKNOWN_ERROR')
        }
      }
    })
  })

  describe('fetchMultipleJsonData', () => {
    it('should fetch multiple files concurrently', async () => {
      const mockData1 = { file: 1 }
      const mockData2 = { file: 2 }
      
      mockReadFile
        .mockResolvedValueOnce(JSON.stringify(mockData1))
        .mockResolvedValueOnce(JSON.stringify(mockData2))

      const fileConfigs = [
        { fileName: 'file1.json' },
        { fileName: 'file2.json' }
      ]

      const results = await fetchMultipleJsonData(fileConfigs)

      expect(results).toEqual([mockData1, mockData2])
      expect(mockReadFile).toHaveBeenCalledTimes(2)
    })

    it('should handle mixed success/failure with fallbacks', async () => {
      const mockData1 = { file: 1 }
      const fallbackData2 = { fallback: 2 }
      
      const error = new Error('ENOENT') as NodeJS.ErrnoException
      error.code = 'ENOENT'
      
      mockReadFile
        .mockResolvedValueOnce(JSON.stringify(mockData1))
        .mockRejectedValueOnce(error)

      const fileConfigs = [
        { fileName: 'file1.json' },
        { fileName: 'missing.json', fallbackData: fallbackData2 }
      ]

      const results = await fetchMultipleJsonData(fileConfigs)

      expect(results).toEqual([mockData1, fallbackData2])
    })
  })

  describe('fetchJsonDataCached', () => {
    beforeEach(() => {
      // Clear any existing cache
      // Clear any existing cache
      new Map()
      // Access the internal cache - this is a bit hacky but needed for testing
    })

    it('should cache data in development mode', async () => {
      const mockData = { cached: 'data' }
      mockReadFile.mockResolvedValue(JSON.stringify(mockData))
      
      process.env.NODE_ENV = 'development'

      // First call
      const result1 = await fetchJsonDataCached('cached.json')
      // Second call should use cache
      const result2 = await fetchJsonDataCached('cached.json')

      expect(result1).toEqual(mockData)
      expect(result2).toEqual(mockData)
      // Should only read file once due to caching
      expect(mockReadFile).toHaveBeenCalledTimes(1)
    })

    it('should not use cache in production mode', async () => {
      const mockData = { production: 'data' }
      mockReadFile.mockResolvedValue(JSON.stringify(mockData))
      
      process.env.NODE_ENV = 'production'

      // Both calls should read file
      await fetchJsonDataCached('prod.json')
      await fetchJsonDataCached('prod.json')

      expect(mockReadFile).toHaveBeenCalledTimes(2)
    })
  })

  describe('Type Safety', () => {
    it('should respect TypeScript types', async () => {
      interface TestData {
        id: number
        name: string
      }

      const mockData: TestData = { id: 1, name: 'test' }
      mockReadFile.mockResolvedValue(JSON.stringify(mockData))

      const result = await fetchJsonData<TestData>('typed.json')

      expect(result.id).toBe(1)
      expect(result.name).toBe('test')
      // TypeScript should enforce this at compile time
    })
  })
})