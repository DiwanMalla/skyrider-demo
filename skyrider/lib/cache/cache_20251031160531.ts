import { unstable_cache } from 'next/cache'

/**
 * Cache helper for Server Components and Route Handlers
 * Uses Next.js built-in caching with revalidation
 */

export interface CacheOptions {
  revalidate?: number // seconds
  tags?: string[]
}

/**
 * Create a cached function for expensive operations
 * @param fn Async function to cache
 * @param keyParts Parts of the cache key
 * @param options Cache options (revalidate in seconds, tags for on-demand revalidation)
 */
export function createCachedFn<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  keyParts: string[],
  options: CacheOptions = {},
) {
  const { revalidate = 60, tags = [] } = options

  return unstable_cache(fn, keyParts, {
    revalidate,
    tags,
  })
}

/**
 * Cache key builder utility
 */
export const cacheKeys = {
  results: (examId: string, classId?: string) => ['results', examId, classId].filter(Boolean),
  exam: (examId: string) => ['exam', examId],
  class: (classId: string) => ['class', classId],
  student: (studentId: string) => ['student', studentId],
}
