import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mic, HeartHandshake, Calendar } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const DashboardPage = () => {
  const { user, isSubscribed } = useAuth()

  return (
    <div className="space-y-6">
      {!isSubscribed && (
        <Alert variant="destructive">
          <AlertTitle>Assinatura Inativa</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>
              Sua assinatura não está ativa. Ative para ter acesso a todos os
              recursos.
            </span>
            <Button asChild>
              <Link to="/pricing">Ativar Assinatura</Link>
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="text-center md:text-left">
        <h1 className="text-2xl font-bold">Oi, filha. Vamos conversar hoje?</h1>
        <p className="text-muted-foreground">
          Escolha uma das opções abaixo para começar.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-primary/10 border-primary">
          <CardHeader>
            <CardTitle>Novo Desabafo</CardTitle>
            <CardDescription>
              Clique aqui para registrar como você está se sentindo agora.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" disabled={!isSubscribed}>
              <Link to="/app/diary">
                <Mic className="mr-2 h-5 w-5" />
                Gravar meu desabafo
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cuidar de mim hoje</CardTitle>
            <CardDescription>
              Explore trilhas de autocuidado para o seu bem-estar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link to="/app/care">
                <HeartHandshake className="mr-2 h-4 w-4" />
                Ver trilhas
                <ArrowRight className="ml-auto h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Como foi minha semana?</CardTitle>
            <CardDescription>
              Veja um resumo carinhoso da sua jornada emocional.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link to="/app/summary">
                <Calendar className="mr-2 h-4 w-4" />
                Ver resumo
                <ArrowRight className="ml-auto h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
