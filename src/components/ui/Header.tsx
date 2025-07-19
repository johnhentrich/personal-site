'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface NavigationItem {
  href: string
  label: string
  description?: string
}

interface HeaderProps {
  className?: string
}

const navigationItems: NavigationItem[] = [
  { href: '/', label: 'Home', description: 'Welcome page and introduction' },
  { href: '/about', label: 'About', description: 'Professional background' },
  { href: '/projects', label: 'Projects', description: 'Technical portfolio' },
  { href: '/blog', label: 'Blog', description: 'Thoughts and insights' },
  { href: '/resume', label: 'Resume', description: 'Experience and skills' },
  { href: '/other', label: 'Other', description: 'Personal interests' },
  { href: '/contact', label: 'Contact', description: 'Get in touch' },
]

export function Header({ className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header 
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm' 
          : 'bg-white/90 backdrop-blur-sm border-b border-gray-100',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="group flex items-center space-x-2"
            >
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                  <span className="text-white font-bold text-lg sm:text-xl">JH</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-heading font-bold text-gray-900 group-hover:text-primary transition-colors">
                  John Hentrich
                </h1>
                <p className="text-xs lg:text-sm text-gray-600 -mt-1">
                  Growth Strategy Professional
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  'hover:bg-gray-50 hover:text-primary',
                  isActiveRoute(item.href)
                    ? 'text-primary bg-primary/5'
                    : 'text-gray-700'
                )}
              >
                <span className="relative z-10">{item.label}</span>
                {isActiveRoute(item.href) && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary rounded-full"></div>
                )}
                
                {/* Tooltip */}
                {item.description && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.description}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
                  </div>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative w-10 h-10 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 relative">
                <span 
                  className={cn(
                    'absolute h-0.5 w-6 bg-gray-600 transition-all duration-300 ease-in-out',
                    isMenuOpen ? 'top-3 rotate-45' : 'top-2'
                  )}
                />
                <span 
                  className={cn(
                    'absolute top-3 h-0.5 w-6 bg-gray-600 transition-all duration-300 ease-in-out',
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  )}
                />
                <span 
                  className={cn(
                    'absolute h-0.5 w-6 bg-gray-600 transition-all duration-300 ease-in-out',
                    isMenuOpen ? 'top-3 -rotate-45' : 'top-4'
                  )}
                />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          'lg:hidden fixed inset-x-0 top-16 bg-white border-b border-gray-200 transition-all duration-300 ease-in-out',
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        )}
      >
        <nav className="container mx-auto px-4 py-6">
          <div className="grid gap-1">
            {navigationItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center justify-between p-4 rounded-xl transition-all duration-200',
                  'hover:bg-gray-50 hover:translate-x-1',
                  isActiveRoute(item.href)
                    ? 'bg-primary/5 text-primary border border-primary/20'
                    : 'text-gray-700'
                )}
                style={{
                  animationDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                <div className="flex flex-col">
                  <span className="font-medium text-base">{item.label}</span>
                  {item.description && (
                    <span className="text-sm text-gray-500 mt-0.5">
                      {item.description}
                    </span>
                  )}
                </div>
                
                {isActiveRoute(item.href) && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
                
                <svg 
                  className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
          
          {/* Mobile CTA */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              href="/contact"
              className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Get In Touch
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  )
}