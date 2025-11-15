import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { EmotionalPattern } from '@/types'
import { analyzeEmotionalPatterns } from '@/lib/motherAi'
import { useConversations } from './ConversationsContext'

const SELF_KNOWLEDGE_KEY = 'mae-amiga-self-knowledge'

interface SelfKnowledgeContextType {
  patterns: EmotionalPattern[]
  isLoading: boolean
  fetchPatterns: () => Promise<void>
}

export const SelfKnowledgeContext = createContext<
  SelfKnowledgeContextType | undefined
>(undefined)

export function SelfKnowledgeProvider({ children }: { children: ReactNode }) {
  const { entries } = useConversations()
  const [patterns, setPatterns] = useState<EmotionalPattern[]>(() => {
    try {
      const stored = localStorage.getItem(SELF_KNOWLEDGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      return []
    }
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    localStorage.setItem(SELF_KNOWLEDGE_KEY, JSON.stringify(patterns))
  }, [patterns])

  const fetchPatterns = useCallback(async () => {
    setIsLoading(true)
    const fetchedPatterns = await analyzeEmotionalPatterns(entries)
    setPatterns(fetchedPatterns)
    setIsLoading(false)
  }, [entries])

  const value = useMemo(
    () => ({
      patterns,
      isLoading,
      fetchPatterns,
    }),
    [patterns, isLoading, fetchPatterns],
  )

  return (
    <SelfKnowledgeContext.Provider value={value}>
      {children}
    </SelfKnowledgeContext.Provider>
  )
}

export const useSelfKnowledge = () => {
  const context = useContext(SelfKnowledgeContext)
  if (context === undefined) {
    throw new Error(
      'useSelfKnowledge must be used within a SelfKnowledgeProvider',
    )
  }
  return context
}
