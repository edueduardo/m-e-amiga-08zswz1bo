import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, HeartHandshake } from 'lucide-react'
import {
  generateSelfCareQuiz,
  generateSelfCarePlan,
  refineSelfCarePlan,
  elaborateOnSelfCarePlan,
  SelfCareFocus,
} from '@/lib/motherAi'
import { QuizQuestion, SelfCarePlan as SelfCarePlanType } from '@/types'
import { SelfCarePlan } from '@/components/SelfCarePlan'
import { SelfCareQuizFlow } from '@/components/SelfCareQuizFlow'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

type InteractionState =
  | 'focusSelection'
  | 'loadingQuiz'
  | 'quizFlow'
  | 'generatingPlan'
  | 'plan'
  | 'refiningPlan'
  | 'elaboratingPlan'
  | 'error'

const CarePage = () => {
  const [state, setState] = useState<InteractionState>('focusSelection')
  const [quiz, setQuiz] = useState<QuizQuestion[]>([])
  const [plan, setPlan] = useState<SelfCarePlanType | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [focus, setFocus] = useState<SelfCareFocus | null>(null)
  const { toast } = useToast()

  const startQuiz = async (selectedFocus: SelfCareFocus) => {
    setState('loadingQuiz')
    setFocus(selectedFocus)
    const questions = await generateSelfCareQuiz(selectedFocus)
    setQuiz(questions)
    setState('quizFlow')
  }

  const handleQuizSubmit = async (submittedAnswers: Record<string, string>) => {
    if (!focus) return
    setState('generatingPlan')
    setAnswers(submittedAnswers)
    try {
      const generatedPlan = await generateSelfCarePlan(submittedAnswers, focus)
      setPlan(generatedPlan)
      setState('plan')
    } catch (error) {
      console.error('Error generating plan:', error)
      toast({
        title: 'Ops, algo deu errado',
        description:
          'Não consegui gerar sua trilha agora. Por favor, tente novamente.',
        variant: 'destructive',
      })
      setState('error')
    }
  }

  const handleRefinePlan = async (feedback: string) => {
    if (!plan || !focus) return
    setState('refiningPlan')
    const refinedPlan = await refineSelfCarePlan(plan, feedback, answers, focus)
    setPlan(refinedPlan)
    setState('plan')
  }

  const handleElaboratePlan = async (elaboration: string) => {
    if (!plan || !focus) return
    setState('elaboratingPlan')
    const elaboratedPlan = await elaborateOnSelfCarePlan(
      plan,
      elaboration,
      answers,
      focus,
    )
    setPlan(elaboratedPlan)
    setState('plan')
  }

  const handleAcceptPlan = () => {
    toast({
      title: 'Que bom que gostou, filha!',
      description: 'Lembre-se, você pode sempre me contar mais se algo mudar.',
    })
  }

  const resetFlow = () => {
    setState('focusSelection')
    setQuiz([])
    setPlan(null)
    setAnswers({})
    setFocus(null)
  }

  const renderContent = () => {
    switch (state) {
      case 'loadingQuiz':
      case 'generatingPlan':
      case 'refiningPlan':
      case 'elaboratingPlan':
        return (
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
            <p className="text-muted-foreground">
              {state === 'loadingQuiz' && 'Preparando umas perguntas...'}
              {state === 'generatingPlan' &&
                'Criando uma trilha com carinho...'}
              {state === 'refiningPlan' && 'Ajustando o caminho...'}
              {state === 'elaboratingPlan' && 'Ouvindo com atenção...'}
            </p>
          </div>
        )
      case 'quizFlow':
        return (
          <SelfCareQuizFlow
            open={state === 'quizFlow'}
            onOpenChange={(open) => !open && resetFlow()}
            questions={quiz}
            onSubmit={handleQuizSubmit}
          />
        )
      case 'plan':
        return (
          plan &&
          focus && (
            <SelfCarePlan
              plan={plan}
              focus={focus}
              onRefine={handleRefinePlan}
              onAccept={handleAcceptPlan}
              onElaborate={handleElaboratePlan}
            />
          )
        )
      case 'error':
        return (
          <div className="text-center space-y-4">
            <p className="text-destructive">
              Ocorreu um erro ao gerar sua trilha.
            </p>
            <Button onClick={resetFlow}>Tentar Novamente</Button>
          </div>
        )
      case 'focusSelection':
      default:
        return (
          <Card className="w-full max-w-2xl mx-auto text-center">
            <CardHeader>
              <HeartHandshake className="h-16 w-16 mx-auto text-primary" />
              <CardTitle className="text-3xl font-bold">
                Vamos cuidar de você hoje?
              </CardTitle>
              <CardDescription className="max-w-xl mx-auto">
                Escolha um foco para a sua trilha de autocuidado. Com base na
                sua escolha, farei algumas perguntas para criar algo especial
                para você.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-3 gap-4">
              <Button
                size="lg"
                variant="outline"
                onClick={() => startQuiz('daily')}
              >
                Foco na Rotina Diária
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => startQuiz('weekly')}
              >
                Foco na Semana
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => startQuiz('monthly')}
              >
                Foco no Mês
              </Button>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      {renderContent()}
    </div>
  )
}

export default CarePage
