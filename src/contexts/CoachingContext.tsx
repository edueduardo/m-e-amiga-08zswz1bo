import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { CoachingSession, CoachingMessage } from '@/types'
import { startCoachingSession, generateCoachingReply } from '@/lib/motherAi'
import { useAuth } from '@/contexts/AuthContext'
import {
  getCoachingSessions,
  addCoachingSession,
  updateCoachingSession,
} from '@/services/coaching'

interface CoachingContextType {
  sessions: CoachingSession[]
  activeSession: CoachingSession | null
  isLoading: boolean
  startNewSession: (topic: string) => Promise<void>
  sendMessage: (text: string) => Promise<void>
  setActiveSession: (sessionId: string | null) => void
}

export const CoachingContext = createContext<CoachingContextType | undefined>(
  undefined,
)

export function CoachingProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<CoachingSession[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSessions = async () => {
      if (user) {
        setIsLoading(true)
        const data = await getCoachingSessions(user.id)
        setSessions(data)
        setIsLoading(false)
      } else {
        setSessions([])
        setIsLoading(false)
      }
    }
    fetchSessions()
  }, [user])

  const startNewSession = useCallback(
    async (topic: string) => {
      if (!user) return
      const initialMessage = await startCoachingSession(topic)
      const newSessionData = {
        title: topic,
        status: 'active' as const,
        startedAt: new Date().toISOString(),
        messages: [initialMessage],
      }
      const newSession = await addCoachingSession(user.id, newSessionData)
      if (newSession) {
        setSessions((prev) => [newSession, ...prev])
        setActiveSessionId(newSession.id)
      }
    },
    [user],
  )

  const sendMessage = useCallback(
    async (text: string) => {
      if (!activeSessionId || !user) return
      const currentSession = sessions.find((s) => s.id === activeSessionId)
      if (!currentSession) return

      const userMessage: CoachingMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text,
        timestamp: new Date().toISOString(),
      }

      const updatedMessages = [...currentSession.messages, userMessage]
      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId ? { ...s, messages: updatedMessages } : s,
        ),
      )

      const aiReply = await generateCoachingReply(updatedMessages)
      const finalMessages = [...updatedMessages, aiReply]

      await updateCoachingSession(activeSessionId, { messages: finalMessages })

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId ? { ...s, messages: finalMessages } : s,
        ),
      )
    },
    [activeSessionId, sessions, user],
  )

  const activeSession = useMemo(
    () => sessions.find((s) => s.id === activeSessionId) || null,
    [sessions, activeSessionId],
  )

  const value = useMemo(
    () => ({
      sessions,
      activeSession,
      isLoading,
      startNewSession,
      sendMessage,
      setActiveSession: setActiveSessionId,
    }),
    [sessions, activeSession, isLoading, startNewSession, sendMessage],
  )

  return (
    <CoachingContext.Provider value={value}>
      {children}
    </CoachingContext.Provider>
  )
}

export const useCoaching = () => {
  const context = useContext(CoachingContext)
  if (context === undefined) {
    throw new Error('useCoaching must be used within a CoachingProvider')
  }
  return context
}
