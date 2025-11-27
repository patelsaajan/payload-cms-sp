import React from 'react'
import { cn } from '@/utilities/ui'
import type { ButtonBlock as ButtonBlockProps } from '@/payload-types'
import { ExternalLink } from 'lucide-react'

type Props = ButtonBlockProps & {
  className?: string
}

export const ButtonBlock: React.FC<Props> = (props) => {
  const { text, url, variant, linkType, className } = props

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    accent: 'bg-purple-600 hover:bg-purple-700 text-white',
  }

  const isExternal = linkType === 'external'

  return (
    <div className={cn('my-4', className)}>
      <a
        href={url}
        target={isExternal ? '_blank' : '_self'}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={cn(
          'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors',
          variantStyles[variant],
        )}
      >
        {text}
        {isExternal && <ExternalLink className="w-4 h-4" />}
      </a>
    </div>
  )
}
