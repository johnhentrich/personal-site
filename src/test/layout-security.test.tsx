import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import RootLayout from '@/app/layout'

describe('RootLayout Security and Dark Mode Initialization', () => {
  beforeEach(() => {
    // Reset DOM state
    document.documentElement.className = ''
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should not use dangerouslySetInnerHTML for security', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    // Check that the layout doesn't contain script with dangerouslySetInnerHTML
    const scripts = container.querySelectorAll('script')
    scripts.forEach(script => {
      // Scripts should not have innerHTML content that suggests dangerouslySetInnerHTML
      expect(script.innerHTML).not.toContain('localStorage.getItem')
      expect(script.innerHTML).not.toContain('darkMode')
    })
  })

  it('should safely initialize dark mode without XSS vulnerabilities', () => {
    // Test with no stored preference
    localStorage.clear()
    
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    // Should default to dark mode safely
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should handle stored dark mode preference safely', () => {
    localStorage.setItem('darkMode', 'false')
    
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    // Should respect stored preference
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('should handle malformed localStorage data without security issues', () => {
    // Test potential XSS payload in localStorage
    localStorage.setItem('darkMode', '<script>alert("xss")</script>')
    
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    // Should default to dark mode and not execute script
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('should ensure theme initialization is server-safe', () => {
    // Simulate server environment where localStorage doesn't exist
    const originalLocalStorage = global.localStorage
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (global as any).localStorage
    
    try {
      render(
        <RootLayout>
          <div>Test Content</div>
        </RootLayout>
      )

      // Should not crash and should default to dark mode
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    } finally {
      global.localStorage = originalLocalStorage
    }
  })

  it('should have proper CSP-safe implementation', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    // Verify no inline scripts that would violate CSP
    const inlineScripts = container.querySelectorAll('script:not([src])')
    inlineScripts.forEach(script => {
      expect(script.innerHTML.trim()).toBe('')
    })
  })
})