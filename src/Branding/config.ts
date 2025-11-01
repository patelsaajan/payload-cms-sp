import type { GlobalConfig } from 'payload'

import { revalidateBranding } from './hooks/revalidateBranding'

export const Branding: GlobalConfig = {
  slug: 'branding-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'socials',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the social platform (e.g., Instagram, Twitter, LinkedIn)',
          },
        },
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: {
            description: 'Iconify icon name (e.g., mdi:instagram, simple-icons:twitter, bi:linkedin)',
            placeholder: 'mdi:instagram',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            description: 'Full URL to your social media profile',
            placeholder: 'https://instagram.com/yourusername',
          },
        },
      ],
      admin: {
        description: 'Add your social media links with custom icons from Iconify',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateBranding],
  },
}
