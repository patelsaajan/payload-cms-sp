import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateThemeSettings: GlobalAfterChangeHook = async ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('global_theme-settings')
  }

  return doc
}
