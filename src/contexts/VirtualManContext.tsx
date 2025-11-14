import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import {
  VirtualManInteraction,
  VirtualManProfile,
  VirtualManAiResponse,
} from '@/types'
import { useAuth } from './AuthContext'
import {
  getVirtualManInteractions,
  addVirtualManInteraction,
  updateVirtualManInteractionFeedback,
} from '@/services/virtualMan'
import { generateVirtualManReply } from '@/lib/motherAi'

type VmStatus = 'idle' | 'loading' | 'success' | 'error'

interface VirtualManContextType {
  interactions: VirtualManInteraction[]
  status: VmStatus
  error: string | null
  getInteraction: (query: string, profile: VirtualManProfile) => Promise<void>
  updateFeedback: (
    interactionId: string,
    rating: 'helpful' | 'not_helpful',
    comment?: string,
  ) => Promise<void>
}

export const VirtualManContext = createContext<
  VirtualManContextType | undefined
>(undefined)

export function VirtualManProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [interactions, setInteractions] = useState<VirtualManInteraction[]>([])
  const [status, setStatus] = useState<VmStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      const fetchInteractions = async () => {
        setStatus('loading')
        const data = await getVirtualManInteractions(user.id)
        setInteractions(data)
        setStatus('idle')
      }
      fetchInteractions()
    }
  }, [user])

  const getInteraction = useCallback(
    async (query: string, profile: VirtualManProfile) => {
      if (!user) return
      setStatus('loading')
      setError(null)
      try {
        const response = await generateVirtualManReply(query, profile)
        const newInteraction = await addVirtualManInteraction({
          userId: user.id,
          query,
          profile,
          response,
        })
        if (newInteraction) {
          setInteractions((prev) => [newInteraction, ...prev])
        }
        setStatus('success')
      } catch (e) {
        setError('Ocorreu um erro ao gerar a resposta. Tente novamente.')
        setStatus('error')
      }
    },
    [user],
  )

  const updateFeedback = useCallback(
    async (
      interactionId: string,
      rating: 'helpful' | 'not_helpful',
      comment?: string,
    ) => {
      const updatedInteraction = await updateVirtualManInteractionFeedback(
        interactionId,
        { rating, comment },
      )
      if (updatedInteraction) {
        setInteractions((prev) =>
          prev.map((i) => (i.id === interactionId ? updatedInteraction : i)),
        )
      }
    },
    [],
  )

  const value = useMemo(
    () => ({
      interactions,
      status,
      error,
      getInteraction,
      updateFeedback,
    }),
    [interactions, status, error, getInteraction, updateFeedback],
  )

  return (
    <VirtualManContext.Provider value={value}>
      {children}
    </VirtualManContext.Provider>
  )
}

export const useVirtualMan = () => {
  const context = useContext(VirtualManContext)
  if (context === undefined) {
    throw new Error('useVirtualMan must be used within a VirtualManProvider')
  }
  return context
}
