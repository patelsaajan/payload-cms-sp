'use client'

import { useFormFields } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

export const ColorPreview = () => {
  const backgroundColor = useFormFields(([fields]) => {
    return (fields as any)?.['hero.backgroundColor']?.value as string
  })

  const textColor = useFormFields(([fields]) => {
    return (fields as any)?.['hero.textColor']?.value as string
  })

  const [themeColors, setThemeColors] = useState<{
    primaryColor?: string
    secondaryColor?: string
    accentColor?: string
    backgroundColor?: string
    textColor?: string
    primaryTextColor?: string
    secondaryTextColor?: string
  }>({})

  useEffect(() => {
    fetch('/api/globals/theme-settings')
      .then(res => res.json())
      .then(data => {
        setThemeColors({
          primaryColor: data.primaryColor,
          secondaryColor: data.secondaryColor,
          accentColor: data.accentColor,
          backgroundColor: data.backgroundColor,
          textColor: data.textColor,
          primaryTextColor: data.primaryTextColor,
          secondaryTextColor: data.secondaryTextColor,
        })
      })
      .catch(err => console.error('Failed to fetch theme settings:', err))
  }, [])

  const bgColorMap: Record<string, string> = {
    primary: themeColors.primaryColor || '#3B82F6',
    secondary: themeColors.secondaryColor || '#8B5CF6',
    accent: themeColors.accentColor || '#10B981',
    background: themeColors.backgroundColor || '#FFFFFF',
  }

  const textColorMap: Record<string, string> = {
    text: themeColors.textColor || '#000000',
    primaryText: themeColors.primaryTextColor || '#000000',
    secondaryText: themeColors.secondaryTextColor || '#666666',
  }

  const selectedBgColor = bgColorMap[backgroundColor || 'background'] || bgColorMap.background
  const selectedTextColor = textColorMap[textColor || 'text'] || textColorMap.text

  return (
    <div style={{
      marginTop: '8px',
      marginBottom: '12px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
    }}>
      {/* Background Color Preview */}
      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
          Background Color Preview
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: selectedBgColor,
              borderRadius: '6px',
              border: '2px solid #fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.1)',
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: '11px', fontWeight: '600', marginBottom: '2px' }}>
              {backgroundColor || 'background'}
            </div>
            <div style={{ fontSize: '12px', fontWeight: '500', fontFamily: 'monospace' }}>
              {selectedBgColor}
            </div>
          </div>
        </div>
      </div>

      {/* Text Color Preview */}
      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>
          Text Color Preview
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: selectedTextColor,
              borderRadius: '6px',
              border: '2px solid #fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.1)',
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: '11px', fontWeight: '600', marginBottom: '2px' }}>
              {textColor || 'text'}
            </div>
            <div style={{ fontSize: '12px', fontWeight: '500', fontFamily: 'monospace' }}>
              {selectedTextColor}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
