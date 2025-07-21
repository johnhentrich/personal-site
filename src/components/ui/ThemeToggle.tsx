/**
 * Theme Toggle Component - User interface for switching themes
 * 
 * Provides a button to toggle between light and dark themes.
 * Includes proper accessibility attributes and visual feedback.
 */

'use client'

import React from 'react'
import { useTheme } from '../../contexts/ThemeProvider'

export interface ThemeToggleProps {
  /** Additional CSS classes */
  className?: string
  /** Show text label alongside icon */
  showLabel?: boolean
  /** Custom button variant */
  variant?: 'default' | 'ghost' | 'outline'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Theme Toggle Button
 * 
 * A button component that toggles between light and dark themes.
 * Provides appropriate ARIA labels and visual feedback.
 */
export function ThemeToggle({ 
  className = '', 
  showLabel = false,
  variant = 'ghost',
  size = 'md'
}: ThemeToggleProps): JSX.Element {
  const { theme, toggle, isDark } = useTheme()
  
  // Size classes
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg'
  }
  
  // Variant classes
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  }
  
  const buttonClasses = [
    // Base classes
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    // Size classes
    sizeClasses[size],
    // Variant classes
    variantClasses[variant],
    // Custom classes
    className
  ].join(' ')
  
  const currentLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode'
  const currentIcon = isDark ? '☀️' : '🌙'
  
  return (
    <button
      type="button"
      onClick={toggle}
      className={buttonClasses}
      aria-label={currentLabel}
      title={currentLabel}
    >
      {/* Icon */}
      <span className="sr-only">{currentLabel}</span>
      <span aria-hidden="true">
        {currentIcon}
      </span>
      
      {/* Optional text label */}
      {showLabel && (
        <span className="ml-2">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  )
}

/**
 * Simple Theme Toggle (minimal version)
 * 
 * A simplified version of the theme toggle with minimal styling.
 * Useful for navigation bars or constrained spaces.
 */
export function SimpleThemeToggle({ className = '' }: { className?: string }): JSX.Element {
  const { toggle, isDark } = useTheme()
  
  const buttonClasses = [
    'p-2 rounded-md transition-colors',
    'hover:bg-gray-100 dark:hover:bg-gray-800',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    className
  ].join(' ')
  
  const currentLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode'
  
  return (
    <button
      type="button"
      onClick={toggle}
      className={buttonClasses}
      aria-label={currentLabel}
      title={currentLabel}
    >
      <span className="text-xl" aria-hidden="true">
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}

/**
 * Theme Toggle with Dropdown
 * 
 * A more advanced theme toggle that shows all available options.
 * Includes system preference option.
 */
export function ThemeToggleDropdown({ className = '' }: { className?: string }): JSX.Element {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const dropdown = document.querySelector('[aria-expanded="true"]')
      if (dropdown && !dropdown.contains(target)) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])
  
  const options = [
    { value: 'light' as const, label: 'Light', icon: '☀️' },
    { value: 'dark' as const, label: 'Dark', icon: '🌙' },
  ]
  
  const currentOption = options.find(opt => opt.value === theme) || options[0]
  
  const dropdownClasses = [
    'relative inline-block text-left',
    className
  ].join(' ')
  
  return (
    <div className={dropdownClasses}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-10 h-10 p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Theme options"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-xl" aria-hidden="true">
          {currentOption.icon}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 origin-top-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-600 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setTheme(option.value)
                  setIsOpen(false)
                }}
                className={`group flex items-center w-full px-4 py-2 text-sm transition-colors ${
                  theme === option.value
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                role="menuitem"
              >
                <span className="mr-3" aria-hidden="true">
                  {option.icon}
                </span>
                {option.label}
                {theme === option.value && (
                  <span className="ml-auto text-blue-500" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

