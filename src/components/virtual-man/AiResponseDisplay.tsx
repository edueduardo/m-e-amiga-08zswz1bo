import { useState } from 'react'
import { VirtualManInteraction } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  AlertTriangle,
  MessageCircle,
  Users,
  Shield,
  Home,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { FeedbackButtons } from '../FeedbackButtons'
import { useVirtualMan } from '@/contexts/VirtualManContext'
import { Button } from '../ui/button'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface AiResponseDisplayProps {
  interaction: VirtualManInteraction
  isCollapsed?: boolean
}

const thematicCategories = [
  { key: 'communication', title: 'Comunicação', icon: MessageCircle },
  { key: 'social_behaviors', title: 'Comportamentos Sociais', icon: Users },
  {
    key: 'expectations_insecurities',
    title: 'Expectativas e Inseguranças',
    icon: Shield,
  },
  { key: 'family_situations', title: 'Situações Familiares', icon: Home },
]

export const AiResponseDisplay = ({
  interaction,
  isCollapsed = false,
}: AiResponseDisplayProps) => {
  const { updateFeedback } = useVirtualMan()
  const [collapsed, setCollapsed] = useState(isCollapsed)

  const handleFeedback = (
    id: string,
    feedback: { rating: 'helpful' | 'not_helpful' | null; comment?: string },
  ) => {
    if (feedback.rating) {
      updateFeedback(id, feedback.rating, feedback.comment)
    }
  }

  const response = interaction.ai_response

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Consulta sobre: "{interaction.user_query}"</CardTitle>
            <CardDescription>
              Perspectiva do {interaction.profile_selected} em{' '}
              {format(
                new Date(interaction.created_at),
                "dd/MM/yyyy 'às' HH:mm",
                {
                  locale: ptBR,
                },
              )}
            </CardDescription>
          </div>
          {isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronDown /> : <ChevronUp />}
            </Button>
          )}
        </div>
      </CardHeader>
      {!collapsed && (
        <>
          <CardContent className="space-y-6">
            <Alert
              variant="destructive"
              className="bg-yellow-50 border-yellow-200 text-yellow-800"
            >
              <AlertTriangle className="h-4 w-4 !text-yellow-800" />
              <AlertTitle>Importante</AlertTitle>
              <AlertDescription>{response.disclaimer}</AlertDescription>
            </Alert>

            <Accordion
              type="multiple"
              defaultValue={thematicCategories.map((c) => c.key)}
              className="w-full"
            >
              {thematicCategories.map(({ key, title, icon: Icon }) => (
                <AccordionItem value={key} key={key}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-semibold">{title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="prose dark:prose-invert max-w-none">
                    <p>{response[key as keyof typeof response] as string}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Dicas Práticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {response.practical_tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </CardContent>
          <CardFooter>
            <FeedbackButtons
              entryId={interaction.id}
              onFeedbackSubmit={(id, feedback) => handleFeedback(id, feedback)}
              initialFeedback={{
                rating: interaction.feedback_rating || null,
                comment: interaction.feedback_comment || '',
              }}
            />
          </CardFooter>
        </>
      )}
    </Card>
  )
}
