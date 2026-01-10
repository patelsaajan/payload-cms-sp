import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { purgeFrontendCache } from '../../utilities/purgeFrontendCache'

export const revalidateThemeSettings: GlobalAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating theme settings`)

    revalidateTag('global_theme-settings')

    // Purge Nuxt frontend cache (aggressive: all pages and posts since theme appears everywhere)
    await purgeFrontendCache({
      keys: ['theme-settings'],
      patterns: ['page-*', 'post-*', 'posts-*'],
      payload,
    })
  }

  return doc
}
