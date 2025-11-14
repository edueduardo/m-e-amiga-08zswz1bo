import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react'
import { UserProfile } from '@/types'
import { getOrAssignABTestGroup, ABTestGroup } from '@/lib/abTesting'

interface AuthState {
  user: UserProfile | null
  isSubscribed: boolean
}

interface AuthContextType extends AuthState {
  isAuthenticated: boolean
  abTestGroup: ABTestGroup | null
  login: (user: UserProfile, isSubscribed: boolean) => void
  logout: () => void
  updateUser: (data: Partial<UserProfile>) => void
  subscribe: () => void
  requestPhoneEmailVerification: () => string
  confirmPhoneEmailVerification: (token: string) => boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_KEY = 'mae-amiga-auth'
const mockVerificationStore: { [key: string]: string } = {}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isSubscribed: false,
  })
  const [abTestGroup, setAbTestGroup] = useState<ABTestGroup | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY)
      if (stored) {
        const savedState: AuthState = JSON.parse(stored)
        setAuthState(savedState)
        setAbTestGroup(getOrAssignABTestGroup())
      }
    } catch (error) {
      console.error('Failed to parse auth state', error)
      localStorage.removeItem(AUTH_KEY)
    }
  }, [])

  const persistAuthState = (state: AuthState) => {
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save auth state', error)
    }
  }

  const login = useCallback((user: UserProfile, isSubscribed: boolean) => {
    const newState = { user, isSubscribed }
    setAuthState(newState)
    persistAuthState(newState)
    setAbTestGroup(getOrAssignABTestGroup())
  }, [])

  const logout = useCallback(() => {
    setAuthState({ user: null, isSubscribed: false })
    localStorage.removeItem(AUTH_KEY)
    setAbTestGroup(null)
  }, [])

  const updateUser = useCallback((data: Partial<UserProfile>) => {
    setAuthState((prevState) => {
      if (!prevState.user) return prevState
      const newUser = { ...prevState.user, ...data }
      const newState = { ...prevState, user: newUser }
      persistAuthState(newState)
      return newState
    })
  }, [])

  const subscribe = useCallback(() => {
    setAuthState((prevState) => {
      if (!prevState.user) return prevState
      const newState = { ...prevState, isSubscribed: true }
      persistAuthState(newState)
      return newState
    })
  }, [])

  const requestPhoneEmailVerification = useCallback(() => {
    if (!authState.user) return ''
    const token = `mock_token_${Date.now()}`
    mockVerificationStore[token] = authState.user.id
    updateUser({ phone_verification_status: 'pending_email' })
    console.log(
      `Verification email sent to ${authState.user.email} for phone ${authState.user.phone_number}. Token: ${token}`,
    )
    return token
  }, [authState.user, updateUser])

  const confirmPhoneEmailVerification = useCallback(
    (token: string) => {
      if (
        authState.user &&
        mockVerificationStore[token] === authState.user.id
      ) {
        updateUser({ phone_verification_status: 'verified' })
        delete mockVerificationStore[token]
        return true
      }
      return false
    },
    [authState.user, updateUser],
  )

  const value = useMemo(
    () => ({
      ...authState,
      isAuthenticated: !!authState.user,
      abTestGroup,
      login,
      logout,
      updateUser,
      subscribe,
      requestPhoneEmailVerification,
      confirmPhoneEmailVerification,
    }),
    [
      authState,
      abTestGroup,
      login,
      logout,
      updateUser,
      subscribe,
      requestPhoneEmailVerification,
      confirmPhoneEmailVerification,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
