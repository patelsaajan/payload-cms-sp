import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 15,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/blocks/Testimonials/RowLabel#TestimonialsRowLabel',
        },
      },
      fields: [
        {
          name: 'by',
          type: 'text',
        },
        {
          name: 'date',
          type: 'date',
        },
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
