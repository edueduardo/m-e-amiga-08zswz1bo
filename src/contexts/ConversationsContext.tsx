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
import { useAuth } from './AuthContext'
import {
  getConversations,
  addConversation,
  deleteConversation,
  deleteAllConversations as deleteAllConversationsService,
  updateConversationFeedback,
} from '@/services/conversations'

interface ConversationsContextType {
  entries: VoiceEntry[]
  isLoading: boolean
  addEntry: (
    entry: Omit<VoiceEntry, 'id' | 'created_at' | 'feedback'>,
  ) => Promise<void>
  deleteEntry: (entryId: string) => Promise<void>
  deleteAllEntries: () => Promise<void>
  updateFeedback: (entryId: string, feedback: Feedback) => Promise<void>
}

export const ConversationsContext = createContext<
  ConversationsContextType | undefined
>(undefined)

export function ConversationsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [entries, setEntries] = useState<VoiceEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchConversations = async () => {
      if (user) {
        setIsLoading(true)
        const data = await getConversations(user.id)
        setEntries(data)
        setIsLoading(false)
      } else {
        setEntries([])
        setIsLoading(false)
      }
    }
    fetchConversations()
  }, [user])

  const addEntry = useCallback(
    async (entry: Omit<VoiceEntry, 'id' | 'created_at' | 'feedback'>) => {
      if (!user) return
      const newEntry = await addConversation(user.id, entry)
      if (newEntry) {
        setEntries((prevEntries) => [newEntry, ...prevEntries])
      }
    },
    [user],
  )

  const deleteEntry = useCallback(async (entryId: string) => {
    const success = await deleteConversation(entryId)
    if (success) {
      setEntries((prevEntries) =>
        prevEntries.filter((entry) => entry.id !== entryId),
      )
    }
  }, [])

  const deleteAllEntries = useCallback(async () => {
    if (!user) return
    const success = await deleteAllConversationsService(user.id)
    if (success) {
      setEntries([])
    }
  }, [user])

  const updateFeedback = useCallback(
    async (entryId: string, feedback: Feedback) => {
      const success = await updateConversationFeedback(entryId, feedback)
      if (success) {
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry.id === entryId ? { ...entry, feedback } : entry,
          ),
        )
      }
    },
    [],
  )

  const value = useMemo(
    () => ({
      entries,
      isLoading,
      addEntry,
      deleteEntry,
      deleteAllEntries,
      updateFeedback,
    }),
    [
      entries,
      isLoading,
      addEntry,
      deleteEntry,
      deleteAllEntries,
      updateFeedback,
    ],
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
