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
import { useGamification } from './GamificationContext'
import { useGrowthGarden } from './GrowthGardenContext'
import { getChallenges } from '@/services/challenges'

interface ChallengesContextType {
  challenges: Challenge[]
  isLoading: boolean
  updateStepCompletion: (challengeId: string, stepId: string) => void
}

export const ChallengesContext = createContext<
  ChallengesContextType | undefined
>(undefined)

export function ChallengesProvider({ children }: { children: ReactNode }) {
  const { addPoints } = useGamification()
  const { updateProgress } = useGrowthGarden()
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true)
      const data = await getChallenges()
      // Mocking steps as they are not in the DB
      const challengesWithSteps = data.map((c) => ({
        ...c,
        steps: Array.from({ length: c.duration_days || 3 }, (_, i) => ({
          id: `step-${c.id}-${i + 1}`,
          description: `Dia ${i + 1}`,
          is_completed: false,
        })),
      }))
      setChallenges(challengesWithSteps)
      setIsLoading(false)
    }
    fetchChallenges()
  }, [])

  const updateStepCompletion = useCallback(
    (challengeId: string, stepId: string) => {
      setChallenges((prevChallenges) => {
        const newChallenges = prevChallenges.map((challenge) => {
          if (challenge.id === challengeId && challenge.steps) {
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
      isLoading,
      updateStepCompletion,
    }),
    [challenges, isLoading, updateStepCompletion],
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
