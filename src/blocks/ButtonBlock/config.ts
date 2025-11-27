import type { Block } from 'payload'

export const ButtonBlock: Block = {
  slug: 'buttonBlock',
  interfaceName: 'ButtonBlock',
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      label: 'Button Text',
    },
    {
      name: 'linkType',
      type: 'radio',
      required: true,
      defaultValue: 'internal',
      options: [
        {
          label: 'Internal',
          value: 'internal',
        },
        {
          label: 'External',
          value: 'external',
        },
      ],
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Button URL',
    },
    {
      name: 'variant',
      type: 'select',
      required: true,
      defaultValue: 'primary',
      options: [
        {
          label: 'Primary',
          value: 'primary',
        },
        {
          label: 'Secondary',
          value: 'secondary',
        },
        {
          label: 'Accent',
          value: 'accent',
        },
      ],
    },
  ],
}
