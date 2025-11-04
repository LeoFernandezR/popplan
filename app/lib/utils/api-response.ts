import type { ApiError, ApiResponse, HttpStatus } from '@/app/lib/types/api'
import { NextResponse } from 'next/server'

/**
 * Create a successful API response
 */
export function createSuccessResponse<T>(
  data: T,
  status: HttpStatus = 200,
  message?: string
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      data,
      message,
    },
    { status }
  )
}

/**
 * Create an error API response
 */
export function createErrorResponse(
  error: string | ApiError,
  status: HttpStatus = 400
): NextResponse<ApiResponse<never>> {
  const apiError: ApiError =
    typeof error === 'string'
      ? { code: status.toString(), message: error }
      : error

  return NextResponse.json(
    {
      error: apiError,
    },
    { status }
  )
}

/**
 * Create a 404 Not Found response
 */
export function createNotFoundResponse(
  resource: string = 'Resource'
): NextResponse<ApiResponse<never>> {
  return createErrorResponse(
    {
      code: '404',
      message: `${resource} not found`,
    },
    404
  )
}

/**
 * Create a 500 Internal Server Error response
 */
export function createInternalErrorResponse(
  message: string = 'Internal server error'
): NextResponse<ApiResponse<never>> {
  return createErrorResponse(
    {
      code: '500',
      message,
    },
    500
  )
}

