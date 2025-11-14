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

const JOURNAL_KEY = 'mae-amiga-journal-entries'

interface JournalContextType {
  entries: HooponoponoJournalEntry[]
  addEntry: (content: string, prompt: string) => void
}

export const JournalContext = createContext<JournalContextType | undefined>(
  undefined,
)

export function JournalProvider({ children }: { children: ReactNode }) {
  const { addPoints } = useGamification()
  const [entries, setEntries] = useState<HooponoponoJournalEntry[]>(() => {
    try {
      const stored = localStorage.getItem(JOURNAL_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to parse journal entries', error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries))
    } catch (error) {
      console.error('Failed to save journal entries', error)
    }
  }, [entries])

  const addEntry = useCallback(
    (content: string, prompt: string) => {
      if (content.trim()) {
        const newEntry: HooponoponoJournalEntry = {
          id: new Date().toISOString(),
          date: new Date().toISOString(),
          prompt,
          content,
        }
        setEntries((prev) => [newEntry, ...prev])
        addPoints(25, "Escreveu no Diário Ho'oponopono")
      }
    },
    [addPoints],
  )

  const value = useMemo(
    () => ({
      entries,
      addEntry,
    }),
    [entries, addEntry],
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
