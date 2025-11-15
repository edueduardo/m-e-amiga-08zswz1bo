import { useState, useEffect, useCallback } from 'react'

const COOKIE_NAME = 'user_cookie_consent'
type ConsentValue = 'accepted' | 'declined' | null

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') {
    return null
  }
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

const setCookie = (name: string, value: string, days: number) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax;Secure`
}

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<ConsentValue>(null)

  useEffect(() => {
    setConsent(getCookie(COOKIE_NAME) as ConsentValue)
  }, [])

  const acceptConsent = useCallback(() => {
    setCookie(COOKIE_NAME, 'accepted', 365)
    setConsent('accepted')
    console.log('Cookies accepted. Analytics can be initialized.')
  }, [])

  const declineConsent = useCallback(() => {
    setCookie(COOKIE_NAME, 'declined', 365)
    setConsent('declined')
    console.log('Cookies declined. Non-essential scripts will not run.')
  }, [])

  return {
    consent,
    acceptConsent,
    declineConsent,
  }
}
