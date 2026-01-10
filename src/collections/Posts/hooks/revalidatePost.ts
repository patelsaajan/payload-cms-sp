import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'
import { purgeFrontendCache } from '../../../utilities/purgeFrontendCache'

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('posts-sitemap')

      // Purge Nuxt frontend cache
      await purgeFrontendCache({
        keys: [`post-${doc.slug}`],
        patterns: ['posts-*'], // Invalidate all post lists (blog index + pagination)
        payload,
      })
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('posts-sitemap')

      // Purge old post from Nuxt frontend cache
      await purgeFrontendCache({
        keys: [`post-${previousDoc.slug}`],
        patterns: ['posts-*'],
        payload,
      })
    }

    // If slug changed, also purge the old slug
    if (
      previousDoc?.slug &&
      doc.slug !== previousDoc.slug &&
      previousDoc._status === 'published'
    ) {
      payload.logger.info(`Slug changed from ${previousDoc.slug} to ${doc.slug}, purging old slug`)

      await purgeFrontendCache({
        keys: [`post-${previousDoc.slug}`],
        payload,
      })
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('posts-sitemap')

    // Purge Nuxt frontend cache
    await purgeFrontendCache({
      keys: [`post-${doc.slug}`],
      patterns: ['posts-*'],
      payload,
    })
  }

  return doc
}
