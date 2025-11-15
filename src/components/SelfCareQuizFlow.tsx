import { useState, useEffect } from 'react'
import { QuizQuestion } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { RorschachTest } from './RorschachTest'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SelfCareQuizFlowProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  questions: QuizQuestion[]
  onSubmit: (answers: Record<string, string>) => void
}

export const SelfCareQuizFlow = ({
  open,
  onOpenChange,
  questions,
  onSubmit,
}: SelfCareQuizFlowProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    if (open) {
      setCurrentQuestionIndex(0)
      setAnswers({})
    }
  }, [open, questions])

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const isFirstQuestion = currentQuestionIndex === 0

  const goToNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const goToPrev = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    onSubmit(answers)
    onOpenChange(false)
  }

  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100

  if (!currentQuestion) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Um momento para você</DialogTitle>
          <DialogDescription>
            Responda com calma. Estou aqui para te ouvir.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <Progress value={progressValue} className="w-full" />
          <div key={currentQuestion.id} className="space-y-4 min-h-[300px]">
            {currentQuestion.type === 'multiple-choice' && (
              <>
                <Label className="text-lg text-center block">
                  {currentQuestion.question}
                </Label>
                <RadioGroup
                  value={answers[currentQuestion.id] || ''}
                  onValueChange={(value) =>
                    handleAnswerChange(currentQuestion.id, value)
                  }
                  className="space-y-2"
                >
                  {currentQuestion.options?.map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-2 p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary"
                    >
                      <RadioGroupItem
                        value={option}
                        id={`${currentQuestion.id}-${option}`}
                      />
                      <Label
                        htmlFor={`${currentQuestion.id}-${option}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </>
            )}
            {currentQuestion.type === 'text' && (
              <>
                <Label className="text-lg text-center block">
                  {currentQuestion.question}
                </Label>
                <Textarea
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) =>
                    handleAnswerChange(currentQuestion.id, e.target.value)
                  }
                  placeholder="Sinta-se à vontade para escrever..."
                  rows={8}
                />
              </>
            )}
            {currentQuestion.type === 'rorschach' &&
              currentQuestion.imageUrl && (
                <RorschachTest
                  question={currentQuestion.question}
                  imageUrl={currentQuestion.imageUrl}
                  value={answers[currentQuestion.id] || ''}
                  onChange={(value) =>
                    handleAnswerChange(currentQuestion.id, value)
                  }
                />
              )}
          </div>
        </div>
        <DialogFooter className="flex justify-between w-full">
          <Button
            variant="outline"
            onClick={goToPrev}
            disabled={isFirstQuestion}
          >
            <ChevronLeft className="h-4 w-4 mr-2" /> Anterior
          </Button>
          {isLastQuestion ? (
            <Button
              onClick={handleSubmit}
              disabled={!answers[currentQuestion.id]}
            >
              Ver minha trilha de cuidado
            </Button>
          ) : (
            <Button onClick={goToNext} disabled={!answers[currentQuestion.id]}>
              Próximo <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
