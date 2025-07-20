'use client'

import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  const handleClick = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('ThemeToggle button clicked!')
      console.log('Current isDarkMode state:', isDarkMode)
    }
    
    // Simply call the toggle function - let the hook handle DOM manipulation
    toggleDarkMode()
  }

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg
        className="w-4 h-4 text-gray-600 dark:text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isDarkMode ? (
          // Sun icon for light mode toggle
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        ) : (
          // Moon icon for dark mode toggle
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        )}
      </svg>
    </button>
  )
}