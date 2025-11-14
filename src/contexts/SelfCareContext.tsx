import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { SelfCarePlan, QuizResult } from '@/types'

const SELF_CARE_KEY = 'mae-amiga-selfcare-history'

interface SelfCareContextType {
  history: QuizResult[]
  saveQuizAndPlan: (answers: Record<string, string>, plan: SelfCarePlan) => void
}

export const SelfCareContext = createContext<SelfCareContextType | undefined>(
  undefined,
)

export function SelfCareProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<QuizResult[]>(() => {
    try {
      const stored = localStorage.getItem(SELF_CARE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to parse self-care history', error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(SELF_CARE_KEY, JSON.stringify(history))
    } catch (error) {
      console.error('Failed to save self-care history', error)
    }
  }, [history])

  const saveQuizAndPlan = useCallback(
    (answers: Record<string, string>, plan: SelfCarePlan) => {
      const newResult: QuizResult = {
        date: new Date().toISOString(),
        answers,
        plan,
      }
      setHistory((prev) => [newResult, ...prev])
    },
    [],
  )

  const value = useMemo(
    () => ({
      history,
      saveQuizAndPlan,
    }),
    [history, saveQuizAndPlan],
  )

  return (
    <SelfCareContext.Provider value={value}>
      {children}
    </SelfCareContext.Provider>
  )
}

export const useSelfCare = () => {
  const context = useContext(SelfCareContext)
  if (context === undefined) {
    throw new Error('useSelfCare must be used within a SelfCareProvider')
  }
  return context
}
