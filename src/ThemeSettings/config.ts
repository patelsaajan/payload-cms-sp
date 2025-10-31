import type { GlobalConfig } from 'payload'

import { revalidateThemeSettings } from './hooks/revalidateThemeSettings'

export const ThemeSettings: GlobalConfig = {
  slug: 'theme-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'resetDefaults',
      type: 'ui',
      admin: {
        components: {
          Field: '@/ThemeSettings/components/ResetDefaults#ResetDefaults',
        },
      },
    },
    {
      name: 'primaryColor',
      type: 'text',
      required: false,
      admin: {
        description: 'Primary brand color (e.g., #3B82F6 or rgb(59, 130, 246))',
      },
    },
    {
      name: 'secondaryColor',
      type: 'text',
      required: false,
      admin: {
        description: 'Secondary brand color (e.g., #8B5CF6 or rgb(139, 92, 246))',
      },
    },
    {
      name: 'accentColor',
      type: 'text',
      required: false,
      admin: {
        description: 'Accent/CTA color (e.g., #10B981 or rgb(16, 185, 129))',
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      required: false,
      admin: {
        description: 'Background color (e.g., #FFFFFF or rgb(255, 255, 255))',
      },
    },
    {
      name: 'textColor',
      type: 'text',
      required: false,
      admin: {
        description: 'Text color (e.g., #000 or rgb(0, 0, 0))',
      },
    },
    {
      name: 'primaryTextColor',
      type: 'text',
      required: false,
      admin: {
        description: 'Text color (e.g., #000 or rgb(0, 0, 0))',
      },
    },
    {
      name: 'secondaryTextColor',
      type: 'text',
      required: false,
      admin: {
        description: 'Text color (e.g., #000 or rgb(0, 0, 0))',
      },
    },
    {
      name: 'borderRadius',
      type: 'text',
      required: false,
      admin: {
        description: 'Border radius for buttons and UI elements (e.g., 6px, 0.5rem, 12px)',
      },
    },
    {
      name: 'colorPreview',
      type: 'ui',
      admin: {
        components: {
          Field: '@/ThemeSettings/components/ColorPreview#ColorPreview',
        },
      },
    },
    {
      name: 'buttonPreview',
      type: 'ui',
      admin: {
        components: {
          Field: '@/ThemeSettings/components/ButtonPreview#ButtonPreview',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateThemeSettings],
  },
}
