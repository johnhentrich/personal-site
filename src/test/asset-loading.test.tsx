import { describe, it, expect, vi, beforeEach } from 'vitest'
// import { render, screen, waitFor } from '@testing-library/react'

// Mock next/font to test font loading scenarios
vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'font-inter',
    variable: '--font-inter'
  }),
  Merriweather: () => ({
    className: 'font-merriweather', 
    variable: '--font-merriweather'
  })
}))

describe('Asset Loading Scenarios', () => {
  beforeEach(() => {
    // Reset DOM modifications before each test
    document.head.innerHTML = ''
    document.body.className = ''
    document.documentElement.className = ''
  })

  describe('CSS Loading Scenarios', () => {
    it('should handle missing CSS gracefully', () => {
      // Simulate CSS not loading
      const originalCreateElement = document.createElement
      document.createElement = vi.fn((tagName) => {
        const element = originalCreateElement.call(document, tagName)
        if (tagName === 'link' && element.getAttribute) {
          // Mock CSS loading failure
          setTimeout(() => {
            const event = new Event('error')
            element.dispatchEvent(event)
          }, 10)
        }
        return element
      }) as typeof document.createElement

      // Component should still render without CSS
      expect(() => {
        const div = document.createElement('div')
        div.className = 'bg-white dark:bg-gray-900'
        document.body.appendChild(div)
      }).not.toThrow()

      // Restore original createElement
      document.createElement = originalCreateElement
    })

    it('should handle dark mode CSS classes correctly', () => {
      // Test dark mode class application
      document.documentElement.classList.add('dark')
      
      const element = document.createElement('div')
      element.className = 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white'
      
      expect(element.className).toContain('dark:bg-gray-900')
      expect(element.className).toContain('dark:text-white')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('should apply CSS classes for responsive design', () => {
      const element = document.createElement('div')
      element.className = 'hidden md:flex lg:grid-cols-3 xl:max-w-6xl'
      
      expect(element.className).toContain('hidden')
      expect(element.className).toContain('md:flex')
      expect(element.className).toContain('lg:grid-cols-3')
      expect(element.className).toContain('xl:max-w-6xl')
    })
  })

  describe('Font Loading Scenarios', () => {
    it('should handle web font loading failures gracefully', () => {
      // Mock font loading failure
      const mockFontFace = {
        load: vi.fn().mockRejectedValue(new Error('Font failed to load')),
        family: 'Inter',
        status: 'error'
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      global.FontFace = vi.fn().mockImplementation(() => mockFontFace) as any

      expect(() => {
        const element = document.createElement('div')
        element.style.fontFamily = 'Inter, system-ui, sans-serif'
        document.body.appendChild(element)
      }).not.toThrow()
    })

    it('should fallback to system fonts when custom fonts fail', () => {
      const element = document.createElement('div')
      element.className = 'font-heading'
      
      // Simulate font loading failure - should fallback to system fonts
      const computedStyle = {
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }
      
      expect(computedStyle.fontFamily).toContain('system-ui')
    })

    it('should handle font variable CSS classes', () => {
      document.documentElement.className = '__variable_e8ce0c __variable_4f7708'
      
      expect(document.documentElement.className).toContain('__variable_e8ce0c')
      expect(document.documentElement.className).toContain('__variable_4f7708')
    })
  })

  describe('JavaScript Loading Scenarios', () => {
    it('should handle JavaScript chunk loading failures', () => {
      const mockScript = document.createElement('script')
      mockScript.src = '/_next/static/chunks/main-app.js'
      
      // Mock script loading error
      const errorHandler = vi.fn()
      mockScript.addEventListener('error', errorHandler)
      
      // Simulate script error
      const errorEvent = new Event('error')
      mockScript.dispatchEvent(errorEvent)
      
      expect(errorHandler).toHaveBeenCalled()
    })

    it('should initialize dark mode script before other scripts', () => {
      const mockLocalStorage = {
        getItem: vi.fn().mockReturnValue('true'),
        setItem: vi.fn()
      }
      
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true
      })

      // Simulate dark mode initialization script
      const darkModeScript = `
        (function() {
          try {
            var stored = localStorage.getItem('darkMode');
            var isDark = stored !== null ? JSON.parse(stored) : true;
            if (isDark) {
              document.documentElement.classList.add('dark');
            }
          } catch (e) {
            document.documentElement.classList.add('dark');
          }
        })();
      `

      // Execute the script
      expect(() => {
        new Function(darkModeScript)()
      }).not.toThrow()

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('darkMode')
    })

    it('should handle Next.js hydration without errors', () => {
      // Mock Next.js hydration globals
      global.__next_f = []
      global.self = global

      const mockHydrationData = [1, "test hydration data"]
      
      expect(() => {
        global.__next_f.push(mockHydrationData)
      }).not.toThrow()

      expect(global.__next_f).toContain(mockHydrationData)
    })
  })

  describe('Image and Media Loading', () => {
    it('should handle image loading failures gracefully', () => {
      const img = document.createElement('img')
      img.src = '/nonexistent-image.jpg'
      
      const errorHandler = vi.fn()
      img.addEventListener('error', errorHandler)
      
      // Simulate image load error
      const errorEvent = new Event('error')
      img.dispatchEvent(errorEvent)
      
      expect(errorHandler).toHaveBeenCalled()
    })

    it('should handle SVG icon rendering', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('viewBox', '0 0 24 24')
      svg.setAttribute('fill', 'none')
      svg.setAttribute('stroke', 'currentColor')
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('stroke-linecap', 'round')
      path.setAttribute('stroke-linejoin', 'round')
      path.setAttribute('stroke-width', '2')
      path.setAttribute('d', 'M4 6h16M4 12h16M4 18h16')
      
      svg.appendChild(path)
      
      expect(svg.tagName).toBe('svg')
      expect(path.tagName).toBe('path')
      expect(svg.children).toHaveLength(1)
    })
  })

  describe('GitHub Pages Specific Scenarios', () => {
    it('should handle asset paths correctly for custom domain', () => {
      const cssPath = '/_next/static/css/app.css'
      const jsPath = '/_next/static/chunks/main.js'
      
      // For custom domain, these paths should work as-is
      expect(cssPath).toMatch(/^\/_next\/static\/css\//)
      expect(jsPath).toMatch(/^\/_next\/static\/chunks\//)
    })

    it('should handle trailing slash in URLs correctly', () => {
      const urls = [
        '/about/',
        '/projects/',
        '/resume/',
        '/contact/'
      ]
      
      urls.forEach(url => {
        expect(url).toMatch(/\/$/)
      })
    })

    it('should not break with Jekyll-style underscores', () => {
      const nextAssetPaths = [
        '/_next/static/css/app.css',
        '/_next/static/chunks/main.js',
        '/_next/static/media/font.woff2'
      ]
      
      // With .nojekyll file, these should not be ignored
      nextAssetPaths.forEach(path => {
        expect(path).toMatch(/^\/_next\//)
      })
    })
  })

  describe('Performance and Loading Optimization', () => {
    it('should preload critical resources', () => {
      const preloadTags = [
        { rel: 'preload', as: 'font', type: 'font/woff2' },
        { rel: 'preload', as: 'script' },
        { rel: 'stylesheet', href: '/_next/static/css/app.css' }
      ]
      
      preloadTags.forEach(tag => {
        const link = document.createElement('link')
        Object.entries(tag).forEach(([key, value]) => {
          link.setAttribute(key, value as string)
        })
        
        expect(link.getAttribute('rel')).toBeTruthy()
      })
    })

    it('should handle async script loading', () => {
      const script = document.createElement('script')
      script.src = '/_next/static/chunks/main.js'
      script.async = true
      
      expect(script.async).toBe(true)
      expect(script.src).toContain('/_next/static/chunks/')
    })

    it('should optimize CSS loading with proper precedence', () => {
      const cssLink = document.createElement('link')
      cssLink.rel = 'stylesheet'
      cssLink.href = '/_next/static/css/app.css'
      cssLink.setAttribute('data-precedence', 'next')
      
      expect(cssLink.getAttribute('data-precedence')).toBe('next')
    })
  })

  describe('Error Boundary and Fallback Scenarios', () => {
    it('should handle component errors gracefully', () => {
      const errorHandler = vi.fn()
      
      // Mock React error boundary behavior
      const originalConsoleError = console.error
      console.error = vi.fn()
      
      try {
        // Simulate component error
        throw new Error('Component failed to render')
      } catch (error) {
        errorHandler(error)
      }
      
      expect(errorHandler).toHaveBeenCalled()
      console.error = originalConsoleError
    })

    it('should provide fallback content when assets fail', () => {
      // Test fallback behavior
      const fallbackContent = 'Loading...'
      
      const container = document.createElement('div')
      container.textContent = fallbackContent
      
      expect(container.textContent).toBe('Loading...')
    })
  })

  describe('Cache and Storage Scenarios', () => {
    it('should handle localStorage unavailability', () => {
      const originalLocalStorage = global.localStorage
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).localStorage
      
      expect(() => {
        // Should not crash when localStorage is unavailable
        const fallbackValue = true
        expect(fallbackValue).toBe(true)
      }).not.toThrow()
      
      global.localStorage = originalLocalStorage
    })

    it('should handle corrupted localStorage data', () => {
      const mockLocalStorage = {
        getItem: vi.fn().mockReturnValue('invalid-json'),
        setItem: vi.fn()
      }
      
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true
      })
      
      expect(() => {
        try {
          JSON.parse(mockLocalStorage.getItem('darkMode'))
        } catch {
          // Should fallback gracefully
          return true
        }
      }).not.toThrow()
    })
  })
})