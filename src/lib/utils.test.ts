import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('Utils', () => {
  describe('cn function', () => {
    it('merges class names correctly', () => {
      const result = cn('text-gray-900', 'dark:text-white')
      expect(result).toBe('text-gray-900 dark:text-white')
    })

    it('handles undefined and null values', () => {
      const result = cn('text-gray-900', undefined, null, 'dark:text-white')
      expect(result).toBe('text-gray-900 dark:text-white')
    })

    it('handles conditional classes', () => {
      const isDark = true
      const result = cn('text-base', isDark && 'dark:text-white')
      expect(result).toBe('text-base dark:text-white')
    })

    it('handles empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('merges conflicting classes correctly (tailwind-merge)', () => {
      const result = cn('text-gray-900', 'text-white')
      // tailwind-merge should resolve conflicts, keeping the last one
      expect(result).toBe('text-white')
    })

    it('handles array inputs', () => {
      const result = cn(['text-gray-900', 'dark:text-white'])
      expect(result).toBe('text-gray-900 dark:text-white')
    })
  })
})