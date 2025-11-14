import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AidaIndicator } from './AidaIndicator'
import { AidaTooltip } from '../AidaTooltip'
import { getDailyHooponopono } from '@/lib/data'
import { HooponoponoPractice } from '@/types'
import { Sparkles } from 'lucide-react'

export const HooponoponoDesireSection = () => {
  const [practice, setPractice] = useState<HooponoponoPractice | null>(null)

  useEffect(() => {
    setPractice(getDailyHooponopono())
  }, [])

  if (!practice) {
    return null
  }

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <AidaIndicator principle="Desire" />
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Sparkles className="h-12 w-12 text-primary" />
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Imagine um caminho para a paz interior
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            O Ho'oponopono é uma prática ancestral de perdão e reconciliação. É
            uma ferramenta simples e poderosa para limpar memórias dolorosas e
            encontrar a calma que você deseja.
          </p>
        </div>
        <div className="mx-auto max-w-2xl">
          <Card className="border-primary bg-primary/5 animate-fade-in-up shadow-lg">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-xl">{practice.title}</CardTitle>
              <AidaTooltip story={practice.aidaStory} />
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-3xl font-semibold italic text-primary">
                "{practice.phrase}"
              </p>
              <p className="text-muted-foreground pt-2">
                {practice.explanation}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
