'use client'

import { useLayoutEffect } from 'react'

/**
 * Secure client-side dark mode initializer
 * Replaces the dangerouslySetInnerHTML script with a safe implementation
 * This runs before React hydration to prevent flash of wrong theme
 */
export function DarkModeInitializer() {
  useLayoutEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Mark that we've initialized the theme to avoid conflicts
    if ((window as Window & { __themeInitialized?: boolean }).__themeInitialized) return
    ;(window as Window & { __themeInitialized?: boolean }).__themeInitialized = true

    try {
      const stored = localStorage.getItem('darkMode')
      const isDark = stored !== null ? JSON.parse(stored) : true
      
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } catch {
      // Default to dark mode if parsing fails
      document.documentElement.classList.add('dark')
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to parse dark mode preference, defaulting to dark mode')
      }
    }
  }, [])

  // This component doesn't render anything, it just handles the initialization
  return null
}