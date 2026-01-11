import type { Payload } from 'payload'

interface PurgeCacheOptions {
  keys?: string[]
  patterns?: string[]
  payload: Payload
}

interface PurgeCacheResponse {
  success: boolean
  purged: string[]
  failed: string[]
  timestamp: string
}

/**
 * Purges cache entries on the Nuxt frontend
 * Calls the Nuxt cache purge API endpoint with authentication
 *
 * @param options - Cache purge options
 * @param options.keys - Exact cache keys to purge (e.g., ['page-home', 'post-my-article'])
 * @param options.patterns - Glob patterns to match cache keys (e.g., ['posts-*', 'page-*'])
 * @param options.payload - Payload instance for logging
 * @returns Promise<boolean> - true if purge was successful, false otherwise
 */
export async function purgeFrontendCache(options: PurgeCacheOptions): Promise<boolean> {
  const { keys, patterns, payload } = options

  // Get configuration from environment variables
  const purgeUrl = process.env.FRONTEND_CACHE_PURGE_URL
  const purgeSecret = process.env.FRONTEND_CACHE_PURGE_SECRET

  // Skip if not configured (e.g., in development or if feature disabled)
  if (!purgeUrl || !purgeSecret) {
    return true // Return true to not block operations
  }

  // Validate input
  if (!keys && !patterns) {
    return false
  }

  try {

    // Create abort controller for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    // Make POST request to Nuxt cache purge endpoint
    const response = await fetch(purgeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Cache-Purge-Secret': purgeSecret,
      },
      body: JSON.stringify({ keys, patterns }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      payload.logger.error(
        `Frontend cache purge failed: ${response.status} ${response.statusText} - ${errorText}`,
      )
      return false
    }

    const result: PurgeCacheResponse = await response.json()

    if (result.purged.length > 0) {
      payload.logger.info(`Cache purged: ${result.purged.join(', ')}`)
    }

    return result.success
  } catch (error) {
    // Log error but don't throw - we don't want cache purge failures to break content operations
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        payload.logger.error('Frontend cache purge timeout after 5 seconds')
      } else {
        payload.logger.error(`Frontend cache purge error: ${error.message}`)
      }
    } else {
      payload.logger.error(`Frontend cache purge error: ${String(error)}`)
    }

    return false
  }
}
