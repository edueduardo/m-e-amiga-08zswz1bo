import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

type UserAgent = 'ios' | 'android' | 'desktop'

const getUserAgent = (): UserAgent => {
  const ua = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(ua)) {
    return 'ios'
  }
  if (/android/.test(ua)) {
    return 'android'
  }
  return 'desktop'
}

export const useInstallPrompt = () => {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [userAgent, setUserAgent] = useState<UserAgent>('desktop')

  useEffect(() => {
    setUserAgent(getUserAgent())

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
    }
  }, [])

  const triggerInstall = () => {
    if (prompt) {
      prompt.prompt()
      prompt.userChoice.then(() => {
        setPrompt(null)
      })
    }
  }

  return { prompt, triggerInstall, userAgent }
}
