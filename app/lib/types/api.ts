// Generic API response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// HTTP Status codes commonly used
export type HttpStatus = 200 | 201 | 400 | 401 | 403 | 404 | 500;
