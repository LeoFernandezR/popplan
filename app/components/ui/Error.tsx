import React from 'react'
import { Button } from './Button'

interface ErrorProps {
  message: string
  onRetry?: () => void
  retryLabel?: string
}

export function Error({ message, onRetry, retryLabel = 'Try Again' }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 p-8 text-center shadow-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-full bg-red-100 p-3">
          <svg
            className="h-10 w-10 text-red-600"
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
        </div>
        <p className="text-lg font-semibold text-red-900">Something went wrong</p>
        <p className="text-sm text-red-700 max-w-md">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} size="sm" className="mt-2">
          {retryLabel}
        </Button>
      )}
    </div>
  )
}

