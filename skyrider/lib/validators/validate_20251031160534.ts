import { z, ZodSchema } from 'zod'
import { ValidationError } from '@/lib/errors/AppError'

/**
 * Generic validation helper
 */
export function validate<T>(schema: ZodSchema, data: unknown): T {
  try {
    return schema.parse(data) as T
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }))

      throw new ValidationError('Validation failed', { issues })
    }
    throw error
  }
}

/**
 * Safe validation that returns result or null
 */
export function safeValidate<T>(
  schema: ZodSchema,
  data: unknown,
): { data: T; error: null } | { data: null; error: ValidationError } {
  try {
    return { data: schema.parse(data) as T, error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }))

      return {
        data: null,
        error: new ValidationError('Validation failed', { issues }),
      }
    }

    return {
      data: null,
      error: new ValidationError('Unexpected validation error'),
    }
  }
}
