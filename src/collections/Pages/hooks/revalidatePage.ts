import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req,
}) => {
  const { context } = req

  // Skip if this is an autosave operation or draft
  const isAutosave = req.query?.autosave === 'true' || req.query?.draft === 'true'
  const isDraft = doc._status === 'draft'

  if (isAutosave || isDraft) {
    return doc
  }

  if (!context.disableRevalidate) {
    // Only purge cache on actual publish actions, not autosaves
    const isNewlyPublished = previousDoc?._status !== 'published' && doc._status === 'published'
    const wasAlreadyPublished = previousDoc?._status === 'published' && doc._status === 'published'

    // Check if content actually changed (not just autosave)
    const contentChanged = previousDoc && (
      previousDoc.title !== doc.title ||
      previousDoc.slug !== doc.slug ||
      JSON.stringify(previousDoc.layout) !== JSON.stringify(doc.layout)
    )

    if (doc._status === 'published' && (isNewlyPublished || (wasAlreadyPublished && contentChanged))) {
      const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

      revalidatePath(path)
      revalidateTag('pages-sitemap')
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

      revalidatePath(oldPath)
      revalidateTag('pages-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('pages-sitemap')
  }

  return doc
}
