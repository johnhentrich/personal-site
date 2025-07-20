import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageLayout } from './PageLayout'

// Mock the Header component
vi.mock('./Header', () => ({
  Header: () => <header data-testid="header">Mocked Header</header>
}))

describe('PageLayout Component', () => {
  it('renders children correctly', () => {
    render(
      <PageLayout>
        <div data-testid="test-content">Test Content</div>
      </PageLayout>
    )

    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('includes header component', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    )

    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('has proper layout structure', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    )

    // Check main container has dark mode gradient
    const container = document.querySelector('.dark\\:from-gray-900')
    expect(container).toBeInTheDocument()

    // Check main element exists
    const mainElement = screen.getByRole('main')
    expect(mainElement).toBeInTheDocument()
    expect(mainElement).toHaveClass('container', 'mx-auto', 'px-4')
  })

  it('supports dark mode styling', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    )

    const container = document.querySelector('.min-h-screen')
    expect(container).toHaveClass(
      'bg-gradient-to-br',
      'from-white',
      'to-gray-50',
      'dark:from-gray-900',
      'dark:to-gray-800'
    )
  })

  it('accepts currentPage prop (even if not used currently)', () => {
    // The currentPage prop exists in the interface for potential future use
    expect(() => {
      render(
        <PageLayout currentPage="about">
          <div>Content</div>
        </PageLayout>
      )
    }).not.toThrow()
  })

  it('has responsive container classes', () => {
    render(
      <PageLayout>
        <div>Content</div>
      </PageLayout>
    )

    const innerContainer = document.querySelector('.max-w-4xl')
    expect(innerContainer).toBeInTheDocument()
    expect(innerContainer).toHaveClass('mx-auto')
  })

  it('maintains proper semantic HTML structure', () => {
    render(
      <PageLayout>
        <section data-testid="content-section">
          <h1>Page Title</h1>
        </section>
      </PageLayout>
    )

    // Should have header and main landmarks
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    
    // Content should be properly nested
    expect(screen.getByTestId('content-section')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})