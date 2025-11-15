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
  requestPhoneEmailVerification: () => Promise<{
    token: string | null
    error: Error | null
  }>
  confirmPhoneEmailVerification: (token: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [abTestGroup, setAbTestGroup] = useState<ABTestGroup | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchProfile = useCallback(async (user: User) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*, user_subscriptions(status)')
      .eq('id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error)
      return null
    }

    if (data) {
      const subscriptionData = Array.isArray(data.user_subscriptions)
        ? data.user_subscriptions[0]
        : data.user_subscriptions
      const activeSubscription = subscriptionData?.status === 'active'
      setIsSubscribed(activeSubscription)

      const userProfile: UserProfile = {
        id: user.id,
        full_name: data.full_name || '',
        email: user.email || '',
        phone_number: data.phone_number || '',
        is_email_verified: !!user.email_confirmed_at,
        phone_verification_status:
          data.phone_verification_status || 'not_verified',
        is_two_factor_enabled: data.is_two_factor_enabled || false,
        role: data.role || 'user',
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
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        fetchProfile(currentUser)
      } else {
        setProfile(null)
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

  const signIn = useCallback(async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password })
  }, [])

  const signUp = useCallback(
    async (email: string, password: string, fullName: string) => {
      return supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      })
    },
    [],
  )

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

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

  const subscribe = useCallback(async () => {
    if (!user) return
    const { error } = await supabase
      .from('user_subscriptions')
      .update({ status: 'active' })
      .eq('user_id', user.id)
    if (!error) {
      setIsSubscribed(true)
    }
  }, [user])

  const sendPasswordResetEmail = useCallback(async (email: string) => {
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
  }, [])

  const updatePassword = useCallback(async (password: string) => {
    return supabase.auth.updateUser({ password })
  }, [])

  const requestPhoneEmailVerification = useCallback(async () => {
    if (!profile?.phone_number)
      return { token: null, error: new Error('Phone number not set.') }
    await updateUser({ phone_verification_status: 'pending_email' })
    const token = `mock_token_${Date.now()}`
    console.log(
      `Mock verification email sent. Token: ${token}. Link: /verify-phone-by-email?token=${token}`,
    )
    return { token, error: null }
  }, [profile, updateUser])

  const confirmPhoneEmailVerification = useCallback(
    async (token: string) => {
      if (token.startsWith('mock_token_')) {
        await updateUser({ phone_verification_status: 'verified' })
        return true
      }
      return false
    },
    [updateUser],
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
