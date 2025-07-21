/**
 * Core theme utilities - browser-safe theme management
 * 
 * This module provides the fundamental theme operations that work
 * consistently across server and client environments.
 */

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'
export const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)'

/**
 * Safely get stored theme preference
 * Returns null if no preference exists or if localStorage is unavailable
 */
export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') {
    return null // Server-side
  }
  
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch (error) {
    // localStorage access failed - might be disabled or full
    console.warn('Failed to access theme preference:', error)
  }
  
  return null
}

/**
 * Safely store theme preference
 * Fails silently if localStorage is unavailable
 */
export function storeTheme(theme: Theme): void {
  if (typeof window === 'undefined') {
    return // Server-side
  }
  
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch (error) {
    // localStorage write failed - might be disabled or full
    console.warn('Failed to save theme preference:', error)
  }
}

/**
 * Get system theme preference
 * Returns 'light' if matchMedia is unavailable
 */
export function getSystemTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light' // Server-side default
  }
  
  try {
    return window.matchMedia?.(SYSTEM_THEME_QUERY)?.matches ? 'dark' : 'light'
  } catch (error) {
    console.warn('Failed to detect system theme:', error)
    return 'light'
  }
}

/**
 * Determine the effective theme based on stored preference and system preference
 * Priority: stored preference > system preference > 'light'
 */
export function resolveTheme(): Theme {
  const stored = getStoredTheme()
  if (stored) {
    return stored
  }
  
  return getSystemTheme()
}

/**
 * Apply theme to DOM
 * This handles both the class and color-scheme CSS property
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') {
    return // Server-side
  }
  
  const { documentElement } = document
  
  if (theme === 'dark') {
    documentElement.classList.add('dark')
    documentElement.style.colorScheme = 'dark'
  } else {
    documentElement.classList.remove('dark')
    documentElement.style.colorScheme = 'light'
  }
}

/**
 * Get the opposite theme
 */
export function toggleTheme(currentTheme: Theme): Theme {
  return currentTheme === 'light' ? 'dark' : 'light'
}

/**
 * Complete theme change operation
 * 1. Apply to DOM
 * 2. Store preference
 * 3. Return new theme
 */
export function changeTheme(newTheme: Theme): Theme {
  applyTheme(newTheme)
  storeTheme(newTheme)
  return newTheme
}

/**
 * Initialize theme on page load
 * This should be called as early as possible to prevent FOUC
 */
export function initializeTheme(): Theme {
  const theme = resolveTheme()
  applyTheme(theme)
  return theme
}