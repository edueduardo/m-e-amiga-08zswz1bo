import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useRef,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { SelfCarePlan as SelfCarePlanType } from '@/types'
import {
  SelfCareFocus,
  generateSelfCarePlan,
  refineSelfCarePlan,
  elaborateOnSelfCarePlan,
} from '@/lib/motherAi'

type AiStatus = 'idle' | 'processing' | 'success' | 'error'

interface AiResponseState {
  status: AiStatus
  plan: SelfCarePlanType | null
  error: string | null
  maxTime: number
  focus: SelfCareFocus | null
  quizAnswers: Record<string, string> | null
}

interface AiResponseContextType extends AiResponseState {
  generatePlan: (answers: Record<string, string>, focus: SelfCareFocus) => void
  refinePlan: (feedback: string) => void
  elaboratePlan: (elaboration: string) => void
  reset: () => void
}

export const AiResponseContext = createContext<
  AiResponseContextType | undefined
>(undefined)

export function AiResponseProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AiResponseState>({
    status: 'idle',
    plan: null,
    error: null,
    maxTime: 60,
    focus: null,
    quizAnswers: null,
  })
  const navigate = useNavigate()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const startTimeout = () => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        status: 'error',
        error:
          'A Mãe Amiga está demorando um pouco mais que o normal para responder. Por favor, tente novamente em alguns instantes.',
      }))
    }, 15000) // 15 seconds timeout
  }

  const handleAiInteraction = useCallback(
    async (
      aiFunction: () => Promise<SelfCarePlanType>,
      requestData: {
        answers: Record<string, string>
        focus: SelfCareFocus
      },
    ) => {
      const complexity = JSON.stringify(requestData.answers).length
      const estimatedTime = Math.max(
        10,
        Math.min(60, Math.round(complexity / 20)),
      )

      setState({
        ...state,
        status: 'processing',
        maxTime: estimatedTime,
        quizAnswers: requestData.answers,
        focus: requestData.focus,
      })
      startTimeout()

      try {
        const result = await aiFunction()
        resetTimeout()
        setState((prevState) => ({
          ...prevState,
          status: 'success',
          plan: result,
          error: null,
        }))
      } catch (error) {
        resetTimeout()
        console.error('AI Interaction Error:', error)
        setState((prevState) => ({
          ...prevState,
          status: 'error',
          error:
            'Ops, parece que houve uma falha no sistema. Não consegui gerar sua trilha agora. Por favor, tente novamente.',
        }))
      }
    },
    [state],
  )

  const generatePlan = useCallback(
    (answers: Record<string, string>, focus: SelfCareFocus) => {
      navigate('/app/response')
      handleAiInteraction(() => generateSelfCarePlan(answers, focus), {
        answers,
        focus,
      })
    },
    [navigate, handleAiInteraction],
  )

  const refinePlan = useCallback(
    (feedback: string) => {
      if (!state.plan || !state.quizAnswers || !state.focus) return
      const currentPlan = state.plan
      const currentAnswers = state.quizAnswers
      const currentFocus = state.focus
      handleAiInteraction(
        () =>
          refineSelfCarePlan(
            currentPlan,
            feedback,
            currentAnswers,
            currentFocus,
          ),
        { answers: currentAnswers, focus: currentFocus },
      )
    },
    [state.plan, state.quizAnswers, state.focus, handleAiInteraction],
  )

  const elaboratePlan = useCallback(
    (elaboration: string) => {
      if (!state.plan || !state.quizAnswers || !state.focus) return
      const currentPlan = state.plan
      const currentAnswers = state.quizAnswers
      const currentFocus = state.focus
      handleAiInteraction(
        () =>
          elaborateOnSelfCarePlan(
            currentPlan,
            elaboration,
            currentAnswers,
            currentFocus,
          ),
        { answers: currentAnswers, focus: currentFocus },
      )
    },
    [state.plan, state.quizAnswers, state.focus, handleAiInteraction],
  )

  const reset = useCallback(() => {
    resetTimeout()
    setState({
      status: 'idle',
      plan: null,
      error: null,
      maxTime: 60,
      focus: null,
      quizAnswers: null,
    })
    navigate('/app/care')
  }, [navigate])

  const value = useMemo(
    () => ({
      ...state,
      generatePlan,
      refinePlan,
      elaboratePlan,
      reset,
    }),
    [state, generatePlan, refinePlan, elaboratePlan, reset],
  )

  return (
    <AiResponseContext.Provider value={value}>
      {children}
    </AiResponseContext.Provider>
  )
}

export const useAiResponse = () => {
  const context = useContext(AiResponseContext)
  if (context === undefined) {
    throw new Error('useAiResponse must be used within an AiResponseProvider')
  }
  return context
}
