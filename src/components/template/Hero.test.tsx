import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero Component', () => {
  it('renders the main heading with name', () => {
    render(<Hero />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('John Hentrich')
  })

  it('renders the professional title', () => {
    render(<Hero />)
    
    expect(screen.getByText('Business Operations & Growth Strategy Professional')).toBeInTheDocument()
  })

  it('renders the description text', () => {
    render(<Hero />)
    
    expect(screen.getByText(/15 years of experience/)).toBeInTheDocument()
    expect(screen.getByText(/Currently scaling connected services at Ford/)).toBeInTheDocument()
  })

  it('has proper CSS classes for dark mode support', () => {
    render(<Hero />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('dark:text-white')
  })

  it('has semantic HTML structure', () => {
    render(<Hero />)
    
    const section = screen.getByText('John Hentrich').closest('section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('text-center', 'animate-fade-in')
  })
})