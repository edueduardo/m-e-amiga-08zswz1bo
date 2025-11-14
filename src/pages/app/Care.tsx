import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, HeartHandshake, Sparkles } from 'lucide-react'
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
          <div className="text-center space-y-4 p-8">
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
            <p className="text-muted-foreground text-lg">
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
          <div className="text-center space-y-4 p-8">
            <p className="text-destructive text-lg">
              Ocorreu um erro ao gerar sua trilha.
            </p>
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
