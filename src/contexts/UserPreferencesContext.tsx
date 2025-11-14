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

const PREFERENCES_KEY = 'mae-amiga-user-preferences'

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
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Merge with defaults to ensure new preferences are not missing
        return { ...defaultPreferences, ...parsed }
      }
      return defaultPreferences
    } catch (error) {
      console.error('Failed to parse user preferences from localStorage', error)
      return defaultPreferences
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences))
    } catch (error) {
      console.error('Failed to save user preferences to localStorage', error)
    }
  }, [preferences])

  const updatePreferences = useCallback(
    (newPreferences: Partial<UserPreferences>) => {
      setPreferences((prev) => ({ ...prev, ...newPreferences }))
    },
    [],
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
