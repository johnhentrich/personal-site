import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from './ThemeToggle'

// Mock the theme context
const mockToggleDarkMode = vi.fn()

vi.mock('@/contexts/ThemeContext', async () => {
  const actual = await vi.importActual('@/contexts/ThemeContext')
  return {
    ...actual,
    useTheme: () => ({
      isDarkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    }),
  }
})

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders toggle button', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label')
    expect(button).toHaveAttribute('title')
  })

  it('calls toggleDarkMode when clicked', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(mockToggleDarkMode).toHaveBeenCalledOnce()
  })

  it('displays appropriate icon for light mode', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    // In light mode, should show moon icon (switch to dark)
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('has proper styling classes', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('p-2', 'rounded-lg', 'transition-colors')
  })
})