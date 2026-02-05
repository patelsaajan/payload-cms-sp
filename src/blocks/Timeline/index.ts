import type { Block } from 'payload'

export const Timeline: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  labels: {
    singular: 'Timeline',
    plural: 'Timelines',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Timeline Title',
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Colour Variant',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Accent', value: 'accent' },
      ],
    },
    {
      name: 'defaultValue',
      type: 'number',
      label: 'Default Active Item',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Timeline Items',
      minRows: 1,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/Timeline/RowLabel#TimelineRowLabel',
        },
      },
      fields: [
        {
          name: 'date',
          type: 'text',
          required: true,
          admin: {
            description: 'Display date (e.g., "Jan 2024", "2023-2024")',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Optional description for this timeline item',
          },
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Optional icon (emoji or icon string)',
          },
        },
      ],
    },
  ],
}
