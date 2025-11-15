import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Users2, Loader2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getCommunityChallenges } from '@/services/challenges'
import { Challenge } from '@/types'

const CommunityChallengesPage = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true)
      const data = await getCommunityChallenges()
      setChallenges(data)
      setIsLoading(false)
    }
    fetchChallenges()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Users2 className="h-16 w-16 mx-auto text-primary animate-float" />
        <h1 className="text-3xl font-bold tracking-tight mt-4">
          Desafios da Comunidade
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Vamos juntas alcançar objetivos de bem-estar. Cada pequena ação sua
          contribui para o todo!
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {challenges.map((challenge) => {
          // Mocking progress for demonstration as it's not in the DB schema
          const goal = (challenge.duration_days || 7) * 100
          const currentProgress = Math.floor(Math.random() * goal)
          const progress = (currentProgress / goal) * 100
          const isCompleted = currentProgress >= goal

          return (
            <Card
              key={challenge.id}
              className={
                isCompleted ? 'bg-accent/10 border-accent' : 'bg-background'
              }
            >
              <CardHeader>
                <CardTitle>{challenge.title}</CardTitle>
                <CardDescription>{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progress} className="w-full" />
                <div className="flex justify-between text-sm font-medium">
                  <span>
                    {currentProgress.toLocaleString('pt-BR')} /{' '}
                    {goal.toLocaleString('pt-BR')} Ações
                  </span>
                  <span>
                    {isCompleted ? 'Concluído!' : `${progress.toFixed(0)}%`}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-xs text-muted-foreground">
                <span>Recompensa: 150 pontos de experiência</span>
                {challenge.end_date && (
                  <span>
                    Termina{' '}
                    {formatDistanceToNow(new Date(challenge.end_date), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </span>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default CommunityChallengesPage
