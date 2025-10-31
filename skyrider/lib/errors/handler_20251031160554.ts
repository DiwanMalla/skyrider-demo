import { AppError } from './AppError'
import { logger } from '@/lib/logger/logger'

export interface ErrorResponse {
  success: false
  error: {
    message: string
    code: string
    statusCode: number
    details?: Record<string, unknown>
  }
}

/**
 * Centralized error handler for API routes and server actions
 */
export function handleError(error: unknown): ErrorResponse {
  // Log the error
  if (error instanceof AppError) {
    logger.warn(`${error.name}: ${error.message}`, { code: error.code, details: error.details })
    return {
      success: false,
      error: {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        details: process.env.NODE_ENV === 'development' ? error.details : undefined,
      },
    }
  }

  if (error instanceof Error) {
    logger.error(`Unexpected error: ${error.message}`, { stack: error.stack })
    return {
      success: false,
      error: {
        message:
          process.env.NODE_ENV === 'development'
            ? error.message
            : 'An unexpected error occurred',
        code: 'INTERNAL_ERROR',
        statusCode: 500,
      },
    }
  }

  // Unknown error type
  logger.error('Unknown error type', { error })
  return {
    success: false,
    error: {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      statusCode: 500,
    },
  }
}
