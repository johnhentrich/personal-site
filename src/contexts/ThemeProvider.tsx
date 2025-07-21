/**
 * Theme Provider - provides theme context to the entire app
 * 
 * This provider manages the global theme state and makes it available
 * to all child components. It handles initialization, persistence,
 * and DOM updates in a centralized way.
 */

'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { type Theme } from '../lib/theme'
import { useTheme as useThemeHook, type UseThemeReturn } from '../hooks/useTheme'

interface ThemeContextValue extends UseThemeReturn {
  /** Whether theme system is ready (for SSR safety) */
  isReady: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export interface ThemeProviderProps {
  children: ReactNode
  /** Default theme for SSR (should match server theme) */
  defaultTheme?: Theme
}

/**
 * Theme Provider Component
 * 
 * Wraps the app and provides theme context to all children.
 * Handles theme initialization and persistence.
 */
export function ThemeProvider({ 
  children 
}: ThemeProviderProps): JSX.Element {
  const themeHook = useThemeHook()
  
  // Context value includes hook values plus ready state
  const contextValue: ThemeContextValue = {
    ...themeHook,
    isReady: true // We're always ready after the provider mounts
  }
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook to consume theme context
 * 
 * This hook provides access to the current theme state and controls.
 * Must be used within a ThemeProvider.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}

/**
 * Higher-order component for theme access
 * 
 * Wraps a component with theme context access.
 */
export function withTheme<P extends object>(
  Component: React.ComponentType<P & { theme: Theme }>
): React.ComponentType<P> {
  const WrappedComponent = (props: P) => {
    const { theme } = useTheme()
    return <Component {...props} theme={theme} />
  }
  
  WrappedComponent.displayName = `withTheme(${Component.displayName || Component.name})`
  return WrappedComponent
}