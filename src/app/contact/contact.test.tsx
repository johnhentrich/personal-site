import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ContactPage from './page'

// Mock PageLayout
vi.mock('@/components/template/PageLayout', () => ({
  PageLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-layout">{children}</div>
  )
}))

describe('Contact Page', () => {
  it('renders page title and description', () => {
    render(<ContactPage />)
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
    expect(screen.getByText(/always interested in discussing business opportunities/)).toBeInTheDocument()
  })

  it('displays all contact methods', () => {
    render(<ContactPage />)
    
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Personal Website')).toBeInTheDocument()
  })

  it('has correct email contact information', () => {
    render(<ContactPage />)
    
    const emailLink = screen.getByText('hello@johnhentrich.com →')
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:hello@johnhentrich.com')
  })

  it('has correct LinkedIn profile link', () => {
    render(<ContactPage />)
    
    const linkedinLink = screen.getByText('linkedin.com/in/johnhentrich →')
    expect(linkedinLink.closest('a')).toHaveAttribute('href', 'https://www.linkedin.com/in/johnhentrich')
    expect(linkedinLink.closest('a')).toHaveAttribute('target', '_blank')
    expect(linkedinLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has correct GitHub profile link', () => {
    render(<ContactPage />)
    
    const githubLink = screen.getByText('github.com/johnhentrich →')
    expect(githubLink.closest('a')).toHaveAttribute('href', 'https://github.com/johnhentrich')
    expect(githubLink.closest('a')).toHaveAttribute('target', '_blank')
  })

  it('displays areas of interest section', () => {
    render(<ContactPage />)
    
    expect(screen.getByText('Areas of Interest')).toBeInTheDocument()
    expect(screen.getByText('Growth Strategy')).toBeInTheDocument()
    expect(screen.getByText('Digital Transformation')).toBeInTheDocument()
    expect(screen.getByText('Data & Analytics')).toBeInTheDocument()
  })

  it('has proper dark mode styling', () => {
    render(<ContactPage />)
    
    // Check main container has dark mode classes
    const container = document.querySelector('.dark\\:bg-gray-800')
    expect(container).toBeInTheDocument()
    
    // Check contact method cards have dark mode
    const contactCards = document.querySelectorAll('.dark\\:bg-gray-700')
    expect(contactCards.length).toBeGreaterThan(0)
  })

  it('displays professional focus areas with proper styling', () => {
    render(<ContactPage />)
    
    const focusAreas = [
      'Scaling digital products and services through data-driven insights',
      'Modernizing business processes and technology infrastructure',
      'Leveraging data to drive business decisions and product improvements'
    ]
    
    focusAreas.forEach(area => {
      expect(screen.getByText(area)).toBeInTheDocument()
    })
  })

  it('has proper semantic HTML structure', () => {
    render(<ContactPage />)
    
    // Should have proper heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 })
    const h2s = screen.getAllByRole('heading', { level: 2 })
    const h3s = screen.getAllByRole('heading', { level: 3 })
    
    expect(h1).toHaveTextContent('Get In Touch')
    expect(h2s.length).toBeGreaterThan(0)
    expect(h3s.length).toBeGreaterThan(0)
  })

  it('uses appropriate icons for each contact method', () => {
    render(<ContactPage />)
    
    // Check that SVG icons are present
    const svgIcons = document.querySelectorAll('svg')
    expect(svgIcons.length).toBeGreaterThan(4) // At least one for each contact method + focus areas
  })

  it('has hover effects on interactive elements', () => {
    render(<ContactPage />)
    
    // Check contact method cards have hover classes
    const hoverElements = document.querySelectorAll('.hover\\:bg-gray-100')
    expect(hoverElements.length).toBeGreaterThan(0)
  })

  it('displays correct website URL', () => {
    render(<ContactPage />)
    
    const websiteLink = screen.getByText('johnhentrich.com →')
    expect(websiteLink.closest('a')).toHaveAttribute('href', 'https://johnhentrich.com')
  })

  it('has proper external link attributes', () => {
    render(<ContactPage />)
    
    // All external links should open in new tab
    const externalLinks = [
      screen.getByText('linkedin.com/in/johnhentrich →').closest('a'),
      screen.getByText('github.com/johnhentrich →').closest('a'),
      screen.getByText('johnhentrich.com →').closest('a')
    ]
    
    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('email link does not open in new tab', () => {
    render(<ContactPage />)
    
    const emailLink = screen.getByText('hello@johnhentrich.com →').closest('a')
    expect(emailLink).not.toHaveAttribute('target')
    expect(emailLink).not.toHaveAttribute('rel')
  })
})