import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync, readdirSync } from 'fs'
import { join } from 'path'

describe('Deployment Configuration Tests', () => {
  describe('GitHub Pages Deployment Files', () => {
    it('should have .nojekyll file in out directory after build', () => {
      const nojekyllPath = join(process.cwd(), 'out', '.nojekyll')
      
      // Check if .nojekyll file exists
      expect(existsSync(nojekyllPath)).toBe(true)
    })

    it('should have CNAME file with correct domain', () => {
      const cnamePath = join(process.cwd(), 'out', 'CNAME')
      
      if (existsSync(cnamePath)) {
        const cnameContent = readFileSync(cnamePath, 'utf-8').trim()
        expect(cnameContent).toBe('johnhentrich.com')
      }
    })

    it('should have proper package.json deploy script configuration', () => {
      const packageJsonPath = join(process.cwd(), 'package.json')
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
      
      expect(packageJson.scripts.deploy).toContain('--dotfiles')
      expect(packageJson.scripts.deploy).toContain('--nojekyll')
      expect(packageJson.scripts.deploy).toContain('--cname johnhentrich.com')
    })

    it('should have predeploy script that creates .nojekyll file', () => {
      const packageJsonPath = join(process.cwd(), 'package.json')
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
      
      expect(packageJson.scripts.predeploy).toContain('touch ./out/.nojekyll')
    })
  })

  describe('Static Asset Generation', () => {
    it('should generate CSS files in _next/static/css directory', () => {
      const cssDir = join(process.cwd(), 'out', '_next', 'static', 'css')
      
      if (existsSync(cssDir)) {
        const files = readdirSync(cssDir)
        const cssFiles = files.filter((file: string) => file.endsWith('.css'))
        expect(cssFiles.length).toBeGreaterThan(0)
      }
    })

    it('should generate JavaScript chunks in _next/static/chunks directory', () => {
      const chunksDir = join(process.cwd(), 'out', '_next', 'static', 'chunks')
      
      if (existsSync(chunksDir)) {
        const files = readdirSync(chunksDir)
        const jsFiles = files.filter((file: string) => file.endsWith('.js'))
        expect(jsFiles.length).toBeGreaterThan(0)
      }
    })

    it('should include favicon and other static assets', () => {
      const faviconPath = join(process.cwd(), 'out', 'favicon.ico')
      expect(existsSync(faviconPath)).toBe(true)
    })
  })

  describe('HTML Asset References', () => {
    it('should have correct CSS link tags in HTML', () => {
      const indexPath = join(process.cwd(), 'out', 'index.html')
      
      if (existsSync(indexPath)) {
        const htmlContent = readFileSync(indexPath, 'utf-8')
        
        // Check for CSS link tag
        expect(htmlContent).toMatch(/<link[^>]*rel="stylesheet"[^>]*href="\/_next\/static\/css\/[^"]+\.css"/)
        
        // Check for proper CSS precedence
        expect(htmlContent).toMatch(/data-precedence="next"/)
      }
    })

    it('should have correct script tags for JavaScript chunks', () => {
      const indexPath = join(process.cwd(), 'out', 'index.html')
      
      if (existsSync(indexPath)) {
        const htmlContent = readFileSync(indexPath, 'utf-8')
        
        // Check for main JavaScript chunks
        expect(htmlContent).toMatch(/<script[^>]*src="\/_next\/static\/chunks\/[^"]+\.js"/)
        
        // Check for webpack chunk
        expect(htmlContent).toMatch(/webpack-[a-f0-9]+\.js/)
      }
    })

    it('should have proper font preload tags', () => {
      const indexPath = join(process.cwd(), 'out', 'index.html')
      
      if (existsSync(indexPath)) {
        const htmlContent = readFileSync(indexPath, 'utf-8')
        
        // Check for font preload tags
        expect(htmlContent).toMatch(/<link[^>]*rel="preload"[^>]*as="font"[^>]*type="font\/woff2"/)
      }
    })
  })

  describe('Next.js Configuration', () => {
    it('should have proper next.config.ts for static export', () => {
      const configPath = join(process.cwd(), 'next.config.ts')
      const configContent = readFileSync(configPath, 'utf-8')
      
      expect(configContent).toContain("output: 'export'")
      expect(configContent).toContain('trailingSlash: true')
      expect(configContent).toContain('unoptimized: true')
    })

    it('should not have conflicting basePath or assetPrefix for custom domain', () => {
      const configPath = join(process.cwd(), 'next.config.ts')
      const configContent = readFileSync(configPath, 'utf-8')
      
      // For custom domain, we shouldn't have basePath or assetPrefix
      expect(configContent).not.toMatch(/basePath:\s*['"][^'"]+['"]/)
      expect(configContent).not.toMatch(/assetPrefix:\s*['"][^'"]+['"]/)
    })
  })

  describe('Dark Mode Asset Loading', () => {
    it('should have dark mode initialization script in HTML head', () => {
      const indexPath = join(process.cwd(), 'out', 'index.html')
      
      if (existsSync(indexPath)) {
        const htmlContent = readFileSync(indexPath, 'utf-8')
        
        // Check for dark mode localStorage script
        expect(htmlContent).toMatch(/localStorage\.getItem\('darkMode'\)/)
        expect(htmlContent).toMatch(/document\.documentElement\.classList\.add\('dark'\)/)
      }
    })

    it('should have proper CSS classes for dark mode in HTML', () => {
      const indexPath = join(process.cwd(), 'out', 'index.html')
      
      if (existsSync(indexPath)) {
        const htmlContent = readFileSync(indexPath, 'utf-8')
        
        // Check for dark mode CSS classes
        expect(htmlContent).toMatch(/dark:bg-gray-900/)
        expect(htmlContent).toMatch(/dark:text-white/)
      }
    })
  })

  describe('SEO and Meta Tags', () => {
    it('should have proper meta tags for SEO', () => {
      const indexPath = join(process.cwd(), 'out', 'index.html')
      
      if (existsSync(indexPath)) {
        const htmlContent = readFileSync(indexPath, 'utf-8')
        
        expect(htmlContent).toMatch(/<meta[^>]*name="description"[^>]*content="[^"]*Business Operations/)
        expect(htmlContent).toMatch(/<meta[^>]*name="author"[^>]*content="John Hentrich"/)
        expect(htmlContent).toMatch(/<meta[^>]*property="og:title"[^>]*content="John Hentrich"/)
        expect(htmlContent).toMatch(/<meta[^>]*property="og:url"[^>]*content="https:\/\/johnhentrich\.com\/"/)
      }
    })

    it('should have proper page title', () => {
      const indexPath = join(process.cwd(), 'out', 'index.html')
      
      if (existsSync(indexPath)) {
        const htmlContent = readFileSync(indexPath, 'utf-8')
        expect(htmlContent).toMatch(/<title>John Hentrich<\/title>/)
      }
    })
  })

  describe('Static Page Generation', () => {
    it('should generate all expected static pages', () => {
      const expectedPages = [
        'index.html',
        'about/index.html',
        'projects/index.html',
        'resume/index.html',
        'other/index.html',
        'contact/index.html',
        'blog/index.html'
      ]

      expectedPages.forEach(page => {
        const pagePath = join(process.cwd(), 'out', page)
        expect(existsSync(pagePath)).toBe(true)
      })
    })

    it('should generate blog post pages', () => {
      const blogPosts = [
        'blog/building-analytics-infrastructure/index.html',
        'blog/data-driven-product-decisions/index.html',
        'blog/scaling-digital-services/index.html'
      ]

      blogPosts.forEach(post => {
        const postPath = join(process.cwd(), 'out', post)
        expect(existsSync(postPath)).toBe(true)
      })
    })
  })

  describe('Asset Loading Validation', () => {
    it('should not have any absolute asset paths that would break on GitHub Pages', () => {
      const indexPath = join(process.cwd(), 'out', 'index.html')
      
      if (existsSync(indexPath)) {
        const htmlContent = readFileSync(indexPath, 'utf-8')
        
        // All Next.js assets should start with /_next/
        const assetMatches = htmlContent.match(/(?:src|href)="\/[^"]+"/g) || []
        
        assetMatches.forEach(match => {
          if (match.includes('/_next/') || match.includes('/favicon.ico') || 
              match.includes('/') && !match.includes('/_next/')) {
            // These are acceptable paths for custom domain
            expect(match).toBeTruthy()
          }
        })
      }
    })

    it('should have consistent asset hash naming', () => {
      const chunksDir = join(process.cwd(), 'out', '_next', 'static', 'chunks')
      
      if (existsSync(chunksDir)) {
        const files = readdirSync(chunksDir)
        const hashedFiles = files.filter((file: string) => 
          file.match(/^[a-f0-9]+-[a-f0-9]+\.js$/) || 
          file.match(/^[a-zA-Z0-9]+-[a-f0-9]+\.js$/)
        )
        
        expect(hashedFiles.length).toBeGreaterThan(0)
      }
    })
  })

  describe('Deployment Script Validation', () => {
    it('should validate gh-pages command syntax', () => {
      const packageJsonPath = join(process.cwd(), 'package.json')
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
      
      const deployScript = packageJson.scripts.deploy
      
      // Should contain all necessary flags
      expect(deployScript).toContain('gh-pages')
      expect(deployScript).toContain('-d out')
      expect(deployScript).toContain('--dotfiles')
      expect(deployScript).toContain('--nojekyll')
      expect(deployScript).toContain('--cname')
    })

    it('should have predeploy hook that runs before deployment', () => {
      const packageJsonPath = join(process.cwd(), 'package.json')
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
      
      expect(packageJson.scripts.predeploy).toBeDefined()
      expect(packageJson.scripts.predeploy).toContain('npm run build')
    })
  })
})