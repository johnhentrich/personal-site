'use client'

import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

  useEffect(() => {
    // Read from localStorage on mount and sync with DOM
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('darkMode')
        const storedValue = stored !== null ? JSON.parse(stored) : true // Default to dark mode
        
        setIsDarkMode(storedValue)
        
        // Only sync DOM if initializer hasn't already done it
        if (!(window as Window & { __themeInitialized?: boolean }).__themeInitialized) {
          const html = document.documentElement
          if (storedValue) {
            html.classList.add('dark')
          } else {
            html.classList.remove('dark')
          }
        }
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Initial dark mode setup:', storedValue, 'DOM classes:', document.documentElement.className)
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Error reading dark mode from localStorage:', error)
        }
        // Default to dark mode on error
        setIsDarkMode(true)
        if (!(window as Window & { __themeInitialized?: boolean }).__themeInitialized) {
          document.documentElement.classList.add('dark')
        }
      }
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Toggle clicked - changing from', isDarkMode, 'to', newMode)
      console.log('Document classes before toggle:', document.documentElement.className)
    }
    
    // Update DOM first
    if (typeof window !== 'undefined') {
      const html = document.documentElement
      
      // Force remove and add classes to ensure clean state
      html.classList.remove('dark')
      
      if (newMode) {
        html.classList.add('dark')
        if (process.env.NODE_ENV === 'development') {
          console.log('Added dark class, classes now:', html.className)
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log('Removed dark class, classes now:', html.className)
        }
      }
      
      // Update localStorage
      try {
        localStorage.setItem('darkMode', JSON.stringify(newMode))
        if (process.env.NODE_ENV === 'development') {
          console.log('Saved to localStorage:', newMode)
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Error saving to localStorage:', error)
        }
      }
    }
    
    // Update state last
    setIsDarkMode(newMode)
  }

  return {
    isDarkMode,
    toggleDarkMode
  }
}