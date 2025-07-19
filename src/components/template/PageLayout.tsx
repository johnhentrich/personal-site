'use client'

import Link from 'next/link'

interface PageLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

export function PageLayout({ children, currentPage }: PageLayoutProps) {
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/resume', label: 'Resume' },
    { href: '/other', label: 'Other' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-heading font-bold text-gray-900 hover:text-primary transition-colors">
              John Hentrich
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium uppercase tracking-wide text-sm transition-colors ${
                    currentPage === item.label.toLowerCase()
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}