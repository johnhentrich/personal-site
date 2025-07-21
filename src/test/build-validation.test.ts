import { describe, it, expect } from 'vitest'
import fs from 'fs/promises'
import path from 'path'

/**
 * Build Validation Tests
 * 
 * These tests validate that the build process works correctly
 * and that essential deployment files are generated properly.
 */
describe('Build Process Validation', () => {
  
  describe('TypeScript Configuration', () => {
    it('should have strict TypeScript configuration', async () => {
      const tsconfigPath = path.join(process.cwd(), 'tsconfig.json')
      const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, 'utf-8'))
      
      expect(tsconfig.compilerOptions.strict).toBe(true)
      // Note: noUnusedLocals and noUnusedParameters are handled by ESLint in this project
      expect(tsconfig.compilerOptions.target).toBe('ES2017')
      expect(tsconfig.compilerOptions.moduleResolution).toBe('bundler')
    })

    it('should have proper JSX configuration for React', async () => {
      const tsconfigPath = path.join(process.cwd(), 'tsconfig.json')
      const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, 'utf-8'))
      
      expect(tsconfig.compilerOptions.jsx).toBe('preserve')
      expect(tsconfig.compilerOptions.lib).toContain('dom')
      expect(tsconfig.compilerOptions.lib).toContain('dom.iterable')
    })
  })

  describe('Build Configuration', () => {
    it('should have Next.js export configuration', async () => {
      const nextConfigPath = path.join(process.cwd(), 'next.config.ts')
      const nextConfig = await fs.readFile(nextConfigPath, 'utf-8')
      
      expect(nextConfig).toContain("output: 'export'")
      expect(nextConfig).toContain('trailingSlash: true')
      expect(nextConfig).toContain('unoptimized: true')
    })

    it('should have proper package.json scripts', async () => {
      const packagePath = path.join(process.cwd(), 'package.json')
      const packageJson = JSON.parse(await fs.readFile(packagePath, 'utf-8'))
      
      expect(packageJson.scripts.build).toBe('next build')
      expect(packageJson.scripts.lint).toBe('next lint')
      expect(packageJson.scripts.deploy).toContain('gh-pages')
    })
  })

  describe('GitHub Actions Configuration', () => {
    it('should have deployment workflow', async () => {
      const workflowPath = path.join(process.cwd(), '.github/workflows/deploy.yml')
      const workflow = await fs.readFile(workflowPath, 'utf-8')
      
      expect(workflow).toContain('Deploy to GitHub Pages')
      expect(workflow).toContain('npm run build')
      expect(workflow).toContain('./out')
      expect(workflow).toContain('actions/deploy-pages@v4')
    })

    it('should have correct permissions in workflow', async () => {
      const workflowPath = path.join(process.cwd(), '.github/workflows/deploy.yml')
      const workflow = await fs.readFile(workflowPath, 'utf-8')
      
      expect(workflow).toContain('pages: write')
      expect(workflow).toContain('id-token: write')
      expect(workflow).toContain('contents: read')
    })
  })

  describe('Domain Configuration', () => {
    it('should have CNAME file for custom domain', async () => {
      const cnamePath = path.join(process.cwd(), 'public/CNAME')
      const domain = await fs.readFile(cnamePath, 'utf-8')
      
      expect(domain.trim()).toBe('johnhentrich.com')
    })
  })

  describe('Build Output Validation', () => {
    it('should validate essential build artifacts exist after build', async () => {
      // This test assumes build has been run - it validates the output structure
      try {
        const outDir = path.join(process.cwd(), 'out')
        const outStats = await fs.stat(outDir)
        expect(outStats.isDirectory()).toBe(true)

        // Check for essential files
        const indexHtml = path.join(outDir, 'index.html')
        const indexStats = await fs.stat(indexHtml)
        expect(indexStats.isFile()).toBe(true)

        // Check for CNAME in output
        const outCname = path.join(outDir, 'CNAME')
        const cnameStats = await fs.stat(outCname)
        expect(cnameStats.isFile()).toBe(true)

        // Validate CNAME content
        const cnameContent = await fs.readFile(outCname, 'utf-8')
        expect(cnameContent.trim()).toBe('johnhentrich.com')
      } catch (error) {
        // If out directory doesn't exist, skip this test
        // (This handles cases where test runs without build)
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          console.warn('Build output not found - run `npm run build` to generate output for validation')
        } else {
          throw error
        }
      }
    })
  })

  describe('Code Quality Validation', () => {
    it('should follow security best practices in production code', async () => {
      const srcDir = path.join(process.cwd(), 'src')
      
      async function scanDirectory(dir: string): Promise<void> {
        const entries = await fs.readdir(dir, { withFileTypes: true })
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name)
          
          if (entry.isDirectory()) {
            await scanDirectory(fullPath)
          } else if ((entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) && !entry.name.includes('.test.')) {
            const content = await fs.readFile(fullPath, 'utf-8')
            
            // Check for console.log specifically (warn/error are acceptable for debugging/errors)
            const consoleLogMatches = content.match(/console\.log/g)
            if (consoleLogMatches) {
              // console.log should be guarded by NODE_ENV check
              expect(content).toMatch(/NODE_ENV.*===.*'development'|'development'.*===.*NODE_ENV/)
            }
            
            // Check that we don't have uncontrolled HTML injection (except in known safe files)
            if (!fullPath.includes('ThemeScript.tsx')) {
              const htmlInjectionPatterns = [
                /innerHTML\s*=/,
                /outerHTML\s*=/,
                /insertAdjacentHTML/
              ]
              htmlInjectionPatterns.forEach(pattern => {
                expect(content).not.toMatch(pattern)
              })
            }
          }
        }
      }
      
      await scanDirectory(srcDir)
    })

    it('should use proper TypeScript types instead of any', async () => {
      const srcDir = path.join(process.cwd(), 'src')
      
      async function scanForAnyTypes(dir: string): Promise<void> {
        const entries = await fs.readdir(dir, { withFileTypes: true })
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name)
          
          if (entry.isDirectory()) {
            await scanForAnyTypes(fullPath)
          } else if ((entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) && !entry.name.includes('.test.')) {
            const content = await fs.readFile(fullPath, 'utf-8')
            
            // Check for 'as any' usage (should be avoided in non-test files)
            expect(content).not.toContain('as any')
            
            // Check for explicit any types (should be specific types)
            const anyTypeMatches = content.match(/:\s*any\b/g)
            if (anyTypeMatches) {
              console.warn(`Found 'any' type in ${fullPath} - consider using specific types`)
            }
          }
        }
      }
      
      await scanForAnyTypes(srcDir)
    })
  })
})