import { NextResponse } from 'next/server'

export async function POST() {
  const webhookUrl = process.env.REDEPLOYMENT_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook URL not configured' }, { status: 500 })
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Webhook request failed' }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Redeploy webhook error:', error)
    return NextResponse.json({ error: 'Failed to trigger redeployment' }, { status: 500 })
  }
}
