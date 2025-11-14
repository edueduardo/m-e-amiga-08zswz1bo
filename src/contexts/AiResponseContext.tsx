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
  retry: () => void
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
          'A resposta está demorando mais do que o esperado. Por favor, tente novamente.',
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
        status: 'processing',
        plan: null,
        error: null,
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
            'Houve um imprevisto e não foi possível gerar sua trilha. Que tal tentar de novo?',
        }))
      }
    },
    [],
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

  const retry = useCallback(() => {
    if (state.quizAnswers && state.focus) {
      handleAiInteraction(
        () => generateSelfCarePlan(state.quizAnswers!, state.focus!),
        {
          answers: state.quizAnswers!,
          focus: state.focus!,
        },
      )
    }
  }, [state.quizAnswers, state.focus, handleAiInteraction])

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
      retry,
    }),
    [state, generatePlan, refinePlan, elaboratePlan, reset, retry],
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
