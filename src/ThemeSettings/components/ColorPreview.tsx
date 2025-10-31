'use client'

import { useFormFields } from '@payloadcms/ui'

export const ColorPreview = () => {
  const primaryColor = useFormFields(([fields]) => fields.primaryColor?.value as string)
  const secondaryColor = useFormFields(([fields]) => fields.secondaryColor?.value as string)
  const accentColor = useFormFields(([fields]) => fields.accentColor?.value as string)
  const backgroundColor = useFormFields(([fields]) => fields.backgroundColor?.value as string)
  const textColor = useFormFields(([fields]) => fields.textColor?.value as string)
  const primaryTextColor = useFormFields(([fields]) => fields.primaryTextColor?.value as string)
  const secondaryTextColor = useFormFields(([fields]) => fields.secondaryTextColor?.value as string)

  return (
    <div style={{
      marginTop: '20px',
      borderTop: '1px solid #e5e5e5',
      paddingTop: '20px',
    }}>
      <h3 style={{ marginBottom: '15px', fontSize: '16px', fontWeight: '600' }}>Color Preview</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
      }}>
        <div>
          <div style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }}>Primary</div>
          <div style={{
            width: '100%',
            height: '80px',
            backgroundColor: primaryColor || '#000000',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }} />
          <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
            {primaryColor || 'No color set'}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }}>Secondary</div>
          <div style={{
            width: '100%',
            height: '80px',
            backgroundColor: secondaryColor || '#000000',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }} />
          <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
            {secondaryColor || 'No color set'}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }}>Accent</div>
          <div style={{
            width: '100%',
            height: '80px',
            backgroundColor: accentColor || '#000000',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }} />
          <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
            {accentColor || 'No color set'}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }}>Background</div>
          <div style={{
            width: '100%',
            height: '80px',
            backgroundColor: backgroundColor || '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }} />
          <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
            {backgroundColor || 'No color set'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }}>Text Color</div>
          <div style={{
            width: '100%',
            height: '80px',
            backgroundColor: textColor || '#000',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }} />
          <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
            {textColor || 'No color set'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }}>Primary Text Color</div>
          <div style={{
            width: '100%',
            height: '80px',
            backgroundColor: primaryTextColor || '#000',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }} />
          <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
            {primaryTextColor || 'No color set'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '12px', marginBottom: '5px', fontWeight: '500' }}>Secondary Text Color</div>
          <div style={{
            width: '100%',
            height: '80px',
            backgroundColor: secondaryTextColor || '#000',
            borderRadius: '8px',
            border: '1px solid #e5e5e5',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }} />
          <div style={{ fontSize: '11px', marginTop: '5px', color: '#666' }}>
            {secondaryTextColor || 'No color set'}
          </div>
        </div>
      </div>
    </div>
  )
}
