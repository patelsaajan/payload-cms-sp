import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { populateLinkUrls } from './hooks/populateLinkUrls'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'icon',
          type: 'text',
          required: false,
          admin: {
            description: 'Icon string for this navigation item',
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    beforeChange: [populateLinkUrls],
    afterChange: [revalidateHeader],
  },
}
