import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmotionalPattern } from '@/types'
import { Lightbulb } from 'lucide-react'

interface InsightCardProps {
  pattern: EmotionalPattern
}

export const InsightCard = ({ pattern }: InsightCardProps) => {
  return (
    <Card className="bg-secondary">
      <CardHeader className="flex flex-row items-start gap-4">
        <Lightbulb className="h-6 w-6 text-primary mt-1" />
        <div>
          <CardTitle>{pattern.title}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {pattern.description}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-background rounded-md border">
          <h4 className="font-semibold mb-2">Sugestão da Mãe Amiga:</h4>
          <p className="text-sm">{pattern.recommendation}</p>
        </div>
      </CardContent>
    </Card>
  )
}
