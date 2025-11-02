import React from 'react'
import { cn } from '@/app/lib/utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
}

export function Card({ children, className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-6 shadow-sm',
        'transition-all duration-200',
        hover && 'hover:shadow-md hover:border-gray-300 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

