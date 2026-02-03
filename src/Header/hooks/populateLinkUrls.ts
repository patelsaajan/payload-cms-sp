import type { GlobalBeforeChangeHook } from 'payload'
import { ref } from 'process'

export const populateLinkUrls: GlobalBeforeChangeHook = async ({ data, req }) => {
  if (!data?.navItems?.length) return data

  const updatedNavItems = await Promise.all(
    data.navItems.map(async (item: any) => {
      const link = item?.link

      if (!link) return item

      // If it's an internal reference link, populate the url from the referenced document
      if (link.type === 'reference' && link.reference) {
        const refValue = link.reference || undefined

        if (refValue) {
          const docId = refValue.value || undefined
          const collection = refValue.relationTo || undefined

          if (!docId || !collection) {
            console.warn(`Missing docId or collection for link reference`, {
              docId,
              collection,
              item,
            })
            return item
          }

          try {
            const doc = await req.payload.findByID({
              collection,
              id: docId,
              depth: 0,
              select: {
                slug: true,
              },
            })

            if (doc?.slug) {
              return {
                ...item,
                link: {
                  ...link,
                  url: doc.slug === 'home' ? '/' : `/${doc.slug}`,
                },
              }
            }
          } catch (error) {
            console.error(`Error fetching reference for link:`, error)
          }
        }
      }

      return item
    }),
  )

  return {
    ...data,
    navItems: updatedNavItems,
  }
}
