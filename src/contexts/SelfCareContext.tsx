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
import { useAuth } from '@/contexts/AuthContext'
import { getSelfCareHistory, saveSelfCareResult } from '@/services/selfCare'

interface SelfCareContextType {
  history: QuizResult[]
  isLoading: boolean
  saveQuizAndPlan: (
    answers: Record<string, string>,
    plan: SelfCarePlan,
  ) => Promise<void>
}

export const SelfCareContext = createContext<SelfCareContextType | undefined>(
  undefined,
)

export function SelfCareProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [history, setHistory] = useState<QuizResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        setIsLoading(true)
        const data = await getSelfCareHistory(user.id)
        setHistory(data)
        setIsLoading(false)
      } else {
        setHistory([])
        setIsLoading(false)
      }
    }
    fetchHistory()
  }, [user])

  const saveQuizAndPlan = useCallback(
    async (answers: Record<string, string>, plan: SelfCarePlan) => {
      if (!user) return
      const newResult = await saveSelfCareResult(user.id, answers, plan)
      if (newResult) {
        setHistory((prev) => [newResult, ...prev])
      }
    },
    [user],
  )

  const value = useMemo(
    () => ({
      history,
      isLoading,
      saveQuizAndPlan,
    }),
    [history, isLoading, saveQuizAndPlan],
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
