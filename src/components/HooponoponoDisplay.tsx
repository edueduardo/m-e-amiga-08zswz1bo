import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AidaTooltip } from './AidaTooltip'
import { getDailyHooponopono, getRandomHooponopono } from '@/lib/data'
import { HooponoponoPractice } from '@/types'

interface HooponoponoDisplayProps {
  variant: 'daily' | 'random'
}

export const HooponoponoDisplay = ({ variant }: HooponoponoDisplayProps) => {
  const [practice, setPractice] = useState<HooponoponoPractice | null>(null)

  useEffect(() => {
    if (variant === 'daily') {
      setPractice(getDailyHooponopono())
    } else {
      setPractice(getRandomHooponopono())
    }
  }, [variant])

  if (!practice) {
    return null
  }

  return (
    <Card className="bg-secondary/50 border-primary/20 animate-fade-in">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base">{practice.title}</CardTitle>
        <AidaTooltip story={practice.aidaStory} />
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-xl md:text-2xl font-medium italic text-primary">
          "{practice.phrase}"
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          {practice.explanation}
        </p>
      </CardContent>
    </Card>
  )
}
