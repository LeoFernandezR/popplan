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
        'px-3 py-2 text-sm font-medium transition-colors duration-200',
        isActive
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-600 hover:text-gray-900'
      )}
    >
      {children}
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

