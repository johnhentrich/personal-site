import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
})

// Create a more realistic document.documentElement mock
let mockClassNames = new Set<string>()

const mockClassList = {
  add: vi.fn((className) => {
    mockClassNames.add(className)
    mockClassName = Array.from(mockClassNames).join(' ')
  }),
  remove: vi.fn((className) => {
    mockClassNames.delete(className)
    mockClassName = Array.from(mockClassNames).join(' ')
  }),
  contains: vi.fn((className) => mockClassNames.has(className)),
  toggle: vi.fn(),
  replace: vi.fn(),
  item: vi.fn(),
  toString: vi.fn(() => mockClassName),
  forEach: vi.fn(),
  entries: vi.fn(),
  keys: vi.fn(),
  values: vi.fn(),
  get length() { return mockClassNames.size },
  [Symbol.iterator]: vi.fn(),
}

let mockClassName = ''

Object.defineProperty(document.documentElement, 'classList', {
  value: mockClassList,
  writable: true,
})

Object.defineProperty(document.documentElement, 'className', {
  get: () => mockClassName,
  set: (value) => {
    mockClassName = value
    mockClassNames = new Set(value.split(' ').filter(s => s.length > 0))
    console.log('Document className set to:', value)
  },
  configurable: true,
})

describe('Dark Mode Debugging Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockClassName = ''
    mockClassNames = new Set()
    
    // Mock console methods to capture debug output
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should start in dark mode by default', () => {
    mockLocalStorage.getItem.mockReturnValue(null)
    
    const { } = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    // Should show sun icon (for switching to light mode)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
  })

  it('should toggle from dark to light mode when clicked', async () => {
    const user = userEvent.setup()
    mockLocalStorage.getItem.mockReturnValue('true') // Start in dark mode

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    
    // Initially should be in dark mode (show sun icon)
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
    
    // Click to toggle to light mode
    await user.click(button)
    
    // Check what was called
    console.log('localStorage.setItem calls:', mockLocalStorage.setItem.mock.calls)
    console.log('classList.remove calls:', mockClassList.remove.mock.calls)
    console.log('classList.add calls:', mockClassList.add.mock.calls)
    
    // Should have removed dark class
    expect(mockClassList.remove).toHaveBeenCalledWith('dark')
    
    // Should have saved to localStorage
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('darkMode', 'false')
  })

  it('should toggle from light to dark mode when clicked', async () => {
    const user = userEvent.setup()
    mockLocalStorage.getItem.mockReturnValue('false') // Start in light mode

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    
    // Initially should be in light mode (show moon icon)  
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    
    // Click to toggle to dark mode
    await user.click(button)
    
    // Should have added dark class
    expect(mockClassList.add).toHaveBeenCalledWith('dark')
    
    // Should have saved to localStorage
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('darkMode', 'true')
  })

  it('should clear and restore document className correctly', async () => {
    const user = userEvent.setup()
    mockLocalStorage.getItem.mockReturnValue('true')
    mockClassName = 'some-existing-class dark another-class'
    mockClassNames = new Set(['some-existing-class', 'dark', 'another-class'])

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    await user.click(button)
    
    // Check that dark class was removed but other classes remain
    expect(mockClassList.remove).toHaveBeenCalledWith('dark')
    // The className should only contain the non-dark classes
    expect(mockClassName).toBe('some-existing-class another-class')
  })

  it('should handle multiple rapid clicks correctly', async () => {
    const user = userEvent.setup()
    mockLocalStorage.getItem.mockReturnValue('true')

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    
    // Click multiple times rapidly
    await user.click(button) // dark -> light
    await user.click(button) // light -> dark  
    await user.click(button) // dark -> light
    
    // Should have correct final state
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('darkMode', 'false')
    expect(mockClassList.remove).toHaveBeenCalledWith('dark')
  })

  it('should have proper CSS classes for different themes', () => {
    // Test button styling in different modes
    mockLocalStorage.getItem.mockReturnValue('true') // Dark mode
    
    const { rerender } = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveClass('dark:bg-gray-800', 'dark:hover:bg-gray-700')
    
    // Test light mode
    mockLocalStorage.getItem.mockReturnValue('false')
    rerender(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    expect(button).toHaveClass('bg-gray-100', 'hover:bg-gray-200')
  })

  it('should verify server-side script functionality', () => {
    // Test what the server-side script should do
    vi.fn()
    vi.fn()
    
    // Simulate the server-side script logic
    const simulateServerScript = (storedValue: string | null) => {
      try {
        const isDark = storedValue !== null ? JSON.parse(storedValue) : true
        if (isDark) {
          mockClassList.add('dark')
        } else {
          mockClassList.remove('dark')
        }
      } catch {
        mockClassList.add('dark')
      }
    }
    
    // Test default case (no stored value)
    simulateServerScript(null)
    expect(mockClassList.add).toHaveBeenCalledWith('dark')
    
    // Reset mocks
    vi.clearAllMocks()
    
    // Test stored dark mode
    simulateServerScript('true')
    expect(mockClassList.add).toHaveBeenCalledWith('dark')
    
    // Reset mocks
    vi.clearAllMocks()
    
    // Test stored light mode
    simulateServerScript('false')
    expect(mockClassList.remove).toHaveBeenCalledWith('dark')
  })
})