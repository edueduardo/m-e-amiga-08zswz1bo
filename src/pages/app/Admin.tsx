import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { runFeedbackAnalysis } from '@/services/feedbackAnalysis'
import { Loader2, BarChart } from 'lucide-react'

const AdminPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleRunAnalysis = async () => {
    setIsLoading(true)
    toast({
      title: 'Iniciando análise...',
      description:
        'Analisando o feedback do Homem Virtual. Isso pode levar um momento.',
    })

    const { success, error } = await runFeedbackAnalysis()

    if (success) {
      toast({
        title: 'Análise Concluída!',
        description:
          'Os resultados da análise de feedback foram salvos com sucesso.',
      })
    } else {
      toast({
        title: 'Erro na Análise',
        description: error?.message || 'Ocorreu um erro desconhecido.',
        variant: 'destructive',
      })
    }
    setIsLoading(false)
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
          <CardTitle>Análise de Feedback do Homem Virtual</CardTitle>
          <CardDescription>
            Execute uma análise em todo o feedback fornecido pelos usuários nas
            interações com o Homem Virtual. Os resultados serão salvos para
            refinamento do modelo de IA.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleRunAnalysis} disabled={isLoading}>
            {isLoading ? (
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
