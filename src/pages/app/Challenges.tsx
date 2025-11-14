import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Lightbulb, Trophy } from 'lucide-react'
import { Challenge, ChallengeStep } from '@/types'
import { Label } from '@/components/ui/label'
import { useChallenges } from '@/contexts/ChallengesContext'

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const { updateStepCompletion } = useChallenges()

  const handleStepToggle = (stepId: string) => {
    updateStepCompletion(challenge.id, stepId)
  }

  const completedSteps = challenge.steps.filter(
    (step) => step.is_completed,
  ).length
  const progress = (completedSteps / challenge.steps.length) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>{challenge.title}</CardTitle>
        <CardDescription>{challenge.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {challenge.steps.map((step: ChallengeStep) => (
            <div
              key={step.id}
              className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-md"
            >
              <Checkbox
                id={`${challenge.id}-${step.id}`}
                checked={step.is_completed}
                onCheckedChange={() => handleStepToggle(step.id)}
              />
              <Label
                htmlFor={`${challenge.id}-${step.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {step.description}
              </Label>
            </div>
          ))}
        </div>
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Dica da Mãe Amiga</AlertTitle>
          <AlertDescription>{challenge.personalized_tip}</AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2">
        <Label className="text-sm">Progresso</Label>
        <Progress value={progress} className="w-full" />
      </CardFooter>
    </Card>
  )
}

const ChallengesPage = () => {
  const { challenges } = useChallenges()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Trophy className="h-16 w-16 mx-auto text-primary animate-float" />
        <h1 className="text-3xl font-bold tracking-tight mt-4">
          Desafios da Semana
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Pequenos desafios interativos para te incentivar no seu
          desenvolvimento pessoal.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  )
}

export default ChallengesPage
