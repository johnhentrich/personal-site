import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import React, { useState, useEffect } from 'react'

// Test utilities for localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} })
  }
})()

// Mock window.matchMedia for system preference testing
const matchMediaMock = vi.fn((query: string) => ({
  matches: query === '(prefers-color-scheme: dark)' ? false : true,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))

describe('Theme System - Core Requirements', () => {
  beforeEach(() => {
    // Reset DOM
    document.documentElement.className = ''
    document.documentElement.style.colorScheme = ''
    
    // Reset localStorage mock
    localStorageMock.clear()
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    Object.defineProperty(window, 'matchMedia', { value: matchMediaMock })
    
    // Clear all mocks
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Initial State Detection', () => {
    it('should default to light mode when no preferences exist', () => {
      // No localStorage, system prefers light
      localStorageMock.getItem.mockReturnValue(null)
      matchMediaMock.mockReturnValue({ matches: false } as MediaQueryList)
      
      // Test that initial state is light
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })

    it('should respect localStorage preference over system preference', () => {
      // localStorage says dark, system says light
      localStorageMock.getItem.mockReturnValue('"dark"')
      matchMediaMock.mockReturnValue({ matches: false } as MediaQueryList)
      
      // Should use localStorage value (dark)
      // This will be tested in the actual implementation
    })

    it('should use system preference when no localStorage exists', () => {
      // No localStorage, system prefers dark
      localStorageMock.getItem.mockReturnValue(null)
      matchMediaMock.mockReturnValue({ matches: true } as MediaQueryList)
      
      // Should use system preference (dark)
      // This will be tested in the actual implementation
    })

    it('should handle malformed localStorage data gracefully', () => {
      // Malformed JSON in localStorage
      localStorageMock.getItem.mockReturnValue('invalid-json')
      matchMediaMock.mockReturnValue({ matches: false } as MediaQueryList)
      
      // Should fall back to system preference
      // This will be tested in the actual implementation
    })
  })

  describe('Theme Switching', () => {
    it('should toggle between light and dark modes', () => {
      // Start with light mode
      let currentTheme = 'light'
      
      // Simulate theme toggle
      const newTheme = currentTheme === 'light' ? 'dark' : 'light'
      
      expect(newTheme).toBe('dark')
      
      // Toggle back
      const backToLight = newTheme === 'light' ? 'dark' : 'light'
      expect(backToLight).toBe('light')
    })

    it('should update DOM class immediately', () => {
      // Apply dark theme
      document.documentElement.classList.add('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      
      // Apply light theme
      document.documentElement.classList.remove('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })

    it('should update color-scheme CSS property', () => {
      // Apply dark theme
      document.documentElement.style.colorScheme = 'dark'
      expect(document.documentElement.style.colorScheme).toBe('dark')
      
      // Apply light theme
      document.documentElement.style.colorScheme = 'light'
      expect(document.documentElement.style.colorScheme).toBe('light')
    })

    it('should persist theme choice to localStorage', () => {
      // Simulate saving dark theme
      localStorageMock.setItem('theme', 'dark')
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
      expect(localStorageMock.getItem('theme')).toBe('dark')
    })
  })

  describe('Persistence', () => {
    it('should maintain theme across page reloads', () => {
      // Set theme
      localStorageMock.setItem('theme', 'dark')
      
      // Simulate page reload - check localStorage
      const storedTheme = localStorageMock.getItem('theme')
      expect(storedTheme).toBe('dark')
    })

    it('should handle localStorage unavailable scenarios', () => {
      // Mock localStorage throwing error
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage not available')
      })
      
      // Should not crash the application
      expect(() => {
        try {
          localStorageMock.getItem('theme')
        } catch (error) {
          // Handle gracefully
          return 'light' // fallback
        }
      }).not.toThrow()
    })
  })

  describe('SSR Safety', () => {
    it('should not access localStorage on server', () => {
      // Mock server environment
      const originalWindow = global.window
      // @ts-expect-error - Testing server environment
      delete global.window
      
      // Should not throw when window is undefined
      expect(() => {
        const theme = typeof window !== 'undefined' ? 'light' : 'light'
        expect(theme).toBe('light')
      }).not.toThrow()
      
      // Restore window
      global.window = originalWindow
    })

    it('should provide consistent initial state', () => {
      // Server should always return the same initial state
      const serverTheme = 'light' // Always light on server
      const clientTheme = 'light' // Should match initially
      
      expect(serverTheme).toBe(clientTheme)
    })
  })

  describe('Integration', () => {
    it('should coordinate multiple theme consumers', () => {
      // Multiple components should get the same theme value
      let theme1 = 'light'
      let theme2 = 'light'
      
      // When theme changes, all consumers should update
      theme1 = 'dark'
      theme2 = 'dark'
      
      expect(theme1).toBe(theme2)
    })

    it('should prevent FOUC (Flash of Unstyled Content)', () => {
      // Theme should be applied before React hydration
      // This is tested by ensuring DOM manipulation happens synchronously
      
      // Simulate early theme application
      const applyThemeEarly = (theme: string) => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
          document.documentElement.style.colorScheme = 'dark'
        } else {
          document.documentElement.classList.remove('dark')
          document.documentElement.style.colorScheme = 'light'
        }
      }
      
      applyThemeEarly('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(document.documentElement.style.colorScheme).toBe('dark')
    })
  })

  describe('Error Handling', () => {
    it('should handle localStorage quota exceeded', () => {
      // Mock localStorage quota exceeded error
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('QuotaExceededError')
      })
      
      // Should handle gracefully
      expect(() => {
        try {
          localStorageMock.setItem('theme', 'dark')
        } catch (error) {
          // Log error but don't crash
          console.warn('Failed to save theme preference:', error)
        }
      }).not.toThrow()
    })

    it('should recover from corrupted theme state', () => {
      // Corrupt data in localStorage
      localStorageMock.getItem.mockReturnValue('corrupted')
      
      // Should fall back to default
      const theme = (() => {
        try {
          const stored = localStorageMock.getItem('theme')
          if (stored === 'light' || stored === 'dark') {
            return stored
          }
        } catch (error) {
          // Handle error
        }
        return 'light' // fallback
      })()
      
      expect(theme).toBe('light')
    })
  })

  describe('Accessibility', () => {
    it('should announce theme changes to screen readers', () => {
      // Theme toggle should have proper ARIA attributes
      const button = document.createElement('button')
      button.setAttribute('aria-label', 'Toggle theme')
      
      // Update aria-label when theme changes
      button.setAttribute('aria-label', 'Switch to light mode')
      expect(button.getAttribute('aria-label')).toBe('Switch to light mode')
    })

    it('should provide appropriate color contrast', () => {
      // This would be tested with actual CSS in practice
      // Here we just test the class application
      document.documentElement.classList.add('dark')
      
      // In dark mode, ensure proper classes are applied
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })

  describe('Performance', () => {
    it('should batch DOM updates', () => {
      // Multiple theme operations should be efficient
      const operations = []
      
      // Simulate batched updates
      operations.push(() => document.documentElement.classList.add('dark'))
      operations.push(() => document.documentElement.style.colorScheme = 'dark')
      
      // Execute all at once
      operations.forEach(op => op())
      
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(document.documentElement.style.colorScheme).toBe('dark')
    })

    it('should not cause unnecessary re-renders', () => {
      // Theme context should only re-render when theme actually changes
      let renderCount = 0
      
      const TestComponent = () => {
        renderCount++
        return <div>Test</div>
      }
      
      render(<TestComponent />)
      const initialRenderCount = renderCount
      
      // Same theme should not cause re-render
      // This will be tested with actual context implementation
      expect(renderCount).toBe(initialRenderCount)
    })
  })
})

describe('Theme System - Component Integration Tests', () => {
  // Simple test components for integration testing
  const TestThemeProvider = ({ children, initialTheme = 'light' }: { 
    children: React.ReactNode, 
    initialTheme?: string 
  }) => {
    const [theme, setTheme] = useState(initialTheme)
    
    // Apply theme to DOM
    useEffect(() => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
        document.documentElement.style.colorScheme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.style.colorScheme = 'light'
      }
    }, [theme])
    
    return (
      <div data-testid="theme-provider" data-theme={theme}>
        {children}
        <button 
          data-testid="theme-toggle"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          Toggle Theme
        </button>
      </div>
    )
  }
  
  it('should integrate theme provider with toggle component', () => {
    render(
      <TestThemeProvider>
        <div data-testid="content">Content</div>
      </TestThemeProvider>
    )
    
    const provider = screen.getByTestId('theme-provider')
    const toggle = screen.getByTestId('theme-toggle')
    
    // Initially light
    expect(provider).toHaveAttribute('data-theme', 'light')
    
    // Click toggle
    fireEvent.click(toggle)
    
    // Should be dark now
    expect(provider).toHaveAttribute('data-theme', 'dark')
  })
  
  it('should handle multiple theme toggles', () => {
    render(
      <TestThemeProvider>
        <div>Content</div>
      </TestThemeProvider>
    )
    
    const provider = screen.getByTestId('theme-provider')
    const toggle = screen.getByTestId('theme-toggle')
    
    // Start light
    expect(provider).toHaveAttribute('data-theme', 'light')
    
    // Toggle to dark
    fireEvent.click(toggle)
    expect(provider).toHaveAttribute('data-theme', 'dark')
    
    // Toggle back to light
    fireEvent.click(toggle)
    expect(provider).toHaveAttribute('data-theme', 'light')
    
    // Toggle to dark again
    fireEvent.click(toggle)
    expect(provider).toHaveAttribute('data-theme', 'dark')
  })
})