import { createContext, useState, ReactNode, useMemo, useCallback } from 'react'
import { UserProfile } from '@/types'
import { getOrAssignABTestGroup, ABTestGroup } from '@/lib/abTesting'

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  isSubscribed: boolean
  abTestGroup: ABTestGroup | null
  login: (user: UserProfile, isSubscribed: boolean) => void
  logout: () => void
  updateUser: (data: Partial<UserProfile>) => void
  subscribe: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data
const mockUser: UserProfile = {
  id: '123',
  full_name: 'Maria',
  email: 'maria@example.com',
  is_email_verified: true,
  is_phone_verified: false,
  phone_number: '11999998888',
  is_two_factor_enabled: false,
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [abTestGroup, setAbTestGroup] = useState<ABTestGroup | null>(null)

  const login = useCallback((userData: UserProfile, subscribed: boolean) => {
    setUser(userData)
    setIsSubscribed(subscribed)
    setAbTestGroup(getOrAssignABTestGroup())
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsSubscribed(false)
    setAbTestGroup(null)
  }, [])

  const updateUser = useCallback((data: Partial<UserProfile>) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, ...data } : null))
  }, [])

  const subscribe = useCallback(() => {
    if (user) {
      setIsSubscribed(true)
    }
  }, [user])

  // For development: auto-login with a mock user
  useMemo(() => {
    // login(mockUser, true); // auto-login with active subscription
    // login(mockUser, false); // auto-login with inactive subscription
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isSubscribed,
      abTestGroup,
      login,
      logout,
      updateUser,
      subscribe,
    }),
    [user, isSubscribed, abTestGroup, login, logout, updateUser, subscribe],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
