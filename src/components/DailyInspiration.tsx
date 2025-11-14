import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw, Sparkles } from 'lucide-react'
import { getDailyInspiration } from '@/lib/data'
import { Affirmation } from '@/types'
import { Badge } from './ui/badge'

export const DailyInspiration = () => {
  const [inspiration, setInspiration] = useState<Affirmation | null>(null)

  const fetchInspiration = () => {
    setInspiration(getDailyInspiration())
  }

  useEffect(() => {
    fetchInspiration()
    // Simulates content refreshing every 12 hours by refreshing on component mount
  }, [])

  if (!inspiration) {
    return null
  }

  return (
    <Card className="bg-secondary/50 border-primary/20 animate-fade-in">
      <CardContent className="p-6 flex flex-col items-center text-center gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Sparkles className="h-4 w-4" />
          <span>Sua inspiração de hoje</span>
          {inspiration.type === 'hooponopono' && (
            <Badge variant="outline">Ho'oponopono</Badge>
          )}
        </div>
        <p className="text-xl md:text-2xl font-medium italic">
          "{inspiration.text}"
        </p>
        <Button variant="ghost" size="sm" onClick={fetchInspiration}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Nova inspiração
        </Button>
      </CardContent>
    </Card>
  )
}
