import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { purgeFrontendCache } from '../../utilities/purgeFrontendCache'

export const revalidateBranding: GlobalAfterChangeHook = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating branding settings`)

    revalidateTag('global_branding')

    // Purge Nuxt frontend cache (aggressive: all pages and posts since branding appears everywhere)
    await purgeFrontendCache({
      keys: ['branding'],
      patterns: ['page-*', 'post-*', 'posts-*'],
      payload,
    })
  }

  return doc
}
