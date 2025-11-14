import { useEffect } from 'react'
import { useSelfKnowledge } from '@/contexts/SelfKnowledgeContext'
import { Button } from '@/components/ui/button'
import { Loader2, BrainCircuit, RefreshCw } from 'lucide-react'
import { EmotionOverTimeChart } from '@/components/self-knowledge/EmotionOverTimeChart'
import { EmotionDistributionPieChart } from '@/components/self-knowledge/EmotionDistributionPieChart'
import { InsightCard } from '@/components/self-knowledge/InsightCard'

const SelfKnowledgePage = () => {
  const { patterns, isLoading, fetchPatterns } = useSelfKnowledge()

  useEffect(() => {
    if (patterns.length === 0) {
      fetchPatterns()
    }
  }, [fetchPatterns, patterns.length])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <BrainCircuit className="h-16 w-16 text-primary animate-pulse" />
        <Loader2 className="h-8 w-8 my-4 animate-spin" />
        <h2 className="text-xl font-semibold">Analisando sua jornada...</h2>
        <p className="text-muted-foreground">
          Estou conectando os pontos para te trazer clareza.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold">
            Sua Jornada de Autoconhecimento
          </h1>
          <p className="text-muted-foreground mt-1">
            Padrões e reflexões baseados nos seus desabafos.
          </p>
        </div>
        <Button onClick={fetchPatterns} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Analisar Novamente
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {patterns
          .filter((p) => p.chartType === 'line')
          .map((pattern) => (
            <EmotionOverTimeChart key={pattern.id} pattern={pattern} />
          ))}
        {patterns
          .filter((p) => p.chartType === 'pie')
          .map((pattern) => (
            <EmotionDistributionPieChart key={pattern.id} pattern={pattern} />
          ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Reflexões para Você</h2>
        <div className="space-y-4">
          {patterns.map((pattern) => (
            <InsightCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SelfKnowledgePage
