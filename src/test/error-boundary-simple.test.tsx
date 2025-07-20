import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorPage from '@/app/error'

// Mock window methods
Object.defineProperty(window, 'history', {
  value: {
    back: vi.fn(),
  },
  writable: true,
})

describe('Next.js Error Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render error page with reset functionality', async () => {
    const mockReset = vi.fn()
    const mockError = new Error('Test error message')
    const user = userEvent.setup()

    render(<ErrorPage error={mockError} reset={mockReset} />)

    expect(screen.getByText('Page Error')).toBeInTheDocument()
    expect(screen.getByText('We encountered an error while loading this page. Please try again.')).toBeInTheDocument()

    const tryAgainButton = screen.getByRole('button', { name: 'Try Again' })
    await user.click(tryAgainButton)

    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it('should handle go back button', async () => {
    const mockReset = vi.fn()
    const mockError = new Error('Test error message')
    const user = userEvent.setup()

    render(<ErrorPage error={mockError} reset={mockReset} />)

    const goBackButton = screen.getByRole('button', { name: 'Go Back' })
    await user.click(goBackButton)

    expect(window.history.back).toHaveBeenCalledTimes(1)
  })

  it('should show error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    const mockReset = vi.fn()
    const mockError = new Error('Development test error')
    mockError.digest = 'test-digest-123'

    render(<ErrorPage error={mockError} reset={mockReset} />)

    expect(screen.getByText('Error Details (Development Only)')).toBeInTheDocument()
    expect(screen.getByText(/Development test error/)).toBeInTheDocument()
    expect(screen.getByText(/test-digest-123/)).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('should hide error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    const mockReset = vi.fn()
    const mockError = new Error('Production test error')

    render(<ErrorPage error={mockError} reset={mockReset} />)

    expect(screen.queryByText('Error Details (Development Only)')).not.toBeInTheDocument()
    expect(screen.queryByText(/Production test error/)).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('should have accessible error UI', () => {
    const mockReset = vi.fn()
    const mockError = new Error('Accessibility test error')

    render(<ErrorPage error={mockError} reset={mockReset} />)

    // Check for proper heading structure
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Page Error')

    // Check for actionable buttons
    const tryAgainButton = screen.getByRole('button', { name: 'Try Again' })
    const backButton = screen.getByRole('button', { name: 'Go Back' })
    
    expect(tryAgainButton).toBeInTheDocument()
    expect(backButton).toBeInTheDocument()
  })
})