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
import { useAuth } from '@/contexts/AuthContext'
import {
  getGardenData,
  addGardenGoal,
  updateGardenGoal,
  updateGardenElement,
} from '@/services/growthGarden'

interface GrowthGardenContextType {
  goals: GardenGoal[]
  elements: GardenElement[]
  isLoading: boolean
  addGoal: (goal: Omit<GardenGoal, 'id' | 'currentCount'>) => Promise<void>
  updateProgress: (feature: GardenGoal['relatedFeature']) => Promise<void>
}

export const GrowthGardenContext = createContext<
  GrowthGardenContextType | undefined
>(undefined)

export function GrowthGardenProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { addPoints } = useGamification()
  const [goals, setGoals] = useState<GardenGoal[]>([])
  const [elements, setElements] = useState<GardenElement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setIsLoading(true)
        const { goals, elements } = await getGardenData(user.id)
        setGoals(goals)
        setElements(elements)
        setIsLoading(false)
      } else {
        setGoals([])
        setElements([])
        setIsLoading(false)
      }
    }
    fetchData()
  }, [user])

  const addGoal = useCallback(
    async (goal: Omit<GardenGoal, 'id' | 'currentCount'>) => {
      if (!user) return
      const result = await addGardenGoal(user.id, goal)
      if (result) {
        setGoals((prev) => [...prev, result.newGoal])
        setElements((prev) => [...prev, result.newElement])
      }
    },
    [user],
  )

  const updateProgress = useCallback(
    async (feature: GardenGoal['relatedFeature']) => {
      const relevantGoals = goals.filter(
        (g) => g.relatedFeature === feature && g.currentCount < g.targetCount,
      )
      if (relevantGoals.length === 0) return

      for (const goal of relevantGoals) {
        const newCount = goal.currentCount + 1
        const updatedGoal = await updateGardenGoal(goal.id, {
          currentCount: newCount,
        })
        if (updatedGoal) {
          setGoals((prev) =>
            prev.map((g) => (g.id === goal.id ? updatedGoal : g)),
          )
          const element = elements.find((el) => el.goalId === goal.id)
          if (element) {
            const progress = newCount / goal.targetCount
            let newStatus = element.status
            if (progress >= 1 && element.status !== 'flower') {
              newStatus = 'flower'
              addPoints(
                100,
                'Cultivou uma planta no seu Jardim do Crescimento!',
              )
            } else if (progress >= 0.5 && element.status === 'seed') {
              newStatus = 'seedling'
            }
            if (newStatus !== element.status) {
              const updatedElement = await updateGardenElement(element.id, {
                status: newStatus,
              })
              if (updatedElement) {
                setElements((prev) =>
                  prev.map((el) =>
                    el.id === element.id ? updatedElement : el,
                  ),
                )
              }
            }
          }
        }
      }
    },
    [goals, elements, addPoints],
  )

  const value = useMemo(
    () => ({
      goals,
      elements,
      isLoading,
      addGoal,
      updateProgress,
    }),
    [goals, elements, isLoading, addGoal, updateProgress],
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
