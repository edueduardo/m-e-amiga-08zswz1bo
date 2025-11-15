import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { HeartHandshake, Sparkles } from 'lucide-react'
import { generateSelfCareQuiz, SelfCareFocus } from '@/lib/motherAi'
import { QuizQuestion } from '@/types'
import { SelfCareQuizFlow } from '@/components/SelfCareQuizFlow'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAiResponse } from '@/contexts/AiResponseContext'
import { AiProcessingLoader } from '@/components/AiProcessingLoader'

const CarePage = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [quiz, setQuiz] = useState<QuizQuestion[]>([])
  const [focus, setFocus] = useState<SelfCareFocus | null>(null)
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false)
  const { generatePlan } = useAiResponse()

  const startQuiz = async (selectedFocus: SelfCareFocus) => {
    setIsLoadingQuiz(true)
    setFocus(selectedFocus)
    const questions = await generateSelfCareQuiz(selectedFocus)
    setQuiz(questions)
    setIsLoadingQuiz(false)
    setIsQuizOpen(true)
  }

  const handleQuizSubmit = (submittedAnswers: Record<string, string>) => {
    if (!focus) return
    setIsQuizOpen(false)
    generatePlan(submittedAnswers, focus)
  }

  if (isLoadingQuiz) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 animate-fade-in">
        <AiProcessingLoader maxTime={5} />
      </div>
    )
  }

  return (
    <>
      <div className="w-full max-w-3xl mx-auto text-center p-4 animate-fade-in">
        <HeartHandshake className="h-24 w-24 mx-auto text-primary animate-float" />
        <h1 className="text-4xl font-bold mt-6">Vamos cuidar de você hoje?</h1>
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
              <p className="text-muted-foreground text-sm">
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
              <p className="text-muted-foreground text-sm">
                Intenções para uma semana mais leve.
              </p>
            </CardContent>
            <CardContent>
              <Button className="w-full" onClick={() => startQuiz('weekly')}>
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
              <p className="text-muted-foreground text-sm">
                Um olhar mais amplo para o seu bem-estar.
              </p>
            </CardContent>
            <CardContent>
              <Button className="w-full" onClick={() => startQuiz('monthly')}>
                <Sparkles className="mr-2 h-4 w-4" />
                Começar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <SelfCareQuizFlow
        open={isQuizOpen}
        onOpenChange={setIsQuizOpen}
        questions={quiz}
        onSubmit={handleQuizSubmit}
      />
    </>
  )
}

export default CarePage
