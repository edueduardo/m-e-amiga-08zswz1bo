import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Mic,
  HeartHandshake,
  Calendar,
  Users,
  BookHeart,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { DailyAffirmation } from '@/components/DailyAffirmation'

const DashboardPage = () => {
  const { isSubscribed } = useAuth()

  const features = [
    {
      title: 'Cuidar de mim hoje',
      description: 'Explore trilhas de autocuidado para o seu bem-estar.',
      link: '/app/care',
      icon: HeartHandshake,
      className:
        'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      iconClassName: 'text-green-500',
    },
    {
      title: 'Círculo de Apoio',
      description: 'Conecte-se com outras mulheres de forma anônima.',
      link: '/app/support-circle',
      icon: Users,
      className:
        'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      iconClassName: 'text-blue-500',
    },
    {
      title: 'Minicursos',
      description: 'Aprenda habilidades práticas para o seu dia a dia.',
      link: '/app/courses',
      icon: BookHeart,
      className:
        'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      iconClassName: 'text-purple-500',
    },
    {
      title: 'Como foi minha semana?',
      description: 'Veja um resumo carinhoso da sua jornada emocional.',
      link: '/app/summary',
      icon: Calendar,
      className:
        'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
      iconClassName: 'text-orange-500',
    },
  ]

  return (
    <div className="space-y-8">
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
        <h1 className="text-3xl font-bold tracking-tight">
          Oi, filha. Como você está se sentindo?
        </h1>
        <p className="text-muted-foreground mt-2">
          Lembre-se de ser gentil consigo mesma hoje.
        </p>
      </div>

      <DailyAffirmation />

      <Card className="bg-primary/10 border-primary shadow-lg animate-fade-in-up">
        <CardHeader className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="bg-primary/20 p-4 rounded-full">
            <Mic className="h-8 w-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Novo Desabafo</CardTitle>
            <CardDescription>
              Clique aqui para registrar como você está se sentindo agora.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex justify-center md:justify-start md:pl-24">
          <Button asChild size="lg" disabled={!isSubscribed}>
            <Link to="/app/conversations">
              Gravar meu desabafo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <Card
            key={feature.link}
            className={cn(
              'flex flex-col transition-transform transform hover:-translate-y-1 hover:shadow-xl animate-fade-in-up',
              feature.className,
            )}
            style={{ animationDelay: `${(index + 1) * 100}ms` }}
          >
            <CardHeader className="flex-grow">
              <feature.icon
                className={cn('h-10 w-10 mb-4', feature.iconClassName)}
              />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to={feature.link}>
                  Começar
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
