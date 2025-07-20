import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page'

// Mock the components
vi.mock('@/components/template/Header', () => ({
  Header: () => <header data-testid="header">Header</header>
}))

vi.mock('@/components/template/Hero', () => ({
  Hero: () => <div data-testid="hero">Hero Component</div>
}))

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />)
    
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('hero')).toBeInTheDocument()
  })

  it('renders navigation cards', () => {
    render(<Home />)
    
    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText('Technical Projects')).toBeInTheDocument()
    expect(screen.getByText('Resume')).toBeInTheDocument()
  })

  it('has proper link structure for navigation', () => {
    render(<Home />)
    
    const aboutLink = screen.getByText('About Me').closest('a')
    const projectsLink = screen.getByText('Technical Projects').closest('a')
    const resumeLink = screen.getByText('Resume').closest('a')
    
    expect(aboutLink).toHaveAttribute('href', '/about')
    expect(projectsLink).toHaveAttribute('href', '/projects')
    expect(resumeLink).toHaveAttribute('href', '/resume')
  })

  it('has dark mode support in styling', () => {
    render(<Home />)
    
    // Find the main container div with dark mode classes
    const container = document.querySelector('.dark\\:from-gray-900')
    expect(container).toBeInTheDocument()
  })

  it('renders card descriptions', () => {
    render(<Home />)
    
    expect(screen.getByText(/Professional background and expertise/)).toBeInTheDocument()
    expect(screen.getByText(/Software development, infrastructure, and data science/)).toBeInTheDocument()
    expect(screen.getByText(/Professional experience, education, and technical skills/)).toBeInTheDocument()
  })
})