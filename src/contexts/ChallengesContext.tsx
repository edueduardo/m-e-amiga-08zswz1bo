import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { Challenge } from '@/types'
import { weeklyChallenges } from '@/lib/data'
import { useGamification } from './GamificationContext'
import { useGrowthGarden } from './GrowthGardenContext'

const CHALLENGES_KEY = 'mae-amiga-challenges'

interface ChallengesContextType {
  challenges: Challenge[]
  updateStepCompletion: (challengeId: string, stepId: string) => void
}

export const ChallengesContext = createContext<
  ChallengesContextType | undefined
>(undefined)

export function ChallengesProvider({ children }: { children: ReactNode }) {
  const { addPoints } = useGamification()
  const { updateProgress } = useGrowthGarden()
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    try {
      const stored = localStorage.getItem(CHALLENGES_KEY)
      return stored ? JSON.parse(stored) : weeklyChallenges
    } catch (error) {
      console.error('Failed to parse challenges', error)
      return weeklyChallenges
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(CHALLENGES_KEY, JSON.stringify(challenges))
    } catch (error) {
      console.error('Failed to save challenges', error)
    }
  }, [challenges])

  const updateStepCompletion = useCallback(
    (challengeId: string, stepId: string) => {
      setChallenges((prevChallenges) => {
        const newChallenges = prevChallenges.map((challenge) => {
          if (challenge.id === challengeId) {
            const wasAlreadyCompleted = challenge.steps.every(
              (s) => s.is_completed,
            )
            const updatedSteps = challenge.steps.map((step) =>
              step.id === stepId
                ? { ...step, is_completed: !step.is_completed }
                : step,
            )

            const isNowCompleted = updatedSteps.every((s) => s.is_completed)
            const isCompletingStep =
              !challenge.steps.find((s) => s.id === stepId)?.is_completed &&
              updatedSteps.find((s) => s.id === stepId)?.is_completed

            if (isCompletingStep) {
              addPoints(10, `Completou um passo do desafio: ${challenge.title}`)
            }
            if (isNowCompleted && !wasAlreadyCompleted) {
              addPoints(50, `Completou o desafio: ${challenge.title}`)
              updateProgress('challenge')
            }

            return { ...challenge, steps: updatedSteps }
          }
          return challenge
        })
        return newChallenges
      })
    },
    [addPoints, updateProgress],
  )

  const value = useMemo(
    () => ({
      challenges,
      updateStepCompletion,
    }),
    [challenges, updateStepCompletion],
  )

  return (
    <ChallengesContext.Provider value={value}>
      {children}
    </ChallengesContext.Provider>
  )
}

export const useChallenges = () => {
  const context = useContext(ChallengesContext)
  if (context === undefined) {
    throw new Error('useChallenges must be used within a ChallengesProvider')
  }
  return context
}
