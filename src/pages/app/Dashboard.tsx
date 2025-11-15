import { useState } from 'react'
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
  Bot,
  BrainCircuit,
  BookMarked,
  Music,
  ListTodo,
  Trophy,
  Users2,
  Flower2,
  Library,
  Award,
  Cog,
  Loader2,
  LayoutDashboard,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { HooponoponoDisplay } from '@/components/HooponoponoDisplay'
import { useLayout } from '@/contexts/LayoutContext'
import { HomePageCustomizer } from '@/components/HomePageCustomizer'

const featuresMap = new Map([
  [
    'care',
    {
      title: 'Cuidar de mim hoje',
      description:
        'Explore trilhas de autocuidado personalizadas para o seu bem-estar e descubra novas formas de se nutrir.',
      link: '/app/care',
      icon: HeartHandshake,
      className:
        'bg-accent/10 dark:bg-accent/20 border-accent/20 dark:border-accent/30',
      iconClassName: 'text-accent',
    },
  ],
  [
    'coaching',
    {
      title: 'Coaching com IA',
      description:
        'Inicie uma sessão de coaching guiada para ganhar clareza, superar desafios e traçar novos caminhos.',
      link: '/app/coaching',
      icon: Bot,
      className:
        'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      iconClassName: 'text-blue-500',
    },
  ],
  [
    'self-knowledge',
    {
      title: 'Autoconhecimento',
      description:
        'Analise seus padrões emocionais, entenda seus gatilhos e receba insights valiosos para sua jornada.',
      link: '/app/self-knowledge',
      icon: BrainCircuit,
      className:
        'bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800',
      iconClassName: 'text-sky-500',
    },
  ],
  [
    'journal',
    {
      title: 'Diário Hoʻoponopono',
      description:
        'Pratique a limpeza de memórias, o perdão e a gratidão para cultivar uma paz interior profunda e duradoura.',
      link: '/app/journal',
      icon: BookMarked,
      className:
        'bg-primary/10 dark:bg-primary/20 border-primary/20 dark:border-primary/30',
      iconClassName: 'text-primary',
    },
  ],
  [
    'music',
    {
      title: 'Músicas e Meditações',
      description:
        'Crie suas playlists, ouça áudios guiados e encontre a trilha sonora perfeita para relaxar e se reconectar.',
      link: '/app/music',
      icon: Music,
      className:
        'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
      iconClassName: 'text-teal-500',
    },
  ],
  [
    'support-circle',
    {
      title: 'Círculo de Apoio',
      description:
        'Conecte-se com outras mulheres em um ambiente seguro e anônimo. Compartilhe, ouça e encontre apoio.',
      link: '/app/support-circle',
      icon: Users,
      className:
        'bg-secondary dark:bg-secondary/20 border-secondary-foreground/20 dark:border-secondary-foreground/30',
      iconClassName: 'text-secondary-foreground',
    },
  ],
  [
    'courses',
    {
      title: 'Minicursos',
      description:
        'Aprenda habilidades práticas com lições curtas e diretas sobre comunicação, autoestima e muito mais.',
      link: '/app/courses',
      icon: BookHeart,
      className:
        'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      iconClassName: 'text-purple-500',
    },
  ],
  [
    'planner',
    {
      title: 'Meu Plano',
      description:
        'Organize suas tarefas de autocuidado, defina intenções e acompanhe seu progresso de forma visual.',
      link: '/app/planner',
      icon: ListTodo,
      className:
        'bg-lime-50 dark:bg-lime-900/20 border-lime-200 dark:border-lime-800',
      iconClassName: 'text-lime-500',
    },
  ],
  [
    'challenges',
    {
      title: 'Desafios',
      description:
        'Participe de pequenos desafios semanais para cultivar hábitos positivos e fortalecer seu bem-estar.',
      link: '/app/challenges',
      icon: Trophy,
      className:
        'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
      iconClassName: 'text-amber-500',
    },
  ],
  [
    'community-challenges',
    {
      title: 'Desafios da Comunidade',
      description:
        'Una-se a outras mulheres em desafios coletivos e vejam o poder da colaboração para o bem-estar.',
      link: '/app/community-challenges',
      icon: Users2,
      className:
        'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800',
      iconClassName: 'text-cyan-500',
    },
  ],
  [
    'growth-garden',
    {
      title: 'Jardim do Crescimento',
      description:
        'Defina seus objetivos de autocuidado e veja-os florescer literalmente em seu jardim digital personalizado.',
      link: '/app/growth-garden',
      icon: Flower2,
      className:
        'bg-accent/10 dark:bg-accent/20 border-accent/20 dark:border-accent/30',
      iconClassName: 'text-accent',
    },
  ],
  [
    'library',
    {
      title: 'Biblioteca',
      description:
        'Explore uma curadoria de livros, vídeos e artigos selecionados para aprofundar seu conhecimento.',
      link: '/app/library',
      icon: Library,
      className:
        'bg-stone-50 dark:bg-stone-900/20 border-stone-200 dark:border-stone-800',
      iconClassName: 'text-stone-500',
    },
  ],
  [
    'summary',
    {
      title: 'Como foi minha semana?',
      description:
        'Receba um resumo carinhoso da sua jornada emocional, celebrando seu progresso e autoconhecimento.',
      link: '/app/summary',
      icon: Calendar,
      className:
        'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
      iconClassName: 'text-orange-500',
    },
  ],
  [
    'profile',
    {
      title: 'Minha Jornada',
      description:
        'Acompanhe seu progresso, veja suas conquistas, suba de nível e colecione medalhas de autocuidado.',
      link: '/app/profile',
      icon: Award,
      className:
        'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      iconClassName: 'text-yellow-500',
    },
  ],
  [
    'settings',
    {
      title: 'Configurações',
      description:
        'Gerencie sua conta, personalize sua experiência, ajuste a segurança e controle seus dados.',
      link: '/app/settings',
      icon: Cog,
      className:
        'bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800',
      iconClassName: 'text-slate-500',
    },
  ],
])

const DashboardPage = () => {
  const { isSubscribed } = useAuth()
  const { layout, isLoading } = useLayout()
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  const visibleCards = layout
    .filter((item) => item.visible)
    .map((item) => featuresMap.get(item.id))
    .filter(Boolean)

  return (
    <>
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

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">
              Oi, filha. Como você está se sentindo?
            </h1>
            <p className="text-muted-foreground mt-2">
              Lembre-se de ser gentil consigo mesma hoje.
            </p>
          </div>
          <Button variant="outline" onClick={() => setIsCustomizerOpen(true)}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Personalizar Página Inicial
          </Button>
        </div>

        <HooponoponoDisplay variant="daily" />

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleCards.map((feature, index) => {
            if (!feature) return null
            const Icon = feature.icon
            return (
              <Card
                key={feature.link}
                className={cn(
                  'flex flex-col transition-transform transform hover:-translate-y-1 hover:shadow-xl animate-fade-in-up',
                  feature.className,
                )}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <CardHeader className="flex-grow">
                  <Icon
                    className={cn('h-10 w-10 mb-4', feature.iconClassName)}
                  />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={feature.link}>
                      Acessar
                      <ArrowRight className="ml-auto h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
      <HomePageCustomizer
        open={isCustomizerOpen}
        onOpenChange={setIsCustomizerOpen}
      />
    </>
  )
}

export default DashboardPage

