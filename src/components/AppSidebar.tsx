import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  BookHeart,
  Calendar,
  Cog,
  HeartHandshake,
  Home,
  Library,
  ListTodo,
  MessageSquare,
  Music,
  Trophy,
  Users,
  Award,
  BookMarked,
  Users2,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const navItems = [
  {
    href: '/app',
    label: 'Início',
    icon: Home,
    description: 'Sua página inicial com um resumo de tudo.',
  },
  {
    href: '/app/conversations',
    label: 'Conversas',
    icon: MessageSquare,
    description: 'Seu diário de voz. Desabafe e receba acolhimento.',
  },
  {
    href: '/app/care',
    label: 'Cuidar de mim',
    icon: HeartHandshake,
    description: 'Crie trilhas de autocuidado personalizadas para você.',
  },
  {
    href: '/app/journal',
    label: 'Diário Hoʻoponopono',
    icon: BookMarked,
    description: 'Pratique a limpeza de memórias e cultive a paz.',
  },
  {
    href: '/app/meditations',
    label: 'Meditações',
    icon: Music,
    description: 'Áudios para relaxar, focar e encontrar a calma.',
  },
  {
    href: '/app/support-circle',
    label: 'Círculo de Apoio',
    icon: Users,
    description: 'Conecte-se com outras mulheres em um espaço seguro.',
  },
  {
    href: '/app/courses',
    label: 'Cursos',
    icon: BookHeart,
    description: 'Minicursos práticos para o seu dia a dia.',
  },
  {
    href: '/app/planner',
    label: 'Meu Plano',
    icon: ListTodo,
    description: 'Organize suas tarefas de autocuidado e intenções.',
  },
  {
    href: '/app/challenges',
    label: 'Desafios',
    icon: Trophy,
    description: 'Pequenos desafios semanais para seu bem-estar.',
  },
  {
    href: '/app/community-challenges',
    label: 'Desafios da Comunidade',
    icon: Users2,
    description: 'Junte-se a outras mulheres em desafios coletivos.',
  },
  {
    href: '/app/library',
    label: 'Biblioteca',
    icon: Library,
    description: 'Recursos selecionados para seu crescimento.',
  },
  {
    href: '/app/summary',
    label: 'Resumo',
    icon: Calendar,
    description: 'Veja um resumo carinhoso da sua jornada semanal.',
  },
  {
    href: '/app/profile',
    label: 'Minha Jornada',
    icon: Award,
    description: 'Veja seu progresso e suas conquistas.',
  },
  {
    href: '/app/settings',
    label: 'Configurações',
    icon: Cog,
    description: 'Gerencie sua conta, segurança e dados.',
  },
]

export const AppSidebar = () => {
  const location = useLocation()

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-16 items-center border-b px-4 lg:px-6">
        <Link to="/app" className="flex items-center gap-2 font-semibold">
          <span className="">Mãe Amiga</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant={
                    location.pathname.startsWith(item.href) &&
                    (item.href !== '/app' || location.pathname === '/app')
                      ? 'default'
                      : 'ghost'
                  }
                  className="justify-start gap-3"
                >
                  <Link to={item.href}>
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </div>
    </div>
  )
}
