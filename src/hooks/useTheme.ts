/**
 * Theme hook - provides theme state and toggle functionality
 * 
 * This hook manages theme state using React state and provides
 * methods for changing the theme. It coordinates with the
 * ThemeProvider to ensure consistent state across the app.
 */

import { useState, useCallback, useEffect } from 'react'
import { type Theme, resolveTheme, changeTheme, toggleTheme, applyTheme } from '../lib/theme'

export interface UseThemeReturn {
  /** Current theme */
  theme: Theme
  /** Toggle between light and dark */
  toggle: () => void
  /** Set specific theme */
  setTheme: (theme: Theme) => void
  /** Whether we're in dark mode */
  isDark: boolean
}

/**
 * Theme hook for consuming theme state and controls
 * 
 * This hook provides the current theme and methods to change it.
 * It should be used within a ThemeProvider.
 */
export function useTheme(): UseThemeReturn {
  // Initialize with resolved theme (handles SSR safely)
  const [theme, setThemeState] = useState<Theme>(() => {
    // On server, always start with light to prevent hydration mismatch
    if (typeof window === 'undefined') {
      return 'light'
    }
    
    // On client, use resolved theme
    return resolveTheme()
  })
  
  // Sync with DOM on mount and theme changes
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') {
      return
    }
    
    // Apply current theme to DOM
    applyTheme(theme)
  }, [theme])
  
  // Handle client-side hydration
  useEffect(() => {
    // Only run once on mount, only on client
    if (typeof window === 'undefined') {
      return
    }
    
    // Resolve the actual theme and update state if needed
    const actualTheme = resolveTheme()
    if (actualTheme !== theme) {
      setThemeState(actualTheme)
    }
  }, [theme]) // Include theme in dependency array
  
  const toggle = useCallback(() => {
    const newTheme = toggleTheme(theme)
    const finalTheme = changeTheme(newTheme)
    setThemeState(finalTheme)
  }, [theme])
  
  const setTheme = useCallback((newTheme: Theme) => {
    const finalTheme = changeTheme(newTheme)
    setThemeState(finalTheme)
  }, [])
  
  return {
    theme,
    toggle,
    setTheme,
    isDark: theme === 'dark'
  }
}