'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavigationItem {
  href: string
  label: string
  icon?: React.ReactNode
}

interface NavigationProps {
  items: NavigationItem[]
  className?: string
}

export function Navigation({ items, className }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('flex items-center space-x-6', className)}>
      {items.map((item) => {
        const isActive = pathname === item.href
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200',
              'font-medium text-sm uppercase tracking-wide',
              isActive
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:text-primary hover:bg-gray-100'
            )}
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}