import React from 'react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
}

const sizeStyles = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
}

export function Loading({ size = 'md', text, fullScreen = false }: LoadingProps) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <svg
        className={sizeStyles[size]}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    )
  }

  return <div className="flex items-center justify-center p-8">{spinner}</div>
}

// Skeleton loader for event cards
export function LoadingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          {/* Image skeleton */}
          <div className="mb-4 h-48 w-full rounded-lg bg-gray-200" />
          {/* Title skeleton */}
          <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />
          {/* Subtitle skeleton */}
          <div className="mb-4 h-4 w-1/2 rounded bg-gray-200" />
          {/* Info skeleton */}
          <div className="mb-2 h-4 w-full rounded bg-gray-200" />
          <div className="mb-4 h-4 w-2/3 rounded bg-gray-200" />
          {/* Price skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-6 w-16 rounded bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Skeleton for event detail page
export function EventDetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="animate-pulse">
        <div className="mb-4 h-10 w-3/4 rounded bg-gray-200" />
        <div className="h-96 w-full rounded-lg bg-gray-200" />
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-4 h-6 w-24 rounded bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
          </div>
        </div>
        <div className="animate-pulse rounded-lg border border-gray-200 bg-white p-6">
          <div className="h-8 w-32 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}

