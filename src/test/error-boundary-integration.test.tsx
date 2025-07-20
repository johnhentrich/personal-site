import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RootLayout from '@/app/layout'
import ErrorPage from '@/app/error'

// Mock window methods
Object.defineProperty(window, 'history', {
  value: {
    back: vi.fn(),
  },
  writable: true,
})

// Component that throws an error
function ErrorComponent() {
  throw new Error('Integration test error')
}

// Working component
function WorkingComponent() {
  return <div data-testid="working">Working correctly</div>
}

describe('Error Boundary Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Suppress console.error for these tests
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render children normally when no errors occur', () => {
    render(
      <RootLayout>
        <WorkingComponent />
      </RootLayout>
    )

    expect(screen.getByTestId('working')).toBeInTheDocument()
    expect(screen.getByText('Working correctly')).toBeInTheDocument()
  })

  it('should catch and display error boundary when child component throws', () => {
    render(
      <RootLayout>
        <ErrorComponent />
      </RootLayout>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('We encountered an unexpected error. Please try refreshing the page.')).toBeInTheDocument()
  })

  it('should show error boundary even with theme provider wrapping', () => {
    render(
      <RootLayout>
        <div>
          <ErrorComponent />
        </div>
      </RootLayout>
    )

    // Error boundary should still catch the error despite theme provider wrapper
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should handle nested component errors', () => {
    function NestedErrorComponent() {
      return (
        <div>
          <div>
            <ErrorComponent />
          </div>
        </div>
      )
    }

    render(
      <RootLayout>
        <NestedErrorComponent />
      </RootLayout>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })
})

describe('Error Page Component', () => {
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
})

describe('Error Boundary Accessibility', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should have accessible error UI', () => {
    render(
      <RootLayout>
        <ErrorComponent />
      </RootLayout>
    )

    // Check for proper heading structure
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Something went wrong')

    // Check for actionable buttons
    const refreshButton = screen.getByRole('button', { name: 'Refresh Page' })
    const backButton = screen.getByRole('button', { name: 'Go Back' })
    
    expect(refreshButton).toBeInTheDocument()
    expect(backButton).toBeInTheDocument()
  })

  it('should provide keyboard navigation for error actions', () => {
    render(
      <RootLayout>
        <ErrorComponent />
      </RootLayout>
    )

    const buttons = screen.getAllByRole('button')
    
    // All buttons should be focusable
    buttons.forEach(button => {
      expect(button).toHaveAttribute('type', 'button')
    })
  })
})