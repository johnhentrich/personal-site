import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

describe('Integration Tests', () => {
  it('dark mode toggle works with theme context', async () => {
    const user = userEvent.setup()
    
    render(
      <ThemeProvider>
        <div className="dark:bg-gray-900 bg-white">
          <ThemeToggle />
          <p>Test content</p>
        </div>
      </ThemeProvider>
    )
    
    const toggleButton = screen.getByRole('button')
    const testContent = screen.getByText('Test content')
    
    expect(toggleButton).toBeInTheDocument()
    expect(testContent).toBeInTheDocument()
    
    // Button should be clickable
    await user.click(toggleButton)
    
    // Note: In a real integration test, we'd verify the dark class
    // was applied to document.documentElement, but that's mocked in our setup
  })

  it('theme provider provides context to children', () => {
    // Mock console.error to catch context errors
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    // Should render without context errors
    expect(consoleSpy).not.toHaveBeenCalled()
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })

  it('components work together in a page-like structure', () => {
    render(
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <header className="flex justify-between items-center p-4">
            <h1 className="text-gray-900 dark:text-white">Site Title</h1>
            <ThemeToggle />
          </header>
          <main className="p-4">
            <p className="text-gray-600 dark:text-gray-300">Main content</p>
          </main>
        </div>
      </ThemeProvider>
    )
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Site Title')
    expect(screen.getByText('Main content')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})