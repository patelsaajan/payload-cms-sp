import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'
import { purgeFrontendCache } from '../../../utilities/purgeFrontendCache'

export const revalidatePage: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

      payload.logger.info(`Revalidating page at path: ${path}`)

      revalidatePath(path)
      revalidateTag('pages-sitemap')

      // Purge Nuxt frontend cache
      // Cache key is always page-{slug}, including page-home for homepage
      await purgeFrontendCache({
        keys: [`page-${doc.slug}`],
        payload,
      })
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('pages-sitemap')

      // Purge old page from Nuxt frontend cache
      await purgeFrontendCache({
        keys: [`page-${previousDoc.slug}`],
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
        keys: [`page-${previousDoc.slug}`],
        payload,
      })
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('pages-sitemap')

    // Purge Nuxt frontend cache
    await purgeFrontendCache({
      keys: [`page-${doc.slug}`],
      payload,
    })
  }

  return doc
}
