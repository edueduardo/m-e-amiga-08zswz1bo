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
import { useAuth } from '@/contexts/AuthContext'
import {
  getGamificationProfile,
  updateGamificationProfile,
} from '@/services/gamification'

const defaultProfile: UserGamificationProfile = {
  points: 0,
  level: 1,
  unlockedBadges: [],
}

const POINTS_PER_LEVEL = 100

interface GamificationContextType {
  profile: UserGamificationProfile
  isLoading: boolean
  addPoints: (amount: number, action: string) => Promise<void>
}

export const GamificationContext = createContext<
  GamificationContextType | undefined
>(undefined)

export function GamificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [profile, setProfile] =
    useState<UserGamificationProfile>(defaultProfile)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setIsLoading(true)
        const data = await getGamificationProfile(user.id)
        setProfile(data || defaultProfile)
        setIsLoading(false)
      } else {
        setProfile(defaultProfile)
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [user])

  const addPoints = useCallback(
    async (amount: number, action: string) => {
      if (!user) return

      const newPoints = profile.points + amount
      const newLevel = Math.floor(newPoints / POINTS_PER_LEVEL) + 1
      const newlyUnlockedBadges: string[] = []

      gamificationBadges.forEach((badge) => {
        if (
          !profile.unlockedBadges.includes(badge.id) &&
          newPoints >= badge.pointsThreshold
        ) {
          newlyUnlockedBadges.push(badge.id)
        }
      })

      const updatedProfileData = {
        points: newPoints,
        level: newLevel,
        unlockedBadges: [...profile.unlockedBadges, ...newlyUnlockedBadges],
      }

      const updatedProfile = await updateGamificationProfile(
        user.id,
        updatedProfileData,
      )

      if (updatedProfile) {
        setProfile(updatedProfile)

        if (newlyUnlockedBadges.length > 0) {
          const badge = gamificationBadges.find(
            (b) => b.id === newlyUnlockedBadges[0],
          )
          toast({
            title: 'Nova Conquista!',
            description: `Você desbloqueou a medalha: ${badge?.name}`,
          })
        }

        if (newLevel > profile.level) {
          toast({
            title: 'Subiu de Nível!',
            description: `Parabéns! Você alcançou o nível ${newLevel}.`,
          })
        }

        toast({
          title: `+${amount} pontos!`,
          description: `Por: ${action}`,
        })
      }
    },
    [user, profile, toast],
  )

  const value = useMemo(
    () => ({
      profile,
      isLoading,
      addPoints,
    }),
    [profile, isLoading, addPoints],
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
