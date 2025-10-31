'use client'

import { useFormFields } from '@payloadcms/ui'
import { useState } from 'react'

export const ButtonPreview = () => {
    const primaryColor = useFormFields(([fields]) => fields.primaryColor?.value as string)
    const secondaryColor = useFormFields(([fields]) => fields.secondaryColor?.value as string)
    const accentColor = useFormFields(([fields]) => fields.accentColor?.value as string)
    const primaryTextColor = useFormFields(([fields]) => fields.primaryTextColor?.value as string)
    const secondaryTextColor = useFormFields(([fields]) => fields.secondaryTextColor?.value as string)
    const borderRadius = useFormFields(([fields]) => fields.borderRadius?.value as string)

    const [hoveredButton, setHoveredButton] = useState<string | null>(null)

    // Helper function to darken a color
    const darkenColor = (color: string, amount: number = 0.2): string => {
        if (!color) return color

        // Handle hex colors
        if (color.startsWith('#')) {
            const hex = color.replace('#', '')
            const r = parseInt(hex.substring(0, 2), 16)
            const g = parseInt(hex.substring(2, 4), 16)
            const b = parseInt(hex.substring(4, 6), 16)

            return `rgb(${Math.floor(r * (1 - amount))}, ${Math.floor(g * (1 - amount))}, ${Math.floor(b * (1 - amount))})`
        }

        // Handle rgb/rgba colors
        if (color.startsWith('rgb')) {
            const match = color.match(/\d+/g)
            if (match) {
                const [r, g, b, a] = match.map(Number)
                const newR = Math.floor(r * (1 - amount))
                const newG = Math.floor(g * (1 - amount))
                const newB = Math.floor(b * (1 - amount))
                return a !== undefined ? `rgba(${newR}, ${newG}, ${newB}, ${a})` : `rgb(${newR}, ${newG}, ${newB})`
            }
        }

        return color
    }

    return (
        <div style={{
            marginTop: '20px',
            borderTop: '1px solid #e5e5e5',
            paddingTop: '20px',
        }}>
            <h3 style={{ marginBottom: '15px', fontSize: '16px', fontWeight: '600' }}>Button Preview</h3>
            <div style={{
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
            }}>
                {/* Primary Button */}
                <div>
                    <div style={{ fontSize: '12px', marginBottom: '8px', fontWeight: '500' }}>Primary Button</div>
                    <button
                        type="button"
                        onMouseEnter={() => setHoveredButton('primary')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            backgroundColor: hoveredButton === 'primary'
                                ? darkenColor(primaryColor || '#000000')
                                : primaryColor || '#000000',
                            color: primaryTextColor || '#ffffff',
                            border: 'none',
                            borderRadius: borderRadius || '6px',
                            padding: '10px 20px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Click Me
                    </button>
                </div>

                {/* Secondary Button */}
                <div>
                    <div style={{ fontSize: '12px', marginBottom: '8px', fontWeight: '500' }}>Secondary Button</div>
                    <button
                        type="button"
                        onMouseEnter={() => setHoveredButton('secondary')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            backgroundColor: hoveredButton === 'secondary'
                                ? darkenColor(secondaryColor || '#666666')
                                : secondaryColor || '#666666',
                            color: secondaryTextColor || '#ffffff',
                            border: 'none',
                            borderRadius: borderRadius || '6px',
                            padding: '10px 20px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Click Me
                    </button>
                </div>

                {/* Accent/CTA Button */}
                <div>
                    <div style={{ fontSize: '12px', marginBottom: '8px', fontWeight: '500' }}>Accent Button</div>
                    <button
                        type="button"
                        onMouseEnter={() => setHoveredButton('accent')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            backgroundColor: hoveredButton === 'accent'
                                ? darkenColor(accentColor || '#0066cc')
                                : accentColor || '#0066cc',
                            color: primaryTextColor || '#ffffff',
                            border: 'none',
                            borderRadius: borderRadius || '6px',
                            padding: '10px 20px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Call to Action
                    </button>
                </div>

                {/* Outlined Primary Button */}
                <div>
                    <div style={{ fontSize: '12px', marginBottom: '8px', fontWeight: '500' }}>Outlined Primary</div>
                    <button
                        type="button"
                        onMouseEnter={() => setHoveredButton('outlined-primary')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            backgroundColor: hoveredButton === 'outlined-primary'
                                ? `${primaryColor || '#000000'}30`
                                : 'transparent',
                            color: primaryColor || '#000000',
                            border: `2px solid ${primaryColor || '#000000'}`,
                            borderRadius: borderRadius || '6px',
                            padding: '8px 18px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Click Me
                    </button>
                </div>

                {/* Outlined Secondary Button */}
                <div>
                    <div style={{ fontSize: '12px', marginBottom: '8px', fontWeight: '500' }}>Outlined Secondary</div>
                    <button
                        type="button"
                        onMouseEnter={() => setHoveredButton('outlined-secondary')}
                        onMouseLeave={() => setHoveredButton(null)}
                        style={{
                            backgroundColor: hoveredButton === 'outlined-secondary'
                                ? `${secondaryColor || '#666666'}30`
                                : 'transparent',
                            color: secondaryColor || '#666666',
                            border: `2px solid ${secondaryColor || '#666666'}`,
                            borderRadius: borderRadius || '6px',
                            padding: '8px 18px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        Click Me
                    </button>
                </div>
            </div>
        </div>
    )

}