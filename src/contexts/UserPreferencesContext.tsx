import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { UserPreferences } from '@/types'
import { useAuth } from './AuthContext'
import {
  getUserPreferences,
  updateUserPreferences as updatePreferencesService,
} from '@/services/userPreferences'

const defaultPreferences: UserPreferences = {
  sosPracticeId: 'hoop1',
  sosSoundId: 'sound1',
  relationship_status: 'prefiro_nao_dizer',
  notification_preferences: {
    new_challenges: true,
    circle_messages: true,
    app_updates: true,
  },
  preferred_interaction_times: {
    morning: true,
    afternoon: true,
    evening: true,
  },
}

interface UserPreferencesContextType {
  preferences: UserPreferences
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void
}

export const UserPreferencesContext = createContext<
  UserPreferencesContextType | undefined
>(undefined)

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences)

  useEffect(() => {
    const fetchPreferences = async () => {
      if (user) {
        const fetchedPrefs = await getUserPreferences(user.id)
        setPreferences((prev) => ({ ...prev, ...fetchedPrefs }))
      }
    }
    fetchPreferences()
  }, [user])

  const updatePreferences = useCallback(
    (newPreferences: Partial<UserPreferences>) => {
      if (user) {
        setPreferences((prev) => {
          const updated = { ...prev, ...newPreferences }
          updatePreferencesService(user.id, updated)
          return updated
        })
      }
    },
    [user],
  )

  const value = useMemo(
    () => ({
      preferences,
      updatePreferences,
    }),
    [preferences, updatePreferences],
  )

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  )
}

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext)
  if (context === undefined) {
    throw new Error(
      'useUserPreferences must be used within a UserPreferencesProvider',
    )
  }
  return context
}
