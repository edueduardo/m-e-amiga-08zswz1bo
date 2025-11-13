import { createContext, useState, ReactNode, useMemo, useCallback } from 'react'
import { UserProfile } from '@/types'

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  isSubscribed: boolean
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
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const login = useCallback((userData: UserProfile, subscribed: boolean) => {
    setUser(userData)
    setIsSubscribed(subscribed)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsSubscribed(false)
  }, [])

  const updateUser = useCallback((data: Partial<UserProfile>) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, ...data } : prevUser))
  }, [])

  const subscribe = useCallback(() => {
    if (user) {
      setIsSubscribed(true)
    }
  }, [user])

  // For development: auto-login with a mock user
  // To test the public view, comment out the login() call inside this useMemo
  useMemo(() => {
    // login(mockUser, true); // auto-login with active subscription
    // login(mockUser, false); // auto-login with inactive subscription
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isSubscribed,
      login,
      logout,
      updateUser,
      subscribe,
    }),
    [user, isSubscribed, login, logout, updateUser, subscribe],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
