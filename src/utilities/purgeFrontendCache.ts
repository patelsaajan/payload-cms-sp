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
 * Notifies the Nuxt frontend about content updates
 *
 * NOTE: This does NOT immediately purge Vercel's edge cache.
 * The cache expires naturally based on Cache-Control headers (1 hour).
 * This function provides logging/visibility and maintains the update notification flow.
 *
 * @param options - Cache notification options
 * @param options.keys - Content that was updated (e.g., ['page-home', 'post-my-article'])
 * @param options.patterns - Patterns for bulk updates (e.g., ['posts-*'])
 * @param options.payload - Payload instance for logging
 * @returns Promise<boolean> - true if notification was successful, false otherwise
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
        `Frontend cache notification failed: ${response.status} ${response.statusText} - ${errorText}`,
      )
      return false
    }

    const result: PurgeCacheResponse = await response.json()

    if (result.purged.length > 0) {
      payload.logger.info(`Content update notification sent: ${result.purged.join(', ')} (cache expires naturally in 1 hour)`)
    }

    return result.success
  } catch (error) {
    // Log error but don't throw - we don't want notification failures to break content operations
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        payload.logger.error('Frontend cache notification timeout after 5 seconds')
      } else {
        payload.logger.error(`Frontend cache notification error: ${error.message}`)
      }
    } else {
      payload.logger.error(`Frontend cache notification error: ${String(error)}`)
    }

    return false
  }
}
