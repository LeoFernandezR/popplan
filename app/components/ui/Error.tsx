import React from 'react'
import { Button } from './Button'

interface ErrorProps {
  message: string
  onRetry?: () => void
  retryLabel?: string
}

export function Error({ message, onRetry, retryLabel = 'Try Again' }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-8 text-center">
      <div className="flex flex-col items-center gap-2">
        <svg
          className="h-12 w-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg font-semibold text-red-800">Something went wrong</p>
        <p className="text-sm text-red-600">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} size="sm">
          {retryLabel}
        </Button>
      )}
    </div>
  )
}

