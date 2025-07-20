import '@testing-library/jest-dom'
import React from 'react'

// Mock Next.js router
import { vi, beforeEach } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock Next.js Link component
vi.mock('next/link', () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: ({ children, href, ...props }: any) => {
      return React.createElement('a', { href, ...props }, children)
    }
  }
})


// Mock localStorage for dark mode testing
const localStorageMock = {
  getItem: vi.fn(() => null), // Default to null instead of undefined
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
})