import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { UserGamificationProfile } from '@/types'
import { gamificationBadges } from '@/lib/data'
import { useToast } from '@/components/ui/use-toast'

const GAMIFICATION_KEY = 'mae-amiga-gamification-profile'

const defaultProfile: UserGamificationProfile = {
  points: 0,
  level: 1,
  unlockedBadges: [],
}

const POINTS_PER_LEVEL = 100

interface GamificationContextType {
  profile: UserGamificationProfile
  addPoints: (amount: number, action: string) => void
}

export const GamificationContext = createContext<
  GamificationContextType | undefined
>(undefined)

export function GamificationProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast()
  const [profile, setProfile] = useState<UserGamificationProfile>(() => {
    try {
      const stored = localStorage.getItem(GAMIFICATION_KEY)
      return stored ? JSON.parse(stored) : defaultProfile
    } catch (error) {
      console.error('Failed to parse gamification profile', error)
      return defaultProfile
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(profile))
    } catch (error) {
      console.error('Failed to save gamification profile', error)
    }
  }, [profile])

  const addPoints = useCallback(
    (amount: number, action: string) => {
      setProfile((prev) => {
        const newPoints = prev.points + amount
        const newLevel = Math.floor(newPoints / POINTS_PER_LEVEL) + 1
        const newlyUnlockedBadges: string[] = []

        gamificationBadges.forEach((badge) => {
          if (
            !prev.unlockedBadges.includes(badge.id) &&
            newPoints >= badge.pointsThreshold
          ) {
            newlyUnlockedBadges.push(badge.id)
          }
        })

        if (newlyUnlockedBadges.length > 0) {
          const badge = gamificationBadges.find(
            (b) => b.id === newlyUnlockedBadges[0],
          )
          toast({
            title: 'Nova Conquista!',
            description: `Você desbloqueou a medalha: ${badge?.name}`,
          })
        }

        if (newLevel > prev.level) {
          toast({
            title: 'Subiu de Nível!',
            description: `Parabéns! Você alcançou o nível ${newLevel}.`,
          })
        }

        toast({
          title: `+${amount} pontos!`,
          description: `Por: ${action}`,
        })

        return {
          points: newPoints,
          level: newLevel,
          unlockedBadges: [...prev.unlockedBadges, ...newlyUnlockedBadges],
        }
      })
    },
    [toast],
  )

  const value = useMemo(
    () => ({
      profile,
      addPoints,
    }),
    [profile, addPoints],
  )

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  )
}

export const useGamification = () => {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error(
      'useGamification must be used within a GamificationProvider',
    )
  }
  return context
}
