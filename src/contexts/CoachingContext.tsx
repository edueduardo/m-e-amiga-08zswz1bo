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

const COACHING_KEY = 'mae-amiga-coaching-sessions'

interface CoachingContextType {
  sessions: CoachingSession[]
  activeSession: CoachingSession | null
  startNewSession: (topic: string) => Promise<void>
  sendMessage: (text: string) => Promise<void>
  setActiveSession: (sessionId: string | null) => void
}

export const CoachingContext = createContext<CoachingContextType | undefined>(
  undefined,
)

export function CoachingProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<CoachingSession[]>(() => {
    try {
      const stored = localStorage.getItem(COACHING_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      return []
    }
  })
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(COACHING_KEY, JSON.stringify(sessions))
  }, [sessions])

  const addMessageToSession = (sessionId: string, message: CoachingMessage) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, messages: [...s.messages, message] } : s,
      ),
    )
  }

  const startNewSession = useCallback(async (topic: string) => {
    const initialMessage = await startCoachingSession(topic)
    const newSession: CoachingSession = {
      id: `session-${Date.now()}`,
      title: topic,
      status: 'active',
      startedAt: new Date().toISOString(),
      messages: [initialMessage],
    }
    setSessions((prev) => [newSession, ...prev])
    setActiveSessionId(newSession.id)
  }, [])

  const sendMessage = useCallback(
    async (text: string) => {
      if (!activeSessionId) return
      const userMessage: CoachingMessage = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        text,
        timestamp: new Date().toISOString(),
      }
      addMessageToSession(activeSessionId, userMessage)

      const currentSession = sessions.find((s) => s.id === activeSessionId)
      if (currentSession) {
        const aiReply = await generateCoachingReply(currentSession.messages)
        addMessageToSession(activeSessionId, aiReply)
      }
    },
    [activeSessionId, sessions],
  )

  const activeSession = useMemo(
    () => sessions.find((s) => s.id === activeSessionId) || null,
    [sessions, activeSessionId],
  )

  const value = useMemo(
    () => ({
      sessions,
      activeSession,
      startNewSession,
      sendMessage,
      setActiveSession: setActiveSessionId,
    }),
    [sessions, activeSession, startNewSession, sendMessage],
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
