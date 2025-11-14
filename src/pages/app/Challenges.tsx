import { useState, useEffect } from 'react'
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
import { Lightbulb, Trophy, Loader2 } from 'lucide-react'
import { Challenge, ChallengeStep } from '@/types'
import { Label } from '@/components/ui/label'
import { useChallenges } from '@/contexts/ChallengesContext'
import { getChallenges } from '@/services/challenges'

const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const { updateStepCompletion } = useChallenges()
  const [localChallenge, setLocalChallenge] = useState(challenge)

  useEffect(() => {
    // Mocking steps as they are not in the DB
    if (!localChallenge.steps) {
      setLocalChallenge((prev) => ({
        ...prev,
        steps: Array.from({ length: prev.duration_days || 3 }, (_, i) => ({
          id: `step-${i + 1}`,
          description: `Dia ${i + 1}`,
          is_completed: false,
        })),
        personalized_tip:
          'Lembre-se, o progresso é mais importante que a perfeição. Um pequeno passo a cada dia faz uma grande diferença.',
      }))
    }
  }, [localChallenge])

  const handleStepToggle = (stepId: string) => {
    // This context update is now mocked on the frontend
    // In a real app, you'd sync this with the backend
    setLocalChallenge((prev) => {
      const updatedSteps =
        prev.steps?.map((step) =>
          step.id === stepId
            ? { ...step, is_completed: !step.is_completed }
            : step,
        ) || []
      return { ...prev, steps: updatedSteps }
    })
    // updateStepCompletion(challenge.id, stepId); // This would be the ideal call
  }

  const completedSteps =
    localChallenge.steps?.filter((step) => step.is_completed).length || 0
  const totalSteps = localChallenge.steps?.length || 1
  const progress = (completedSteps / totalSteps) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>{localChallenge.title}</CardTitle>
        <CardDescription>{localChallenge.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {localChallenge.steps?.map((step: ChallengeStep) => (
            <div
              key={step.id}
              className="flex items-center space-x-3 p-3 bg-secondary/50 rounded-md"
            >
              <Checkbox
                id={`${localChallenge.id}-${step.id}`}
                checked={step.is_completed}
                onCheckedChange={() => handleStepToggle(step.id)}
              />
              <Label
                htmlFor={`${localChallenge.id}-${step.id}`}
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
          <AlertDescription>{localChallenge.personalized_tip}</AlertDescription>
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
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true)
      const data = await getChallenges()
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
