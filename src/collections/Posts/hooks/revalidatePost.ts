import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'
import { purgeFrontendCache } from '../../../utilities/purgeFrontendCache'

export const revalidatePost: CollectionAfterChangeHook<Post> = async ({
  doc,
  previousDoc,
  req,
}) => {
  const { payload, context } = req

  // Skip autosaves and drafts to avoid unnecessary cache purges
  const isAutosave = req.query?.autosave === 'true' || req.query?.draft === 'true'
  const isDraft = doc._status === 'draft'

  if (isAutosave || isDraft) {
    return doc
  }

  if (!context.disableRevalidate) {
    // Only purge cache on actual publish actions
    const isNewlyPublished = previousDoc?._status !== 'published' && doc._status === 'published'
    const wasAlreadyPublished = previousDoc?._status === 'published' && doc._status === 'published'

    // Check if content actually changed
    const contentChanged = previousDoc && (
      previousDoc.title !== doc.title ||
      previousDoc.slug !== doc.slug ||
      JSON.stringify(previousDoc.content) !== JSON.stringify(doc.content)
    )

    if (doc._status === 'published' && (isNewlyPublished || (wasAlreadyPublished && contentChanged))) {
      const path = `/posts/${doc.slug}`

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
