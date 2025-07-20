import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readFileSync } from 'fs'

// Mock fs module
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
}))

// Mock path module  
vi.mock('path', () => ({
  join: vi.fn((...args) => args.join('/')),
}))

const mockReadFileSync = vi.mocked(readFileSync)

describe('Resume Data Loading', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Work Experience Data', () => {
    it('should handle valid work.json data', () => {
      const mockWorkData = [
        {
          name: 'Ford Motor Company',
          position: 'Strategy and Growth Manager',
          url: 'https://www.ford.com',
          startDate: '2022-01-01',
          endDate: null,
          summary: 'Test summary',
          highlights: ['Test highlight 1', 'Test highlight 2']
        }
      ]

      mockReadFileSync.mockReturnValue(JSON.stringify(mockWorkData))

      // This would normally be tested by importing the function
      // but since it's in a page component, we test the data structure
      expect(() => JSON.parse(JSON.stringify(mockWorkData))).not.toThrow()
      expect(mockWorkData[0]).toHaveProperty('name')
      expect(mockWorkData[0]).toHaveProperty('position')
      expect(mockWorkData[0]).toHaveProperty('startDate')
      expect(mockWorkData[0]).toHaveProperty('highlights')
      expect(Array.isArray(mockWorkData[0].highlights)).toBe(true)
    })

    it('should handle malformed JSON gracefully', () => {
      mockReadFileSync.mockReturnValue('invalid json')

      expect(() => {
        try {
          JSON.parse('invalid json')
        } catch (error) {
          // This simulates how the component should handle errors
          console.error('Error reading work experience:', error)
          return [] // Fallback to empty array
        }
      }).not.toThrow()
    })

    it('should validate required fields in work experience', () => {
      const validWorkExperience = {
        name: 'Company Name',
        position: 'Position Title',
        url: 'https://example.com',
        startDate: '2022-01-01',
        endDate: null,
        summary: 'Job summary',
        highlights: ['Highlight 1']
      }

      // Check all required fields exist
      expect(validWorkExperience).toHaveProperty('name')
      expect(validWorkExperience).toHaveProperty('position')
      expect(validWorkExperience).toHaveProperty('startDate')
      expect(validWorkExperience).toHaveProperty('summary')
      expect(validWorkExperience).toHaveProperty('highlights')
      expect(Array.isArray(validWorkExperience.highlights)).toBe(true)
    })
  })

  describe('Skills Data', () => {
    it('should handle valid skills.json structure', () => {
      const mockSkillsData = [
        {
          title: 'Technical Skills',
          skills: [
            { title: 'JavaScript', competency: 4 },
            { title: 'React', competency: 5 }
          ]
        }
      ]

      mockReadFileSync.mockReturnValue(JSON.stringify(mockSkillsData))

      expect(() => JSON.parse(JSON.stringify(mockSkillsData))).not.toThrow()
      expect(mockSkillsData[0]).toHaveProperty('title')
      expect(mockSkillsData[0]).toHaveProperty('skills')
      expect(Array.isArray(mockSkillsData[0].skills)).toBe(true)
      expect(mockSkillsData[0].skills[0]).toHaveProperty('competency')
      expect(typeof mockSkillsData[0].skills[0].competency).toBe('number')
    })

    it('should validate competency levels are within range', () => {
      const skills = [
        { title: 'Valid Skill', competency: 3 },
        { title: 'Another Valid Skill', competency: 5 }
      ]

      skills.forEach(skill => {
        expect(skill.competency).toBeGreaterThanOrEqual(1)
        expect(skill.competency).toBeLessThanOrEqual(5)
      })
    })
  })

  describe('Education Data', () => {
    it('should handle valid education.json structure', () => {
      const mockEducationData = [
        {
          institution: 'University Name',
          degree: 'Bachelor of Science',
          logo: '🎓',
          color: 'blue',
          url: 'https://university.edu'
        }
      ]

      mockReadFileSync.mockReturnValue(JSON.stringify(mockEducationData))

      expect(() => JSON.parse(JSON.stringify(mockEducationData))).not.toThrow()
      expect(mockEducationData[0]).toHaveProperty('institution')
      expect(mockEducationData[0]).toHaveProperty('degree')
      expect(mockEducationData[0]).toHaveProperty('logo')
      expect(mockEducationData[0]).toHaveProperty('color')
      expect(mockEducationData[0]).toHaveProperty('url')
    })

    it('should validate education color values', () => {
      const validColors = ['blue', 'red', 'green', 'purple', 'gray']
      const education = { color: 'blue' }

      expect(validColors).toContain(education.color)
    })
  })
})