import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
} from 'react'
import { VoiceEntry, Feedback } from '@/types'
import { voiceEntries as initialVoiceEntries } from '@/lib/data'

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
  const [entries, setEntries] = useState<VoiceEntry[]>(initialVoiceEntries)

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
