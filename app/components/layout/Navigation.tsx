'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/app/lib/utils/cn'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'relative px-3 py-2 text-sm font-medium transition-colors duration-200',
        isActive
          ? 'text-blue-600'
          : 'text-gray-600 hover:text-gray-900'
      )}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
      )}
    </Link>
  )
}

export function Navigation() {
  return (
    <nav className="flex items-center gap-6">
      <NavLink href="/events">Events</NavLink>
      <NavLink href="/dashboard">Dashboard</NavLink>
    </nav>
  )
}

