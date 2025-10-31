'use client'

import { useForm } from '@payloadcms/ui'

export const ResetDefaults = () => {
  const { dispatchFields, submit } = useForm()

  const defaultValues = {
    primaryColor: '#d20a2e',
    primaryTextColor: '#ffffff',
    secondaryColor: '#009ab0',
    secondaryTextColor: '#000000',
    backgroundColor: '#faf8f1',
    textColor: '#000000',
    accentColor: '#d89b43',
    borderRadius: '6px',
  }

  const handleReset = async () => {
    Object.entries(defaultValues).forEach(([field, value]) => {
      dispatchFields({
        type: 'UPDATE',
        path: field,
        value,
      })
    })

    // Submit the form after updating all fields
    setTimeout(() => {
      submit()
    }, 100)
  }

  return (
    <div style={{
      marginBottom: '20px',
      borderBottom: '1px solid #e5e5e5',
      paddingBottom: '20px',
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div>
        <button
          type="button"
          onClick={handleReset}
          style={{
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '500',
            width: "100%",
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#dc2626'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ef4444'
          }}
        >
          Reset to Default Colors
        </button>
        <div style={{
          marginTop: '10px',
          fontSize: '12px',
          color: '#666',
        }}>
          Click to reset all theme colors to their default values
        </div>
      </div>
    </div>
  )
}
