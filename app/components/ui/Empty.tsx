import React from 'react'
import Link from 'next/link'
import { Button } from './Button'

interface EmptyProps {
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export function Empty({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyProps) {
  const actionButton = actionLabel && (
    actionHref ? (
      <Link href={actionHref}>
        <Button>{actionLabel}</Button>
      </Link>
    ) : onAction ? (
      <Button onClick={onAction}>{actionLabel}</Button>
    ) : null
  )

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-12 text-center">
      <svg
        className="h-16 w-16 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-600 max-w-md">{description}</p>}
      {actionButton}
    </div>
  )
}

