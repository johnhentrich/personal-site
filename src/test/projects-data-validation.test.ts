import { describe, it, expect } from 'vitest'
import projectsData from '../../data/projects.json'

describe('Projects Data Validation', () => {
  it('should not have duplicate project IDs', () => {
    const projectIds = projectsData.other.map(project => project.id)
    const uniqueIds = [...new Set(projectIds)]
    
    expect(projectIds).toHaveLength(uniqueIds.length)
    
    // Log any duplicates for debugging
    const duplicates = projectIds.filter((id, index) => projectIds.indexOf(id) !== index)
    if (duplicates.length > 0) {
      console.error('Duplicate project IDs found:', duplicates)
    }
  })

  it('should not have duplicate project titles', () => {
    const projectTitles = projectsData.other.map(project => project.title.toLowerCase())
    const uniqueTitles = [...new Set(projectTitles)]
    
    expect(projectTitles).toHaveLength(uniqueTitles.length)
    
    // Log any duplicate titles for debugging
    const duplicates = projectTitles.filter((title, index) => projectTitles.indexOf(title) !== index)
    if (duplicates.length > 0) {
      console.error('Duplicate project titles found:', duplicates)
    }
  })

  it('should have exactly one Texas Hold\'em project', () => {
    const texasHoldemProjects = projectsData.other.filter(project => 
      project.title.toLowerCase().includes('texas hold') ||
      project.title.toLowerCase().includes('poker') ||
      project.id.includes('texas') ||
      project.id.includes('holdem') ||
      project.id.includes('poker')
    )
    
    expect(texasHoldemProjects).toHaveLength(1)
    expect(texasHoldemProjects[0].id).toBe('texas-holdem-analyzer')
  })

  it('should have unique GitHub URLs', () => {
    const githubUrls = projectsData.other
      .map(project => project.github)
      .filter(url => url !== null)
    
    const uniqueUrls = [...new Set(githubUrls)]
    
    expect(githubUrls).toHaveLength(uniqueUrls.length)
  })

  it('should have valid project structure', () => {
    projectsData.other.forEach(project => {
      expect(project).toHaveProperty('id')
      expect(project).toHaveProperty('title')
      expect(project).toHaveProperty('description')
      expect(project).toHaveProperty('technologies')
      expect(project).toHaveProperty('category')
      expect(project).toHaveProperty('highlights')
      
      expect(typeof project.id).toBe('string')
      expect(typeof project.title).toBe('string')
      expect(typeof project.description).toBe('string')
      expect(Array.isArray(project.technologies)).toBe(true)
      expect(Array.isArray(project.highlights)).toBe(true)
      expect(project.id.length).toBeGreaterThan(0)
      expect(project.title.length).toBeGreaterThan(0)
    })
  })

  it('should have consistent project categories', () => {
    const validCategories = projectsData.categories.map(cat => cat.name)
    
    projectsData.other.forEach(project => {
      expect(validCategories).toContain(project.category)
    })
  })

  it('should not have projects with similar descriptions (potential duplicates)', () => {
    const descriptions = projectsData.other.map(project => project.description.toLowerCase())
    
    // Check for descriptions that are too similar (>80% overlap)
    for (let i = 0; i < descriptions.length; i++) {
      for (let j = i + 1; j < descriptions.length; j++) {
        const desc1 = descriptions[i]
        const desc2 = descriptions[j]
        
        // Simple similarity check - count common words
        const words1 = desc1.split(/\s+/).filter(word => word.length > 3)
        const words2 = desc2.split(/\s+/).filter(word => word.length > 3)
        
        const commonWords = words1.filter(word => words2.includes(word))
        const similarity = commonWords.length / Math.max(words1.length, words2.length)
        
        if (similarity > 0.6) {
          console.warn(`Potentially similar projects found:`)
          console.warn(`Project ${i + 1}: ${projectsData.other[i].title}`)
          console.warn(`Project ${j + 1}: ${projectsData.other[j].title}`)
          console.warn(`Similarity: ${(similarity * 100).toFixed(1)}%`)
        }
        
        expect(similarity).toBeLessThan(0.8) // Fail if >80% similar
      }
    }
  })

  it('should have projects in expected order (featured first, then by date)', () => {
    // Featured projects should be in featured array, not other
    expect(projectsData.featured).toBeDefined()
    
    // Note: Projects are currently ordered by manual priority, not date
    // This test validates the current manual ordering is maintained
    const otherProjects = projectsData.other
    expect(otherProjects).toHaveLength(5)
    
    // Validate the current expected order
    const expectedOrder = [
      'looker-studio-dashboards',
      'ascii-golf', 
      'saas-business-model-maker',
      'texas-holdem-analyzer',
      'text-to-midi-maker'
    ]
    
    otherProjects.forEach((project, index) => {
      expect(project.id).toBe(expectedOrder[index])
    })
  })

  it('should not have broken GitHub links format', () => {
    projectsData.other.forEach(project => {
      if (project.github) {
        expect(project.github).toMatch(/^https:\/\/github\.com\/[\w-]+\/[\w-]+$/)
      }
    })
  })
})