import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import {
  runFeedbackAnalysis,
  getFeedbackAnalysisResults,
} from '@/services/feedbackAnalysis'
import { Loader2, BarChart, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Database } from '@/lib/supabase/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type AnalysisResult =
  Database['public']['Tables']['virtual_man_feedback_analysis']['Row']

const KeywordList = ({ keywords, title }: { keywords: any; title: string }) => {
  if (!keywords || Object.keys(keywords).length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nenhuma palavra-chave encontrada.
      </p>
    )
  }
  return (
    <div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <ul className="list-disc pl-5 text-sm space-y-1">
        {Object.entries(keywords)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .map(([word, count]) => (
            <li key={word}>
              {word}: <span className="font-bold">{count}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}

const AdminPage = () => {
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false)
  const [isFetchingResults, setIsFetchingResults] = useState(true)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(
    null,
  )
  const { toast } = useToast()

  useEffect(() => {
    const fetchResults = async () => {
      setIsFetchingResults(true)
      const data = await getFeedbackAnalysisResults()
      setAnalysisResults(data)
      setIsFetchingResults(false)
    }
    fetchResults()
  }, [])

  const handleRunAnalysis = async () => {
    setIsAnalysisRunning(true)
    toast({
      title: 'Iniciando análise...',
      description:
        'Analisando o feedback do Cabeça de Homem. Isso pode levar um momento.',
    })

    const { success, error } = await runFeedbackAnalysis()

    if (success) {
      toast({
        title: 'Análise Concluída!',
        description:
          'Os resultados da análise de feedback foram salvos. Atualizando painel...',
      })
      const data = await getFeedbackAnalysisResults()
      setAnalysisResults(data)
    } else {
      toast({
        title: 'Erro na Análise',
        description: error?.message || 'Ocorreu um erro desconhecido.',
        variant: 'destructive',
      })
    }
    setIsAnalysisRunning(false)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <p className="text-muted-foreground mt-1">
          Ferramentas para manutenção e análise do sistema.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Métricas do Cabeça de Homem</CardTitle>
          <CardDescription>
            Acompanhe o desempenho e o feedback da funcionalidade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isFetchingResults ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : analysisResults ? (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Última análise em:{' '}
                {format(
                  new Date(analysisResults.analysis_date),
                  "dd/MM/yyyy 'às' HH:mm",
                  { locale: ptBR },
                )}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Feedbacks Positivos
                    </CardTitle>
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analysisResults.positive_feedback_count}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Feedbacks Negativos
                    </CardTitle>
                    <ThumbsDown className="h-4 w-4 text-red-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analysisResults.negative_feedback_count}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <KeywordList
                  keywords={analysisResults.common_positive_keywords}
                  title="Palavras-chave Positivas"
                />
                <KeywordList
                  keywords={analysisResults.common_negative_keywords}
                  title="Palavras-chave Negativas"
                />
              </div>
            </div>
          ) : (
            <p>Nenhum resultado de análise encontrado.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Análise de Feedback do Cabeça de Homem</CardTitle>
          <CardDescription>
            Execute manualmente uma análise em todo o feedback fornecido pelos
            usuários. Isso também é executado automaticamente todo domingo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleRunAnalysis} disabled={isAnalysisRunning}>
            {isAnalysisRunning ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <BarChart className="mr-2 h-4 w-4" />
            )}
            Executar Análise de Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminPage
