'use client'
import { useState, useEffect } from 'react'

const COOLDOWN_MINUTES = 10
const COOLDOWN_MS = COOLDOWN_MINUTES * 60 * 1000
const LOCAL_STORAGE_KEY = 'redeploymentTimestamp'

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const RedeploymentButton = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(0)

  useEffect(() => {
    const checkCooldown = () => {
      const timestamp = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (timestamp) {
        const elapsed = Date.now() - parseInt(timestamp, 10)
        const remaining = COOLDOWN_MS - elapsed
        if (remaining > 0) {
          setRemainingSeconds(Math.ceil(remaining / 1000))
        } else {
          setRemainingSeconds(0)
        }
      }
    }

    checkCooldown()

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const isEnabled = remainingSeconds === 0

  const onClick = () => {
    alert('Redeployment triggered!')
    const timestamp = Date.now().toString()
    localStorage.setItem(LOCAL_STORAGE_KEY, timestamp)
    setRemainingSeconds(COOLDOWN_MINUTES * 60)
  }

  return (
    <>
      <div>{isEnabled ? 'Ready to redeploy' : 'You have already redeployed. Please wait...'}</div>
      {!isEnabled && <div>Time remaining: {formatTime(remainingSeconds)}</div>}
      <button
        type="button"
        disabled={!isEnabled}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        Redeploy
      </button>
    </>
  )
}
