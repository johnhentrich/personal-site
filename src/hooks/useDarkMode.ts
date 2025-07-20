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
        
        // Ensure DOM is synced with the state
        const html = document.documentElement
        if (storedValue) {
          html.classList.add('dark')
        } else {
          html.classList.remove('dark')
        }
        
        console.log('Initial dark mode setup:', storedValue, 'DOM classes:', html.className)
      } catch (error) {
        console.warn('Error reading dark mode from localStorage:', error)
        // Default to dark mode on error
        setIsDarkMode(true)
        document.documentElement.classList.add('dark')
      }
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    console.log('Toggle clicked - changing from', isDarkMode, 'to', newMode)
    console.log('Document classes before toggle:', document.documentElement.className)
    
    // Update DOM first
    if (typeof window !== 'undefined') {
      const html = document.documentElement
      
      // Force remove and add classes to ensure clean state
      html.classList.remove('dark')
      
      if (newMode) {
        html.classList.add('dark')
        console.log('Added dark class, classes now:', html.className)
      } else {
        console.log('Removed dark class, classes now:', html.className)
      }
      
      // Update localStorage
      try {
        localStorage.setItem('darkMode', JSON.stringify(newMode))
        console.log('Saved to localStorage:', newMode)
      } catch (error) {
        console.warn('Error saving to localStorage:', error)
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