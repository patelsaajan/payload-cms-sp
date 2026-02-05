'use client'

import { useRowLabel } from '@payloadcms/ui'

export const TestimonialsRowLabel = () => {
  const { data } = useRowLabel<{ title?: string; date?: string }>()

  const label = data?.title || data?.date || 'Testimonial Item'

  return <span>{label}</span>
}
