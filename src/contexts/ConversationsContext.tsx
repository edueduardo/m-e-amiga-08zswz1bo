import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { VoiceEntry, Feedback } from '@/types'

const CONVERSATIONS_KEY = 'mae-amiga-conversations'

interface ConversationsContextType {
  entries: VoiceEntry[]
  addEntry: (entry: VoiceEntry) => void
  deleteEntry: (entryId: string) => void
  deleteAllEntries: () => void
  updateFeedback: (entryId: string, feedback: Feedback) => void
}

export const ConversationsContext = createContext<
  ConversationsContextType | undefined
>(undefined)

export function ConversationsProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<VoiceEntry[]>(() => {
    try {
      const stored = localStorage.getItem(CONVERSATIONS_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to parse conversations', error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(entries))
    } catch (error) {
      console.error('Failed to save conversations', error)
    }
  }, [entries])

  const addEntry = useCallback((entry: VoiceEntry) => {
    setEntries((prevEntries) => [entry, ...prevEntries])
  }, [])

  const deleteEntry = useCallback((entryId: string) => {
    setEntries((prevEntries) =>
      prevEntries.filter((entry) => entry.id !== entryId),
    )
  }, [])

  const deleteAllEntries = useCallback(() => {
    setEntries([])
  }, [])

  const updateFeedback = useCallback((entryId: string, feedback: Feedback) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === entryId ? { ...entry, feedback } : entry,
      ),
    )
  }, [])

  const value = useMemo(
    () => ({
      entries,
      addEntry,
      deleteEntry,
      deleteAllEntries,
      updateFeedback,
    }),
    [entries, addEntry, deleteEntry, deleteAllEntries, updateFeedback],
  )

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

export const useConversations = () => {
  const context = useContext(ConversationsContext)
  if (context === undefined) {
    throw new Error(
      'useConversations must be used within a ConversationsProvider',
    )
  }
  return context
}
