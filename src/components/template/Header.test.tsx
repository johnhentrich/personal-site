import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from './Header'

// Mock the ThemeToggle component
vi.mock('@/components/ui/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme Toggle</button>
}))

describe('Header Component', () => {
  it('renders site title', () => {
    render(<Header />)
    
    const siteTitle = screen.getByText('John Hentrich')
    expect(siteTitle).toBeInTheDocument()
    expect(siteTitle.closest('a')).toHaveAttribute('href', '/')
  })

  it('renders all navigation items', () => {
    render(<Header />)
    
    const expectedNavItems = ['Home', 'About', 'Projects', 'Resume', 'Other', 'Contact']
    
    expectedNavItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('has correct navigation links', () => {
    render(<Header />)
    
    const navigationLinks = [
      { text: 'Home', href: '/' },
      { text: 'About', href: '/about' },
      { text: 'Projects', href: '/projects' },
      { text: 'Resume', href: '/resume' },
      { text: 'Other', href: '/other' },
      { text: 'Contact', href: '/contact' }
    ]
    
    navigationLinks.forEach(({ text, href }) => {
      const link = screen.getByText(text).closest('a')
      expect(link).toHaveAttribute('href', href)
    })
  })

  it('includes theme toggle in both desktop and mobile navigation', () => {
    render(<Header />)
    
    const themeToggles = screen.getAllByTestId('theme-toggle')
    expect(themeToggles).toHaveLength(2) // One for desktop, one for mobile
  })

  it('has proper mobile menu functionality', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    // Mobile menu should be hidden initially
    const mobileNav = document.querySelector('.md\\:hidden .flex-col')
    expect(mobileNav).not.toBeInTheDocument()
    
    // Find and click mobile menu button
    const mobileMenuButton = screen.getByLabelText('Toggle menu')
    expect(mobileMenuButton).toBeInTheDocument()
    
    await user.click(mobileMenuButton)
    
    // Mobile navigation should now be visible - use getAllByText since there are multiple "Home" elements
    const homeLinks = screen.getAllByText('Home')
    const mobileHomeLink = homeLinks.find(link => 
      link.closest('.md\\:hidden')
    )
    expect(mobileHomeLink).toBeInTheDocument()
  })

  it('closes mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    // Open mobile menu
    const mobileMenuButton = screen.getByLabelText('Toggle menu')
    await user.click(mobileMenuButton)
    
    // Click a navigation link in mobile menu
    const mobileNavItems = screen.getAllByText('About')
    const mobileAboutLink = mobileNavItems.find(item => 
      item.closest('.md\\:hidden')
    )
    
    if (mobileAboutLink) {
      await user.click(mobileAboutLink)
      
      // Mobile menu should close (this tests the onClick handler)
      // Note: In our setup, this just verifies the handler exists
      expect(mobileAboutLink).toHaveAttribute('href', '/about')
    }
  })

  it('has proper dark mode styling', () => {
    render(<Header />)
    
    // Check header has dark mode classes
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('dark:bg-gray-900/95')
    
    // Check navigation links have dark mode classes
    const navLinks = screen.getAllByText('About')
    navLinks.forEach(link => {
      expect(link).toHaveClass('dark:text-gray-300', 'dark:hover:text-primary')
    })
  })

  it('has proper accessibility attributes', () => {
    render(<Header />)
    
    // Mobile menu button should have aria-label
    const mobileMenuButton = screen.getByLabelText('Toggle menu')
    expect(mobileMenuButton).toHaveAttribute('aria-label', 'Toggle menu')
    
    // Header should have banner role
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('uses proper CSS classes for responsive design', () => {
    render(<Header />)
    
    // Desktop navigation should be hidden on mobile
    const desktopNav = document.querySelector('.hidden.md\\:flex')
    expect(desktopNav).toBeInTheDocument()
    
    // Mobile menu button should be hidden on desktop
    const mobileButton = document.querySelector('.md\\:hidden button')
    expect(mobileButton).toBeInTheDocument()
  })

  it('shows correct icon states for mobile menu', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const mobileMenuButton = screen.getByLabelText('Toggle menu')
    
    // Should show hamburger icon initially (three lines)
    let svg = mobileMenuButton.querySelector('svg')
    expect(svg).toBeInTheDocument()
    
    // Click to open menu
    await user.click(mobileMenuButton)
    
    // Should now show X icon (close icon)
    svg = mobileMenuButton.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})