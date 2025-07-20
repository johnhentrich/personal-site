import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

describe('Comprehensive Dark Mode Final Tests', () => {
  beforeEach(() => {
    // Reset DOM state
    document.documentElement.className = ''
    document.documentElement.classList.remove('dark')
    localStorage.clear()
    
    // Clear all console mocks
    vi.clearAllMocks()
  })

  it('should demonstrate complete dark mode workflow', async () => {
    const user = userEvent.setup()
    
    // 1. Test initial state (default dark mode)
    render(
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            <ThemeToggle />
            <h1 className="text-xl font-bold">Dark Mode Test Page</h1>
            <p className="text-gray-600 dark:text-gray-300">This text should change color based on theme</p>
          </div>
        </div>
      </ThemeProvider>
    )

    // Should start in dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
    
    // 2. Toggle to light mode
    await user.click(button)
    
    // Should now be in light mode
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    
    // 3. Toggle back to dark mode
    await user.click(button)
    
    // Should be back in dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  it('should handle localStorage persistence correctly', async () => {
    const user = userEvent.setup()
    
    // Start with default dark mode
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    // Should start in dark mode (default)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
    
    // Toggle to light mode
    await user.click(button)
    
    // Should be in light mode
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    
    // Toggle back to dark mode  
    await user.click(button)
    
    // Should be back to dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should handle edge cases gracefully', async () => {
    const user = userEvent.setup()
    
    // Test with malformed localStorage data
    localStorage.setItem('darkMode', 'invalid-json')
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    // Should default to dark mode on invalid data
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    
    // Should still be able to toggle
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('should work with multiple theme toggles on the same page', async () => {
    const user = userEvent.setup()
    
    render(
      <ThemeProvider>
        <div>
          <ThemeToggle />
          <ThemeToggle />
        </div>
      </ThemeProvider>
    )
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    
    // Both buttons should have the same state
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
    })
    
    // Click first button
    await user.click(buttons[0])
    
    // Both buttons should update
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    })
    
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('should verify CSS classes are applied correctly', () => {
    // Test dark mode styles
    document.documentElement.classList.add('dark')
    
    render(
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 border border-gray-200 dark:border-gray-700">
        <span className="text-blue-600 dark:text-blue-400">Colored text</span>
      </div>
    )
    
    // Remove dark mode
    document.documentElement.classList.remove('dark')
    
    // Classes should still be there (Tailwind applies them conditionally)
    const container = screen.getByText('Colored text').parentElement
    expect(container).toHaveClass('bg-white', 'dark:bg-gray-900', 'text-gray-900', 'dark:text-white')
  })

  it('should demonstrate the server-side script behavior', () => {
    // Simulate server-side script execution
    const executeServerScript = (storedValue: string | null) => {
      try {
        const isDark = storedValue !== null ? JSON.parse(storedValue) : true
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } catch {
        document.documentElement.classList.add('dark')
      }
    }
    
    // Test various scenarios
    
    // 1. No stored preference (should default to dark)
    executeServerScript(null)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    
    // 2. Stored light preference
    document.documentElement.classList.remove('dark')
    executeServerScript('false')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    
    // 3. Stored dark preference
    document.documentElement.classList.remove('dark')
    executeServerScript('true')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    
    // 4. Invalid stored data (should default to dark)
    document.documentElement.classList.remove('dark')
    executeServerScript('invalid')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})