import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../contexts/ThemeProvider'
import { ThemeToggle, SimpleThemeToggle } from '../components/ui/ThemeToggle'
import * as themeLib from '../lib/theme'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} })
  }
})()

// Mock matchMedia
const matchMediaMock = vi.fn((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))

// Test component that uses theme
function TestConsumer() {
  const { theme, toggle, setTheme, isDark } = useTheme()
  
  return (
    <div data-testid="consumer">
      <span data-testid="theme">{theme}</span>
      <span data-testid="is-dark">{isDark.toString()}</span>
      <button data-testid="toggle" onClick={toggle}>Toggle</button>
      <button data-testid="set-light" onClick={() => setTheme('light')}>Light</button>
      <button data-testid="set-dark" onClick={() => setTheme('dark')}>Dark</button>
    </div>
  )
}

describe('Theme Integration Tests', () => {
  beforeEach(() => {
    // Reset DOM
    document.documentElement.className = ''
    document.documentElement.style.colorScheme = ''
    
    // Setup mocks
    localStorageMock.clear()
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    Object.defineProperty(window, 'matchMedia', { value: matchMediaMock })
    
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('ThemeProvider Integration', () => {
    it('should provide theme context to children', () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('theme')).toBeInTheDocument()
      expect(screen.getByTestId('is-dark')).toBeInTheDocument()
    })

    it('should start with light theme by default', () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      )
      
      expect(screen.getByTestId('theme')).toHaveTextContent('light')
      expect(screen.getByTestId('is-dark')).toHaveTextContent('false')
    })

    it('should allow theme toggling', async () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      )
      
      const toggleButton = screen.getByTestId('toggle')
      const themeDisplay = screen.getByTestId('theme')
      const isDarkDisplay = screen.getByTestId('is-dark')
      
      // Initially light
      expect(themeDisplay).toHaveTextContent('light')
      expect(isDarkDisplay).toHaveTextContent('false')
      
      // Toggle to dark
      fireEvent.click(toggleButton)
      
      await waitFor(() => {
        expect(themeDisplay).toHaveTextContent('dark')
        expect(isDarkDisplay).toHaveTextContent('true')
      })
      
      // Toggle back to light
      fireEvent.click(toggleButton)
      
      await waitFor(() => {
        expect(themeDisplay).toHaveTextContent('light')
        expect(isDarkDisplay).toHaveTextContent('false')
      })
    })

    it('should allow setting specific themes', async () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      )
      
      const setDarkButton = screen.getByTestId('set-dark')
      const setLightButton = screen.getByTestId('set-light')
      const themeDisplay = screen.getByTestId('theme')
      
      // Set dark theme
      fireEvent.click(setDarkButton)
      
      await waitFor(() => {
        expect(themeDisplay).toHaveTextContent('dark')
      })
      
      // Set light theme
      fireEvent.click(setLightButton)
      
      await waitFor(() => {
        expect(themeDisplay).toHaveTextContent('light')
      })
    })

    it('should throw error when useTheme is used outside provider', () => {
      // Suppress console error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      expect(() => {
        render(<TestConsumer />)
      }).toThrow('useTheme must be used within a ThemeProvider')
      
      consoleSpy.mockRestore()
    })
  })

  describe('ThemeToggle Integration', () => {
    it('should integrate with theme provider', () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    })

    it('should toggle theme when clicked', async () => {
      render(
        <ThemeProvider>
          <div>
            <ThemeToggle />
            <TestConsumer />
          </div>
        </ThemeProvider>
      )
      
      const toggleButton = screen.getByRole('button', { name: /switch to/i })
      const themeDisplay = screen.getByTestId('theme')
      
      // Initially light
      expect(themeDisplay).toHaveTextContent('light')
      expect(toggleButton).toHaveAttribute('aria-label', 'Switch to dark mode')
      
      // Click toggle
      fireEvent.click(toggleButton)
      
      await waitFor(() => {
        expect(themeDisplay).toHaveTextContent('dark')
        expect(toggleButton).toHaveAttribute('aria-label', 'Switch to light mode')
      })
    })

    it('should update button appearance based on theme', async () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
          <TestConsumer />
        </ThemeProvider>
      )
      
      const toggleButton = screen.getByRole('button', { name: /switch to/i })
      const setDarkButton = screen.getByTestId('set-dark')
      
      // Initially light mode (moon icon)
      expect(toggleButton.textContent).toContain('🌙')
      
      // Switch to dark mode
      fireEvent.click(setDarkButton)
      
      await waitFor(() => {
        // Should show sun icon in dark mode
        expect(toggleButton.textContent).toContain('☀️')
      })
    })
  })

  describe('SimpleThemeToggle Integration', () => {
    it('should work with theme provider', async () => {
      render(
        <ThemeProvider>
          <SimpleThemeToggle />
          <TestConsumer />
        </ThemeProvider>
      )
      
      const toggleButton = screen.getByRole('button', { name: /switch to/i })
      const themeDisplay = screen.getByTestId('theme')
      
      // Initially light
      expect(themeDisplay).toHaveTextContent('light')
      
      // Click toggle
      fireEvent.click(toggleButton)
      
      await waitFor(() => {
        expect(themeDisplay).toHaveTextContent('dark')
      })
    })
  })

  describe('DOM Updates', () => {
    it('should update document class when theme changes', async () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      )
      
      const setDarkButton = screen.getByTestId('set-dark')
      const setLightButton = screen.getByTestId('set-light')
      
      // Set dark theme
      fireEvent.click(setDarkButton)
      
      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true)
        expect(document.documentElement.style.colorScheme).toBe('dark')
      })
      
      // Set light theme
      fireEvent.click(setLightButton)
      
      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(false)
        expect(document.documentElement.style.colorScheme).toBe('light')
      })
    })

    it('should persist theme to localStorage', async () => {
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      )
      
      const setDarkButton = screen.getByTestId('set-dark')
      
      // Set dark theme
      fireEvent.click(setDarkButton)
      
      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
      })
    })
  })

  describe('Multiple Consumers', () => {
    it('should keep all consumers in sync', async () => {
      render(
        <ThemeProvider>
          <div data-testid="consumer1">
            <TestConsumer />
          </div>
          <div data-testid="consumer2">
            <TestConsumer />
          </div>
        </ThemeProvider>
      )
      
      const consumer1Toggle = screen.getByTestId('consumer1').querySelector('[data-testid="toggle"]')!
      const consumer1Theme = screen.getByTestId('consumer1').querySelector('[data-testid="theme"]')!
      const consumer2Theme = screen.getByTestId('consumer2').querySelector('[data-testid="theme"]')!
      
      // Initially both light
      expect(consumer1Theme).toHaveTextContent('light')
      expect(consumer2Theme).toHaveTextContent('light')
      
      // Toggle from consumer 1
      fireEvent.click(consumer1Toggle)
      
      await waitFor(() => {
        // Both should update
        expect(consumer1Theme).toHaveTextContent('dark')
        expect(consumer2Theme).toHaveTextContent('dark')
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', async () => {
      // Mock localStorage to throw error
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })
      
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      render(
        <ThemeProvider>
          <TestConsumer />
        </ThemeProvider>
      )
      
      const setDarkButton = screen.getByTestId('set-dark')
      
      // Should not throw error
      expect(() => {
        fireEvent.click(setDarkButton)
      }).not.toThrow()
      
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled()
      })
      
      consoleSpy.mockRestore()
    })

    it('should handle matchMedia errors gracefully', () => {
      // Mock matchMedia to throw error
      matchMediaMock.mockImplementation(() => {
        throw new Error('matchMedia error')
      })
      
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      // Should not throw error during render
      expect(() => {
        render(
          <ThemeProvider>
            <TestConsumer />
          </ThemeProvider>
        )
      }).not.toThrow()
      
      consoleSpy.mockRestore()
    })
  })

  describe('Performance', () => {
    it('should not cause excessive re-renders', async () => {
      let renderCount = 0
      
      function CountingConsumer() {
        renderCount++
        const { theme, toggle } = useTheme()
        return (
          <div>
            <span data-testid="theme">{theme}</span>
            <button data-testid="toggle" onClick={toggle}>Toggle</button>
          </div>
        )
      }
      
      render(
        <ThemeProvider>
          <CountingConsumer />
        </ThemeProvider>
      )
      
      const initialRenderCount = renderCount
      const toggleButton = screen.getByTestId('toggle')
      
      // Single toggle should only cause one additional render
      fireEvent.click(toggleButton)
      
      await waitFor(() => {
        expect(screen.getByTestId('theme')).toHaveTextContent('dark')
      })
      
      // Should not have excessive re-renders
      expect(renderCount - initialRenderCount).toBeLessThanOrEqual(2)
    })
  })
})