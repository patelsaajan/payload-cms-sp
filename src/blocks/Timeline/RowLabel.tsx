'use client'

import { useRowLabel } from '@payloadcms/ui'

export const TimelineRowLabel = () => {
  const { data } = useRowLabel<{ title?: string; date?: string }>()

  const label = data?.title || data?.date || 'Timeline Item'

  return <span>{label}</span>
}
