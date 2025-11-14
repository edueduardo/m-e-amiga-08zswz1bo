import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw, Sparkles } from 'lucide-react'
import { getDailyAffirmation } from '@/lib/data'
import { Affirmation } from '@/types'

export const DailyAffirmation = () => {
  const [affirmation, setAffirmation] = useState<Affirmation | null>(null)

  const fetchAffirmation = () => {
    setAffirmation(getDailyAffirmation())
  }

  useEffect(() => {
    fetchAffirmation()
    // Mocking 12-hour refresh with a new affirmation on each component mount
  }, [])

  if (!affirmation) {
    return null
  }

  return (
    <Card className="bg-secondary/50 border-primary/20 animate-fade-in">
      <CardContent className="p-6 flex flex-col items-center text-center gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Sparkles className="h-4 w-4" />
          <span>Sua afirmação de hoje</span>
        </div>
        <p className="text-xl md:text-2xl font-medium italic">
          "{affirmation.text}"
        </p>
        <Button variant="ghost" size="sm" onClick={fetchAffirmation}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Nova afirmação
        </Button>
      </CardContent>
    </Card>
  )
}
