import { useState } from 'react'
import { CoachingExercise } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'

interface CoachingExerciseCardProps {
  exercise: CoachingExercise
}

export const CoachingExerciseCard = ({
  exercise,
}: CoachingExerciseCardProps) => {
  const [response, setResponse] = useState<string | number | undefined>(
    exercise.response,
  )
  const [isSubmitted, setIsSubmitted] = useState(!!exercise.response)

  const handleSubmit = () => {
    // In a real app, this would update the context/state
    console.log('Exercise response:', { id: exercise.id, response })
    setIsSubmitted(true)
  }

  const renderInput = () => {
    switch (exercise.type) {
      case 'multiple-choice':
        return (
          <RadioGroup
            value={response as string}
            onValueChange={(val) => setResponse(val)}
            disabled={isSubmitted}
          >
            {exercise.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option}
                  id={`${exercise.id}-${option}`}
                />
                <Label htmlFor={`${exercise.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )
      case 'text-input':
        return (
          <Textarea
            value={response as string}
            onChange={(e) => setResponse(e.target.value)}
            disabled={isSubmitted}
            placeholder="Sua resposta..."
          />
        )
      case 'rating':
        return (
          <div className="space-y-4">
            <Slider
              value={[(response as number) ?? 5]}
              onValueChange={(val) => setResponse(val[0])}
              max={10}
              step={1}
              disabled={isSubmitted}
            />
            <p className="text-center font-bold text-primary">
              {response ?? 5} / 10
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="mt-4 bg-background/50">
      <CardHeader>
        <CardTitle className="text-base">{exercise.prompt}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderInput()}
        {!isSubmitted && (
          <Button onClick={handleSubmit} className="w-full" size="sm">
            Enviar Resposta
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
