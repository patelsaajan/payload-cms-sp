import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateBranding: GlobalAfterChangeHook = async ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidateTag('global_branding')
  }

  return doc
}
