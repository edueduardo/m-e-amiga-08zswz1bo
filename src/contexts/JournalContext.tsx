import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { HooponoponoJournalEntry } from '@/types'
import { useGamification } from './GamificationContext'
import { useGrowthGarden } from './GrowthGardenContext'
import { useAuth } from './AuthContext'
import { getJournalEntries, addJournalEntry } from '@/services/journal'

interface JournalContextType {
  entries: HooponoponoJournalEntry[]
  isLoading: boolean
  addEntry: (content: string, prompt: string) => Promise<void>
}

export const JournalContext = createContext<JournalContextType | undefined>(
  undefined,
)

export function JournalProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { addPoints } = useGamification()
  const { updateProgress } = useGrowthGarden()
  const [entries, setEntries] = useState<HooponoponoJournalEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEntries = async () => {
      if (user) {
        setIsLoading(true)
        const data = await getJournalEntries(user.id)
        setEntries(data)
        setIsLoading(false)
      } else {
        setEntries([])
        setIsLoading(false)
      }
    }
    fetchEntries()
  }, [user])

  const addEntry = useCallback(
    async (content: string, prompt: string) => {
      if (!user || !content.trim()) return

      const newEntry = await addJournalEntry(user.id, { content, prompt })
      if (newEntry) {
        setEntries((prev) => [newEntry, ...prev])
        addPoints(25, "Escreveu no Diário Ho'oponopono")
        updateProgress('journal')
      }
    },
    [user, addPoints, updateProgress],
  )

  const value = useMemo(
    () => ({
      entries,
      isLoading,
      addEntry,
    }),
    [entries, isLoading, addEntry],
  )

  return (
    <JournalContext.Provider value={value}>{children}</JournalContext.Provider>
  )
}

export const useJournal = () => {
  const context = useContext(JournalContext)
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider')
  }
  return context
}
