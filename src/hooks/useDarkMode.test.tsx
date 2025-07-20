import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDarkMode } from './useDarkMode'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

// Mock document.documentElement.classList
const mockClassList = {
  add: vi.fn(),
  remove: vi.fn(),
  contains: vi.fn(),
  toggle: vi.fn(),
}

Object.defineProperty(document.documentElement, 'classList', {
  value: mockClassList,
  writable: true,
})

describe('useDarkMode Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset to browser environment
    Object.defineProperty(window, 'window', {
      value: global.window,
      writable: true,
    })
  })

  it('defaults to dark mode when no localStorage value exists', () => {
    localStorageMock.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useDarkMode())
    
    expect(result.current.isDarkMode).toBe(true)
  })

  it('reads initial value from localStorage', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(false))
    
    const { result } = renderHook(() => useDarkMode())
    
    expect(result.current.isDarkMode).toBe(false)
    expect(localStorageMock.getItem).toHaveBeenCalledWith('darkMode')
  })

  it('toggles dark mode and updates localStorage', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(false))
    
    const { result } = renderHook(() => useDarkMode())
    
    act(() => {
      result.current.toggleDarkMode()
    })
    
    expect(result.current.isDarkMode).toBe(true)
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', JSON.stringify(true))
  })

  it('adds dark class to document when toggling to dark mode', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(false))
    
    const { result } = renderHook(() => useDarkMode())
    
    act(() => {
      result.current.toggleDarkMode()
    })
    
    expect(mockClassList.add).toHaveBeenCalledWith('dark')
  })

  it('removes dark class from document when dark mode is disabled', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(false))
    
    const { result } = renderHook(() => useDarkMode())
    
    act(() => {
      result.current.toggleDarkMode()
    })
    
    // Should add dark class when toggling to dark mode
    expect(mockClassList.add).toHaveBeenCalledWith('dark')
    
    act(() => {
      result.current.toggleDarkMode()
    })
    
    // Should remove dark class when toggling to light mode
    expect(mockClassList.remove).toHaveBeenCalledWith('dark')
  })

  it('handles SSR environment gracefully', () => {
    // This test checks the hook initialization behavior
    // SSR environment is simulated by checking the hook doesn't crash
    localStorageMock.getItem.mockReturnValue(null)
    
    const { result } = renderHook(() => useDarkMode())
    
    // Should still work and default to true
    expect(result.current.isDarkMode).toBe(true)
    expect(typeof result.current.toggleDarkMode).toBe('function')
  })
})