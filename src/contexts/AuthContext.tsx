import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { UserProfile } from '@/types'
import { getOrAssignABTestGroup, ABTestGroup } from '@/lib/abTesting'

interface AuthContextType {
  session: Session | null
  user: User | null
  profile: UserProfile | null
  isSubscribed: boolean
  isAuthenticated: boolean
  abTestGroup: ABTestGroup | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateUser: (data: Partial<UserProfile>) => Promise<void>
  subscribe: () => void
  sendPasswordResetEmail: (email: string) => Promise<{ error: any }>
  updatePassword: (password: string) => Promise<{ error: any }>
  requestPhoneEmailVerification: () => Promise<string>
  confirmPhoneEmailVerification: (token: string) => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockVerificationStore: { [key: string]: string } = {}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false) // Mocked for now
  const [abTestGroup, setAbTestGroup] = useState<ABTestGroup | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchProfile = useCallback(async (user: User) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error)
      return null
    }

    if (data) {
      const userProfile: UserProfile = {
        id: user.id,
        full_name: data.full_name || '',
        email: user.email || '',
        phone_number: data.phone_number || '',
        is_email_verified: !!user.email_confirmed_at,
        phone_verification_status:
          data.phone_verification_status || 'not_verified',
        is_two_factor_enabled: data.is_two_factor_enabled || false,
      }
      setProfile(userProfile)
      return userProfile
    }
    return null
  }, [])

  useEffect(() => {
    setAbTestGroup(getOrAssignABTestGroup())

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        fetchProfile(currentUser)
      } else {
        setProfile(null)
      }
      if (event === 'SIGNED_IN') {
        // This handles both signup and signin
        // In a real app, you'd check subscription status from your DB
        setIsSubscribed(true)
      }
      if (event === 'SIGNED_OUT') {
        setIsSubscribed(false)
      }
      setIsLoading(false)
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        fetchProfile(currentUser)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [fetchProfile])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }

  const updateUser = useCallback(
    async (data: Partial<UserProfile>) => {
      if (!user) return
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id)
      if (!error) {
        await fetchProfile(user)
      } else {
        console.error('Error updating profile:', error)
      }
    },
    [user, fetchProfile],
  )

  const subscribe = useCallback(() => setIsSubscribed(true), [])

  const sendPasswordResetEmail = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error }
  }

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password })
    return { error }
  }

  const requestPhoneEmailVerification = useCallback(async () => {
    if (!profile) return ''
    const token = `mock_token_${Date.now()}`
    mockVerificationStore[token] = profile.id
    await updateUser({ phone_verification_status: 'pending_email' })
    console.log(
      `Verification email sent to ${profile.email} for phone ${profile.phone_number}. Token: ${token}`,
    )
    return token
  }, [profile, updateUser])

  const confirmPhoneEmailVerification = useCallback(
    async (token: string) => {
      if (profile && mockVerificationStore[token] === profile.id) {
        await updateUser({ phone_verification_status: 'verified' })
        delete mockVerificationStore[token]
        return true
      }
      return false
    },
    [profile, updateUser],
  )

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      isSubscribed,
      isAuthenticated: !!session && !!user,
      abTestGroup,
      isLoading,
      signIn,
      signUp,
      signOut,
      updateUser,
      subscribe,
      sendPasswordResetEmail,
      updatePassword,
      requestPhoneEmailVerification,
      confirmPhoneEmailVerification,
    }),
    [
      session,
      user,
      profile,
      isSubscribed,
      abTestGroup,
      isLoading,
      signIn,
      signUp,
      signOut,
      updateUser,
      subscribe,
      sendPasswordResetEmail,
      updatePassword,
      requestPhoneEmailVerification,
      confirmPhoneEmailVerification,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
