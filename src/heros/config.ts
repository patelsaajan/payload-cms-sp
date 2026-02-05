import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'contentOnly',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Content Only',
          value: 'contentOnly',
        },
        {
          label: '50/50 Split (Content + Image)',
          value: 'splitContentImage',
        },
        {
          label: 'Image Only',
          value: 'imageOnly',
        },
        {
          label: 'Banner Image',
          value: 'bannerImage',
        },
      ],
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'select',
      defaultValue: 'background',
      label: 'Hero Background Colour',
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
        {
          label: 'Background',
          value: 'background',
        },
      ],
      admin: {
        condition: (_, { type } = {}) => ['splitContentImage', 'contentOnly'].includes(type),
      },
    },
    {
      name: 'textColor',
      type: 'select',
      defaultValue: 'text',
      label: 'Text Colour',
      options: [
        {
          label: 'Text',
          value: 'text',
        },
        {
          label: 'Primary Text',
          value: 'primaryText',
        },
        {
          label: 'Secondary Text',
          value: 'secondaryText',
        },
      ],
      admin: {
        condition: (_, { type } = {}) => ['splitContentImage', 'contentOnly'].includes(type),
      },
    },
    {
      name: 'colorPreview',
      type: 'ui',
      admin: {
        components: {
          Field: '@/heros/components/ColorPreview#ColorPreview',
        },
        condition: (_, { type } = {}) => ['splitContentImage', 'contentOnly'].includes(type),
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      admin: {
        condition: (_, { type } = {}) => ['splitContentImage', 'contentOnly'].includes(type),
      },
    },
    {
      name: 'text',
      type: 'richText',
      label: 'Text',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      admin: {
        condition: (_, { type } = {}) => ['splitContentImage', 'contentOnly'].includes(type),
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) => ['splitContentImage', 'contentOnly'].includes(type),
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      label: 'Image',
      admin: {
        condition: (_, { type } = {}) =>
          ['splitContentImage', 'imageOnly', 'bannerImage'].includes(type),
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'imagePositionDesktop',
      type: 'select',
      label: 'Image Position (Desktop)',
      defaultValue: 'right',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'splitContentImage',
      },
    },
    {
      name: 'imagePositionMobile',
      type: 'select',
      label: 'Image Position (Mobile)',
      defaultValue: 'top',
      options: [
        {
          label: 'Top',
          value: 'top',
        },
        {
          label: 'Bottom',
          value: 'bottom',
        },
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'splitContentImage',
      },
    },
  ],
  label: false,
}
