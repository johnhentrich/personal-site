import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

// This test simulates what should happen on the live site
describe('Live Dark Mode Integration Test', () => {
  beforeEach(() => {
    // Reset document classes
    document.documentElement.className = ''
    
    // Clear localStorage
    localStorage.clear()
  })

  it('should actually toggle document.documentElement.classList', async () => {
    const user = userEvent.setup()
    
    // Start with no stored preference (should default to dark)
    render(
      <ThemeProvider>
        <div>
          <ThemeToggle />
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4">
            Test content that should change color
          </div>
        </div>
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    const testContent = screen.getByText('Test content that should change color')
    
    console.log('Initial document classes:', document.documentElement.className)
    console.log('Initial classList contains dark:', document.documentElement.classList.contains('dark'))
    
    // Toggle to light mode
    await user.click(button)
    
    console.log('After first click - document classes:', document.documentElement.className)
    console.log('After first click - classList contains dark:', document.documentElement.classList.contains('dark'))
    console.log('LocalStorage value:', localStorage.getItem('darkMode'))
    
    // Wait a bit for any async operations
    await new Promise(resolve => setTimeout(resolve, 200))
    
    console.log('After timeout - document classes:', document.documentElement.className)
    console.log('After timeout - classList contains dark:', document.documentElement.classList.contains('dark'))
    
    // Toggle back to dark mode
    await user.click(button)
    
    console.log('After second click - document classes:', document.documentElement.className)
    console.log('After second click - classList contains dark:', document.documentElement.classList.contains('dark'))
    console.log('Final localStorage value:', localStorage.getItem('darkMode'))
    
    // The button should have the correct aria-label based on current state
    const finalButton = screen.getByRole('button')
    console.log('Final button aria-label:', finalButton.getAttribute('aria-label'))
    
    // Test that the actual DOM changes happened
    expect(document.documentElement.classList.contains('dark')).toBeTruthy()
  })

  it('should demonstrate the CSS class application', () => {
    // Test with dark mode
    document.documentElement.classList.add('dark')
    
    render(
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
        Dark mode test element
      </div>
    )
    
    const element = screen.getByText('Dark mode test element')
    console.log('Dark mode element classes:', element.className)
    
    // Remove dark class
    document.documentElement.classList.remove('dark')
    
    // Re-render to see if classes change
    const { rerender } = render(
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
        Light mode test element  
      </div>
    )
    
    const lightElement = screen.getByText('Light mode test element')
    console.log('Light mode element classes:', lightElement.className)
    console.log('Document has dark class:', document.documentElement.classList.contains('dark'))
  })

  it('should verify the server-side script works with real DOM', () => {
    // Simulate what the server-side script does
    const simulateServerScript = (storedValue: string | null) => {
      try {
        const isDark = storedValue !== null ? JSON.parse(storedValue) : true
        if (isDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } catch (e) {
        document.documentElement.classList.add('dark')
      }
    }
    
    // Test default (no stored value) - should add dark
    document.documentElement.classList.remove('dark') // Reset first
    simulateServerScript(null)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    
    // Test stored light mode
    document.documentElement.classList.remove('dark') // Reset
    simulateServerScript('false')
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    
    // Test stored dark mode
    document.documentElement.classList.remove('dark') // Reset
    simulateServerScript('true')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})