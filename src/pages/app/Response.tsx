import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAiResponse } from '@/contexts/AiResponseContext'
import { AiProcessingLoader } from '@/components/AiProcessingLoader'
import { SelfCarePlan } from '@/components/SelfCarePlan'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { useSelfCare } from '@/contexts/SelfCareContext'

const ResponsePage = () => {
  const {
    status,
    plan,
    error,
    maxTime,
    focus,
    quizAnswers,
    refinePlan,
    elaboratePlan,
    reset,
    retry,
  } = useAiResponse()
  const { saveQuizAndPlan } = useSelfCare()
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    if (status === 'idle') {
      navigate('/app/care')
    }
  }, [status, navigate])

  const handleAcceptPlan = () => {
    if (plan && quizAnswers) {
      saveQuizAndPlan(quizAnswers, plan)
      toast({
        title: 'Que bom que gostou, filha!',
        description: 'Sua trilha de cuidado está salva.',
      })
      navigate('/app/care')
    }
  }

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return <AiProcessingLoader maxTime={maxTime} />
      case 'success':
        if (plan && focus) {
          return (
            <SelfCarePlan
              plan={plan}
              focus={focus}
              onRefine={refinePlan}
              onAccept={handleAcceptPlan}
              onElaborate={elaboratePlan}
            />
          )
        }
        return (
          <div className="text-center space-y-6 p-8 max-w-lg mx-auto">
            <AlertTriangle className="h-16 w-16 mx-auto text-destructive" />
            <h2 className="text-2xl font-bold">Ocorreu um problema</h2>
            <p className="text-muted-foreground">
              Não foi possível carregar o plano. Por favor, tente novamente.
            </p>
            <Button onClick={reset}>Voltar</Button>
          </div>
        )
      case 'error':
        return (
          <div className="text-center space-y-6 p-8 max-w-lg mx-auto">
            <AlertTriangle className="h-16 w-16 mx-auto text-destructive" />
            <h2 className="text-2xl font-bold">Ocorreu um problema</h2>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={retry}>Tentar Novamente</Button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 animate-fade-in p-4">
      {renderContent()}
    </div>
  )
}

export default ResponsePage
