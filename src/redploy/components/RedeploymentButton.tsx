'use client'
import { useState, useEffect } from 'react'

const COOLDOWN_MINUTES = 0.5
const COOLDOWN_MS = COOLDOWN_MINUTES * 60 * 1000
const LOCAL_STORAGE_KEY = 'redeploymentData'
const REDEPLOY_LIMIT = 3

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor(seconds / 60) - hours * 60
  const secs = seconds % 60
  return hours > 0
    ? `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    : `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const RedeploymentButton = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [deployCount, setDeployCount] = useState(0)

  useEffect(() => {
    const checkCooldown = () => {
      const redeploymentData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (redeploymentData) {
        const { timestamp, deploys } = JSON.parse(redeploymentData)
        const lastDeployDate = new Date(timestamp)
        const todayDate = new Date()

        const isSameDay =
          lastDeployDate.getFullYear() === todayDate.getFullYear() &&
          lastDeployDate.getMonth() === todayDate.getMonth() &&
          lastDeployDate.getDate() === todayDate.getDate()

        if (isSameDay) {
          setDeployCount(deploys || 0)

          // If limit reached, block until midnight
          if (deploys >= REDEPLOY_LIMIT) {
            const remainingSecondsInDay = Math.ceil(
              (new Date().setHours(24, 0, 0, 0) - Date.now()) / 1000,
            )
            setRemainingSeconds(remainingSecondsInDay)
            return
          }

          // Otherwise check cooldown timer
          const elapsed = Date.now() - timestamp
          const remaining = COOLDOWN_MS - elapsed
          if (remaining > 0) {
            setRemainingSeconds(Math.ceil(remaining / 1000))
          } else {
            setRemainingSeconds(0)
          }
        } else {
          // New day - reset count
          setDeployCount(0)
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
    const newCount = deployCount + 1
    const timestamp = Date.now()
    setDeployCount(newCount)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ timestamp, deploys: newCount }))

    // If this deploy hits the limit, block until midnight
    if (newCount >= REDEPLOY_LIMIT) {
      const remainingSecondsInDay = Math.ceil(
        (new Date().setHours(24, 0, 0, 0) - Date.now()) / 1000,
      )
      setRemainingSeconds(remainingSecondsInDay)
    } else {
      setRemainingSeconds(COOLDOWN_MINUTES * 60)
    }
  }

  const limitReached = deployCount >= REDEPLOY_LIMIT

  return (
    <>
      <h4 style={{ marginBottom: '10px' }}>
        You can only redeploy {REDEPLOY_LIMIT} times in a day. And can only redeploy{' '}
        {COOLDOWN_MINUTES} minutes after the last deployment. If you have reached the limit, you
        will have to wait until midnight to redeploy again.
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: 'fit-content' }}>
        <div>
          {isEnabled
            ? 'Ready to redeploy'
            : limitReached
              ? 'Daily limit reached. Please wait until midnight.'
              : 'Please wait for cooldown to finish.'}
        </div>
        {!isEnabled && <div>Time remaining: {formatTime(remainingSeconds)}</div>}
        <div>
          Deploys today: {deployCount} / {REDEPLOY_LIMIT}
        </div>
        <button
          type="button"
          disabled={!isEnabled}
          onClick={onClick}
          style={{ cursor: 'pointer', padding: '8px 16px' }}
        >
          Redeploy
        </button>
      </div>
    </>
  )
}
