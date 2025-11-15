import { useState } from 'react'
import { SelfCarePlan as SelfCarePlanType } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquareQuote,
  AlertTriangle,
} from 'lucide-react'
import { SelfCareFocus } from '@/lib/motherAi'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

interface SelfCarePlanProps {
  plan: SelfCarePlanType
  focus: SelfCareFocus
  onRefine: (feedback: string) => void
  onAccept: () => void
  onElaborate: (elaboration: string) => void
}

const toneMap: Record<SelfCarePlanType['tone'], string> = {
  amoras: 'Tom: Amoroso',
  'reais duros': 'Tom: Realista',
  impactantes: 'Tom: Impactante',
}

const focusTitleMap: Record<SelfCareFocus, string> = {
  daily: 'Foco Diário',
  weekly: 'Foco Semanal',
  monthly: 'Foco Mensal',
}

export const SelfCarePlan = ({
  plan,
  focus,
  onRefine,
  onAccept,
  onElaborate,
}: SelfCarePlanProps) => {
  const [isRefining, setIsRefining] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [elaboration, setElaboration] = useState('')

  const handleReject = () => setIsRefining(true)
  const handleConfront = () => {
    if (feedback.trim()) {
      onRefine(feedback)
      setIsRefining(false)
      setFeedback('')
    }
  }
  const handleElaborate = () => {
    if (elaboration.trim()) {
      onElaborate(elaboration)
      setElaboration('')
    }
  }

  const currentFocusData = plan[`${focus}Focus`]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Sua Trilha de Autocuidado</h2>
        <p className="text-muted-foreground">
          Um caminho sugerido, com carinho, para você.
        </p>
        <Badge variant="secondary" className="mt-2">
          {toneMap[plan.tone]}
        </Badge>
      </div>

      {plan.professional_help_suggestion && (
        <Alert className="bg-yellow-100 border-yellow-300 text-yellow-800">
          <AlertTriangle className="h-4 w-4 !text-yellow-800" />
          <AlertTitle>Uma observação importante</AlertTitle>
          <AlertDescription>
            {plan.professional_help_suggestion}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{focusTitleMap[focus]}</CardTitle>
          <CardDescription>{currentFocusData.title}</CardDescription>
        </CardHeader>
        <CardContent>{currentFocusData.description}</CardContent>
      </Card>

      {isRefining ? (
        <Card className="bg-secondary">
          <CardHeader>
            <CardTitle>O que podemos ajustar?</CardTitle>
            <CardDescription>
              Sua opinião é o mais importante. O que você gostaria de mudar?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Ex: 'Gostaria de algo mais prático...'"
              rows={4}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsRefining(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfront}>
              <MessageSquareQuote className="mr-2 h-4 w-4" />
              Confrontar a IA
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="flex justify-center gap-4 pt-4">
          <Button variant="outline" onClick={handleReject}>
            <ThumbsDown className="mr-2 h-4 w-4" />
            Não é bem isso
          </Button>
          <Button onClick={onAccept}>
            <ThumbsUp className="mr-2 h-4 w-4" />É isso que eu preciso
          </Button>
        </div>
      )}

      <Card className="mt-6 bg-secondary">
        <CardHeader>
          <CardTitle>Tem mais alguma coisa?</CardTitle>
          <CardDescription>
            Se quiser, pode me contar mais sobre o que está sentindo a partir
            dessa trilha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={elaboration}
            onChange={(e) => setElaboration(e.target.value)}
            placeholder="Sinta-se à vontade para desabafar mais um pouco..."
            rows={4}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleElaborate} disabled={!elaboration.trim()}>
            <MessageSquareQuote className="mr-2 h-4 w-4" />
            Enviar e refinar trilha
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

