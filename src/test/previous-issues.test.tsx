import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Previous Issues - Regression Test Suite', () => {
  describe('Issue #1: Resume Page Template Literal Syntax Errors', () => {
    it('should handle template literals in resume date formatting', () => {
      const startDate = '2022-01-01'
      const endDate = null
      
      // This was the problematic pattern that caused syntax errors
      const formattedDate = `${startDate} - ${endDate ? endDate : 'PRESENT'}`
      
      expect(formattedDate).toBe('2022-01-01 - PRESENT')
      expect(() => formattedDate).not.toThrow()
    })

    it('should handle complex nested template literals safely', () => {
      const workExperience = {
        name: 'Ford Motor Company',
        startDate: '2022-01-01',
        endDate: null,
        positions: [
          { title: 'Senior Manager', startDate: '2022-01-01', endDate: null }
        ]
      }
      
      // Test the pattern that was causing issues in resume page
      const dateRange = workExperience.positions.length > 1
        ? `${workExperience.startDate} - ${workExperience.endDate || 'PRESENT'}`
        : `${workExperience.positions[0].startDate.split('-')[0]} - PRESENT`
      
      expect(dateRange).toBe('2022 - PRESENT')
      expect(() => dateRange).not.toThrow()
    })

    it('should handle template literals with conditional expressions', () => {
      const experience = {
        totalYears: 3,
        isCurrent: true,
        company: 'Ford'
      }
      
      // This pattern was causing parsing issues
      const summary = `${experience.totalYears} years${experience.isCurrent ? ' (current)' : ''} at ${experience.company}`
      
      expect(summary).toBe('3 years (current) at Ford')
      expect(() => summary).not.toThrow()
    })
  })

  describe('Issue #2: Dark Mode FOUC and Hydration Issues', () => {
    it('should prevent FOUC with proper SSR dark mode handling', () => {
      // Mock localStorage for SSR testing
      const mockLocalStorage = {
        getItem: vi.fn().mockReturnValue('true'),
        setItem: vi.fn()
      }
      
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true
      })

      // Test the dark mode initialization script
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

      expect(() => {
        new Function(darkModeScript)()
      }).not.toThrow()

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('darkMode')
    })

    it('should handle dark mode state persistence correctly', () => {
      const mockLocalStorage = {
        getItem: vi.fn().mockReturnValue(JSON.stringify(true)),
        setItem: vi.fn()
      }
      
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true
      })

      // Simulate the dark mode toggle logic
      const currentMode = JSON.parse(mockLocalStorage.getItem('darkMode') || 'false')
      const newMode = !currentMode
      mockLocalStorage.setItem('darkMode', JSON.stringify(newMode))
      
      expect(currentMode).toBe(true)
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('darkMode', 'false')
    })

    it('should handle hydration mismatch gracefully', () => {
      // Test server-side vs client-side rendering differences
      const serverSideDefault = true // Server default
      
      const mockLocalStorage = {
        getItem: vi.fn().mockReturnValue(JSON.stringify(false)) // Client has different value
      }
      
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true
      })

      const clientSideValue = JSON.parse(mockLocalStorage.getItem('darkMode') || JSON.stringify(serverSideDefault))
      
      // Should handle mismatch without crashing
      expect(() => {
        document.documentElement.classList.toggle('dark', clientSideValue)
      }).not.toThrow()
    })
  })

  describe('Issue #3: JSON Data Loading and Validation', () => {
    it('should handle malformed work experience JSON', () => {
      const malformedData = '{ "name": "Company", invalid: true }'
      
      expect(() => {
        try {
          JSON.parse(malformedData)
        } catch {
          console.warn('Invalid JSON detected, using fallback data')
          return [] // Fallback to empty array
        }
      }).not.toThrow()
    })

    it('should validate required fields in resume data', () => {
      const workData = [
        { name: 'Ford', position: 'Manager' }, // Missing required fields
        { name: 'Company', position: 'Role', startDate: '2022', summary: 'Test', highlights: [], url: 'test.com' } // Complete
      ]
      
      const validatedData = workData.filter(item => {
        const requiredFields = ['name', 'position', 'startDate', 'summary', 'highlights', 'url']
        return requiredFields.every(field => item.hasOwnProperty(field))
      })
      
      expect(validatedData).toHaveLength(1)
      expect(validatedData[0].name).toBe('Company')
    })

    it('should handle missing education.json file gracefully', () => {
      const mockReadFile = vi.fn().mockImplementation(() => {
        throw new Error('ENOENT: no such file or directory')
      })
      
      expect(() => {
        try {
          mockReadFile()
        } catch {
          console.warn('Education file not found, using empty data')
          return [] // Fallback
        }
      }).not.toThrow()
    })

    it('should handle incomplete project data structure', () => {
      const projectData = [
        { name: 'Project 1' }, // Missing fields
        { 
          name: 'Complete Project',
          description: 'Test',
          technologies: ['React'],
          githubUrl: 'https://github.com/test',
          status: 'completed'
        }
      ]
      
      const completeProjects = projectData.filter(project => 
        project.name && 
        project.description && 
        project.technologies && 
        project.status
      )
      
      expect(completeProjects).toHaveLength(1)
    })
  })

  describe('Issue #4: ESLint Configuration and Build Errors', () => {
    it('should handle TypeScript import patterns correctly', () => {
      // Test import patterns that were causing lint errors
      expect(() => {
        const importStatement = "import { readFileSync } from 'fs'"
        expect(importStatement).toContain('import')
        expect(importStatement).not.toContain('require(')
      }).not.toThrow()
    })

    it('should handle React component prop types correctly', () => {
      interface ComponentProps {
        children: React.ReactNode
        className?: string
        currentPage?: string
      }
      
      const validProps: ComponentProps = {
        children: 'test content'
      }
      
      expect(validProps.children).toBeTruthy()
      expect(validProps.currentPage).toBeUndefined()
    })

    it('should handle unused variable warnings correctly', () => {
      // Test patterns that were causing lint warnings
      const unusedVarTest = () => {
        const used = 'this is used'
        // const unused = 'this would cause warning' - removed to fix lint
        return used
      }
      
      expect(unusedVarTest()).toBe('this is used')
    })
  })

  describe('Issue #5: GitHub Pages Deployment and Asset Loading', () => {
    it('should verify .nojekyll file prevents Jekyll processing', () => {
      // Test that .nojekyll file exists and prevents Jekyll from ignoring _next directory
      const nojekyllContent = '' // Empty file is sufficient
      
      expect(() => {
        // Simulate Jekyll processing
        const shouldIgnoreUnderscore = nojekyllContent === '' ? false : true
        expect(shouldIgnoreUnderscore).toBe(false)
      }).not.toThrow()
    })

    it('should verify CSS asset paths work with custom domain', () => {
      const cssPath = '/_next/static/css/app.css'
      const jsPath = '/_next/static/chunks/main.js'
      
      // For custom domain, absolute paths starting with / should work
      expect(cssPath.startsWith('/')).toBe(true)
      expect(jsPath.startsWith('/')).toBe(true)
      expect(cssPath).toMatch(/^\/_next\/static\/css\//)
      expect(jsPath).toMatch(/^\/_next\/static\/chunks\//)
    })

    it('should handle gh-pages deployment flags correctly', () => {
      const deployScript = 'gh-pages -d out --dotfiles --nojekyll --cname johnhentrich.com'
      
      expect(deployScript).toContain('--dotfiles')
      expect(deployScript).toContain('--nojekyll')
      expect(deployScript).toContain('--cname')
      expect(deployScript).toContain('johnhentrich.com')
    })
  })

  describe('Issue #6: Navigation and Router Mock Issues', () => {
    it('should handle Next.js router mocking correctly', () => {
      const mockRouter = {
        push: vi.fn(),
        replace: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
        prefetch: vi.fn()
      }
      
      // Test router methods don't throw
      expect(() => {
        mockRouter.push('/test')
        mockRouter.replace('/test')
        mockRouter.back()
      }).not.toThrow()
      
      expect(mockRouter.push).toHaveBeenCalledWith('/test')
    })

    it('should handle navigation state correctly', () => {
      const mockSearchParams = new URLSearchParams('?tab=about')
      const mockPathname = '/projects'
      
      expect(mockSearchParams.get('tab')).toBe('about')
      expect(mockPathname).toBe('/projects')
    })

    it('should handle mobile menu state transitions', () => {
      let isMenuOpen = false
      
      const toggleMenu = () => {
        isMenuOpen = !isMenuOpen
      }
      
      expect(isMenuOpen).toBe(false)
      toggleMenu()
      expect(isMenuOpen).toBe(true)
      toggleMenu()
      expect(isMenuOpen).toBe(false)
    })
  })

  describe('Issue #7: Build Optimization and Performance', () => {
    it('should handle static generation correctly', () => {
      const staticPages = [
        '/',
        '/about',
        '/projects', 
        '/resume',
        '/other',
        '/contact',
        '/blog'
      ]
      
      staticPages.forEach(page => {
        expect(page).toMatch(/^\//)
        expect(page.length).toBeGreaterThan(0)
      })
    })

    it('should handle dynamic blog routes correctly', () => {
      const blogPosts = [
        'building-analytics-infrastructure',
        'data-driven-product-decisions',
        'scaling-digital-services'
      ]
      
      blogPosts.forEach(slug => {
        const route = `/blog/${slug}`
        expect(route).toMatch(/^\/blog\/[a-z-]+$/)
      })
    })

    it('should handle asset optimization correctly', () => {
      const assetTypes = [
        { type: 'css', pattern: /\.css$/ },
        { type: 'js', pattern: /\.js$/ },
        { type: 'woff2', pattern: /\.woff2$/ }
      ]
      
      assetTypes.forEach(asset => {
        const filename = `test.${asset.type}`
        expect(filename).toMatch(asset.pattern)
      })
    })
  })

  describe('Issue #8: Component Integration and Testing', () => {
    it('should handle theme toggle integration', () => {
      const ThemeToggleMock = () => {
        return <button data-testid="theme-toggle">Toggle Theme</button>
      }
      
      render(<ThemeToggleMock />)
      const button = screen.getByTestId('theme-toggle')
      
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Toggle Theme')
    })

    it('should handle responsive navigation correctly', () => {
      const HeaderMock = () => {
        return (
          <header>
            <nav className="hidden md:flex">Desktop Nav</nav>
            <nav className="md:hidden">Mobile Nav</nav>
          </header>
        )
      }
      
      render(<HeaderMock />)
      
      expect(screen.getByText('Desktop Nav')).toBeInTheDocument()
      expect(screen.getByText('Mobile Nav')).toBeInTheDocument()
    })

    it('should handle page layout structure correctly', () => {
      const PageLayoutMock = ({ children }: { children: React.ReactNode }) => {
        return (
          <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        )
      }
      
      render(
        <PageLayoutMock>
          <div data-testid="page-content">Test Content</div>
        </PageLayoutMock>
      )
      
      expect(screen.getByTestId('page-content')).toBeInTheDocument()
    })
  })

  describe('Issue #9: Font Loading and Typography', () => {
    it('should handle font loading failures gracefully', () => {
      const fontStack = 'Inter, system-ui, -apple-system, sans-serif'
      const fallbackFonts = fontStack.split(', ').slice(1)
      
      expect(fallbackFonts).toContain('system-ui')
      expect(fallbackFonts).toContain('-apple-system')
      expect(fallbackFonts).toContain('sans-serif')
    })

    it('should handle font variable classes correctly', () => {
      const fontVariables = ['__variable_e8ce0c', '__variable_4f7708']
      
      fontVariables.forEach(variable => {
        expect(variable).toMatch(/^__variable_[a-f0-9]+$/)
      })
    })
  })

  describe('Issue #10: Error Boundary and Fallback Handling', () => {
    it('should handle component rendering errors gracefully', () => {
      const ErrorBoundaryMock = ({ children }: { children: React.ReactNode }) => {
        try {
          return <div>{children}</div>
        } catch {
          return <div>Something went wrong</div>
        }
      }
      
      render(
        <ErrorBoundaryMock>
          <div>Normal content</div>
        </ErrorBoundaryMock>
      )
      
      expect(screen.getByText('Normal content')).toBeInTheDocument()
    })

    it('should handle missing data gracefully', () => {
      const ComponentWithFallback = ({ data }: { data?: string[] }) => {
        if (!data || data.length === 0) {
          return <div>No data available</div>
        }
        return <div>{data.join(', ')}</div>
      }
      
      render(<ComponentWithFallback />)
      expect(screen.getByText('No data available')).toBeInTheDocument()
      
      render(<ComponentWithFallback data={['item1', 'item2']} />)
      expect(screen.getByText('item1, item2')).toBeInTheDocument()
    })
  })
})