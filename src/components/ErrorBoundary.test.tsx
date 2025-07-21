import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ErrorBoundary, withErrorBoundary, useErrorHandler } from './ErrorBoundary'

// Mock window.location.reload and window.history.back
Object.defineProperty(window, 'location', {
  value: {
    reload: vi.fn(),
  },
  writable: true,
})

Object.defineProperty(window, 'history', {
  value: {
    back: vi.fn(),
  },
  writable: true,
})

// Component that throws an error
function ThrowError({ shouldThrow = false }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error message')
  }
  return <div>No error</div>
}


describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Suppress console.error for these tests
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child component</div>
      </ErrorBoundary>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Child component')).toBeInTheDocument()
  })

  it('should render default error UI when child component throws error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('We encountered an unexpected error. Please try refreshing the page.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Refresh Page' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument()
  })

  it('should render custom fallback UI when provided', () => {
    const customFallback = <div data-testid="custom-fallback">Custom error message</div>

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })

  it('should call onError callback when error occurs', () => {
    const onError = vi.fn()

    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String)
      })
    )
  })

  it('should show error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Error Details (Development Only)')).toBeInTheDocument()
    expect(screen.getByText(/Test error message/)).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('should hide error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.queryByText('Error Details (Development Only)')).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('should handle refresh button click', async () => {
    const user = userEvent.setup()

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const refreshButton = screen.getByRole('button', { name: 'Refresh Page' })
    await user.click(refreshButton)

    expect(window.location.reload).toHaveBeenCalledTimes(1)
  })

  it('should handle go back button click', async () => {
    const user = userEvent.setup()

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const goBackButton = screen.getByRole('button', { name: 'Go Back' })
    await user.click(goBackButton)

    expect(window.history.back).toHaveBeenCalledTimes(1)
  })

  it('should not interfere with normal component updates', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()

    rerender(
      <ErrorBoundary>
        <div>Updated content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Updated content')).toBeInTheDocument()
  })

  it('should catch errors from nested components', () => {
    function NestedComponent() {
      return (
        <div>
          <ThrowError shouldThrow={true} />
        </div>
      )
    }

    render(
      <ErrorBoundary>
        <div>
          <NestedComponent />
        </div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })
})

describe('withErrorBoundary HOC', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should wrap component with error boundary', () => {
    const WrappedComponent = withErrorBoundary(ThrowError)

    render(<WrappedComponent shouldThrow={false} />)

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('should catch errors in wrapped component', () => {
    const WrappedComponent = withErrorBoundary(ThrowError)

    render(<WrappedComponent shouldThrow={true} />)

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('should use custom fallback and error handler', () => {
    const onError = vi.fn()
    const customFallback = <div>HOC Custom Error</div>
    const WrappedComponent = withErrorBoundary(ThrowError, customFallback, onError)

    render(<WrappedComponent shouldThrow={true} />)

    expect(screen.getByText('HOC Custom Error')).toBeInTheDocument()
    expect(onError).toHaveBeenCalledTimes(1)
  })
})

describe('useErrorHandler', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should provide error handler function', () => {
    function TestComponent() {
      const handleError = useErrorHandler()
      return <div data-testid="test">Handler: {typeof handleError}</div>
    }

    render(<TestComponent />)

    expect(screen.getByTestId('test')).toHaveTextContent('Handler: function')
  })

  it('should throw error when called', () => {
    function TestComponent() {
      const handleError = useErrorHandler()
      
      // Test that calling handleError throws an error
      expect(() => {
        handleError(new Error('Test error'))
      }).toThrow('Test error')

      return <div>Test</div>
    }

    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    )
  })
})