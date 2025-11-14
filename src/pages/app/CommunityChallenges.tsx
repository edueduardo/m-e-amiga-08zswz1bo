import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { communityChallenges } from '@/lib/data'
import { Users2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const CommunityChallengesPage = () => {
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
        {communityChallenges.map((challenge) => {
          const progress = (challenge.currentProgress / challenge.goal) * 100
          const isCompleted = challenge.currentProgress >= challenge.goal
          return (
            <Card
              key={challenge.id}
              className={
                isCompleted ? 'bg-green-50 border-green-200' : 'bg-secondary/50'
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
                    {challenge.currentProgress.toLocaleString('pt-BR')} /{' '}
                    {challenge.goal.toLocaleString('pt-BR')} {challenge.unit}
                  </span>
                  <span>
                    {isCompleted ? 'Concluído!' : `${progress.toFixed(0)}%`}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-xs text-muted-foreground">
                <span>
                  Recompensa: {challenge.rewardPoints} pontos de experiência
                </span>
                <span>
                  Termina{' '}
                  {formatDistanceToNow(new Date(challenge.endDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default CommunityChallengesPage
