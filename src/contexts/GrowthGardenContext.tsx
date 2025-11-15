import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { GardenGoal, GardenElement } from '@/types'
import { useGamification } from './GamificationContext'

const GARDEN_KEY = 'mae-amiga-growth-garden'

interface GrowthGardenContextType {
  goals: GardenGoal[]
  elements: GardenElement[]
  addGoal: (goal: Omit<GardenGoal, 'id' | 'currentCount'>) => void
  updateProgress: (feature: GardenGoal['relatedFeature']) => void
}

export const GrowthGardenContext = createContext<
  GrowthGardenContextType | undefined
>(undefined)

export function GrowthGardenProvider({ children }: { children: ReactNode }) {
  const { addPoints } = useGamification()
  const [state, setState] = useState<{
    goals: GardenGoal[]
    elements: GardenElement[]
  }>(() => {
    try {
      const stored = localStorage.getItem(GARDEN_KEY)
      return stored ? JSON.parse(stored) : { goals: [], elements: [] }
    } catch (error) {
      return { goals: [], elements: [] }
    }
  })

  useEffect(() => {
    localStorage.setItem(GARDEN_KEY, JSON.stringify(state))
  }, [state])

  const addGoal = useCallback(
    (goal: Omit<GardenGoal, 'id' | 'currentCount'>) => {
      const newGoal: GardenGoal = {
        ...goal,
        id: `goal-${Date.now()}`,
        currentCount: 0,
      }
      const newElement: GardenElement = {
        id: `elem-${Date.now()}`,
        goalId: newGoal.id,
        status: 'seed',
        position: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
      }
      setState((prev) => ({
        goals: [...prev.goals, newGoal],
        elements: [...prev.elements, newElement],
      }))
    },
    [],
  )

  const updateProgress = useCallback(
    (feature: GardenGoal['relatedFeature']) => {
      setState((prev) => {
        const newGoals = [...prev.goals]
        const newElements = [...prev.elements]
        let goalCompleted = false

        newGoals.forEach((goal) => {
          if (
            goal.relatedFeature === feature &&
            goal.currentCount < goal.targetCount
          ) {
            goal.currentCount += 1
            const element = newElements.find((el) => el.goalId === goal.id)
            if (element) {
              const progress = goal.currentCount / goal.targetCount
              if (progress >= 1 && element.status !== 'flower') {
                element.status = 'flower'
                goalCompleted = true
              } else if (progress >= 0.5 && element.status === 'seed') {
                element.status = 'seedling'
              }
            }
          }
        })

        if (goalCompleted) {
          addPoints(100, 'Cultivou uma planta no seu Jardim do Crescimento!')
        }

        return { goals: newGoals, elements: newElements }
      })
    },
    [addPoints],
  )

  const value = useMemo(
    () => ({
      ...state,
      addGoal,
      updateProgress,
    }),
    [state, addGoal, updateProgress],
  )

  return (
    <GrowthGardenContext.Provider value={value}>
      {children}
    </GrowthGardenContext.Provider>
  )
}

export const useGrowthGarden = () => {
  const context = useContext(GrowthGardenContext)
  if (context === undefined) {
    throw new Error(
      'useGrowthGarden must be used within a GrowthGardenProvider',
    )
  }
  return context
}
