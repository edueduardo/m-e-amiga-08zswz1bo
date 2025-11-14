import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { HeartHandshake, Sparkles, AlertTriangle } from 'lucide-react'
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
import { AiProcessingLoader } from '@/components/AiProcessingLoader'

type InteractionState =
  | 'focusSelection'
  | 'loadingQuiz'
  | 'quizFlow'
  | 'processingPlan'
  | 'plan'
  | 'error'

const CarePage = () => {
  const [state, setState] = useState<InteractionState>('focusSelection')
  const [quiz, setQuiz] = useState<QuizQuestion[]>([])
  const [plan, setPlan] = useState<SelfCarePlanType | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [focus, setFocus] = useState<SelfCareFocus | null>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [maxTime, setMaxTime] = useState(60)
  const { toast } = useToast()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleAiInteraction = async (
    aiFunction: () => Promise<SelfCarePlanType>,
  ) => {
    setState('processingPlan')

    const complexity = JSON.stringify(answers).length
    const estimatedTime = Math.max(
      10,
      Math.min(60, Math.round(complexity / 20)),
    )
    setMaxTime(estimatedTime)

    timeoutRef.current = setTimeout(() => {
      setErrorMessage(
        'A Mãe Amiga está demorando um pouco mais que o normal para responder. Por favor, tente novamente em alguns instantes.',
      )
      setState('error')
    }, 15000)

    try {
      const result = await aiFunction()
      clearTimeout(timeoutRef.current!)
      setPlan(result)
      setState('plan')
    } catch (error) {
      clearTimeout(timeoutRef.current!)
      console.error('AI Interaction Error:', error)
      setErrorMessage(
        'Ops, parece que houve uma falha no sistema. Não consegui gerar sua trilha agora. Por favor, tente novamente.',
      )
      setState('error')
    }
  }

  const startQuiz = async (selectedFocus: SelfCareFocus) => {
    setState('loadingQuiz')
    setFocus(selectedFocus)
    const questions = await generateSelfCareQuiz(selectedFocus)
    setQuiz(questions)
    setState('quizFlow')
  }

  const handleQuizSubmit = async (submittedAnswers: Record<string, string>) => {
    if (!focus) return
    setAnswers(submittedAnswers)
    await handleAiInteraction(() =>
      generateSelfCarePlan(submittedAnswers, focus),
    )
  }

  const handleRefinePlan = async (feedback: string) => {
    if (!plan || !focus) return
    await handleAiInteraction(() =>
      refineSelfCarePlan(plan, feedback, answers, focus),
    )
  }

  const handleElaboratePlan = async (elaboration: string) => {
    if (!plan || !focus) return
    await handleAiInteraction(() =>
      elaborateOnSelfCarePlan(plan, elaboration, answers, focus),
    )
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
    setErrorMessage('')
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const renderContent = () => {
    switch (state) {
      case 'loadingQuiz':
        return <AiProcessingLoader maxTime={5} />
      case 'processingPlan':
        return <AiProcessingLoader maxTime={maxTime} />
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
          <div className="text-center space-y-6 p-8 max-w-lg mx-auto">
            <AlertTriangle className="h-16 w-16 mx-auto text-destructive" />
            <h2 className="text-2xl font-bold">Ocorreu um problema</h2>
            <p className="text-muted-foreground">{errorMessage}</p>
            <Button onClick={resetFlow}>Tentar Novamente</Button>
          </div>
        )
      case 'focusSelection':
      default:
        return (
          <div className="w-full max-w-3xl mx-auto text-center p-4">
            <HeartHandshake className="h-24 w-24 mx-auto text-primary animate-float" />
            <h1 className="text-4xl font-bold mt-6">
              Vamos cuidar de você hoje?
            </h1>
            <p className="max-w-xl mx-auto text-muted-foreground mt-4 text-lg">
              Escolha um foco para a sua trilha de autocuidado. Com base na sua
              escolha, farei algumas perguntas para criar algo especial, só para
              você.
            </p>
            <div className="mt-10 grid sm:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg hover:-translate-y-1 transition-transform">
                <CardHeader>
                  <CardTitle>Rotina Diária</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Pequenos rituais para o seu dia a dia.
                  </p>
                </CardContent>
                <CardContent>
                  <Button className="w-full" onClick={() => startQuiz('daily')}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Começar
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg hover:-translate-y-1 transition-transform">
                <CardHeader>
                  <CardTitle>Foco na Semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Intenções para uma semana mais leve.
                  </p>
                </CardContent>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => startQuiz('weekly')}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Começar
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg hover:-translate-y-1 transition-transform">
                <CardHeader>
                  <CardTitle>Foco no Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Um olhar mais amplo para o seu bem-estar.
                  </p>
                </CardContent>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => startQuiz('monthly')}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Começar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 animate-fade-in">
      {renderContent()}
    </div>
  )
}

export default CarePage
