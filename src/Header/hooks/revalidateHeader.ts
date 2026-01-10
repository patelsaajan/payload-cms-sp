import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { purgeFrontendCache } from '../../utilities/purgeFrontendCache'

export const revalidateHeader: GlobalAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    revalidateTag('global_header')

    // Purge Nuxt frontend cache (aggressive: all pages and posts since header appears everywhere)
    await purgeFrontendCache({
      keys: ['header'],
      patterns: ['page-*', 'post-*', 'posts-*'],
      payload,
    })
  }

  return doc
}
