import { Link, useLocation } from 'react-router-dom'
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
  Bot,
  BrainCircuit,
  Flower2,
  UserRound,
  Shield,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ReactNode } from 'react'

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
  description: ReactNode
}

const navItems: NavItem[] = [
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
    href: '/app/virtual-man',
    label: 'Cabeça de Homem',
    icon: UserRound,
    description: (
      <div className="p-2 space-y-2 max-w-xs text-left">
        <p>
          <strong className="font-semibold text-primary">Atenção:</strong>{' '}
          Compreenda o que se passa na mente masculina de diferentes gerações.
        </p>
        <p>
          <strong className="font-semibold text-primary">Interesse:</strong>{' '}
          Selecione perfis como avô, marido ou filho e saiba como abordar
          assuntos delicados.
        </p>
        <p>
          <strong className="font-semibold text-primary">Desejo:</strong>{' '}
          Sinta-se mais preparada e confiante para conversas importantes.
        </p>
        <p>
          <strong className="font-semibold text-primary">Ação:</strong>{' '}
          Experimente agora essa novidade.
        </p>
      </div>
    ),
  },
  {
    href: '/app/coaching',
    label: 'Coaching com IA',
    icon: Bot,
    description: (
      <div className="p-2 space-y-2 max-w-xs text-left">
        <p>
          <strong className="font-semibold text-primary">Attention:</strong>{' '}
          Feel heard and understood at any time.
        </p>
        <p>
          <strong className="font-semibold text-primary">Interest:</strong> With
          AI-Guided Coaching Sessions, you have a personal coach available 24/7
          for deep conversations and practical exercises.
        </p>
        <p>
          <strong className="font-semibold text-primary">Desire:</strong>{' '}
          Discover clarity, find solutions to your challenges, and track your
          progress in a safe and confidential environment. It's like having
          constant support for your emotional well-being.
        </p>
        <p>
          <strong className="font-semibold text-primary">Action:</strong> Start
          your session and begin your self-discovery journey today!
        </p>
      </div>
    ),
  },
  {
    href: '/app/self-knowledge',
    label: 'Autoconhecimento',
    icon: BrainCircuit,
    description: (
      <div className="p-2 space-y-2 max-w-xs text-left">
        <p>
          <strong className="font-semibold text-primary">Attention:</strong>{' '}
          Unravel the secrets of your emotions.
        </p>
        <p>
          <strong className="font-semibold text-primary">Interest:</strong> The
          Self-Knowledge Journey with Emotional Pattern Analysis uses AI to
          analyze your interactions, notes, and mood, revealing unique emotional
          triggers and patterns.
        </p>
        <p>
          <strong className="font-semibold text-primary">Desire:</strong> Gain
          deep insights into yourself, understand what affects you, and receive
          personalized recommendations to cultivate lasting well-being.
          Transform how you relate to your emotions.
        </p>
        <p>
          <strong className="font-semibold text-primary">Action:</strong>{' '}
          Explore your emotional patterns and start building a more balanced
          life!
        </p>
      </div>
    ),
  },
  {
    href: '/app/care',
    label: 'Cuidar de mim',
    icon: HeartHandshake,
    description: (
      <div className="p-2 space-y-2 max-w-xs text-left">
        <p>
          <strong className="font-semibold text-primary">Attention:</strong>{' '}
          Learn and grow at your own pace, your way.
        </p>
        <p>
          <strong className="font-semibold text-primary">Interest:</strong>{' '}
          Adaptive AI-Generated Learning Paths create personalized
          'mini-workshops' for you, dynamically adjusting to your needs and
          learning style.
        </p>
        <p>
          <strong className="font-semibold text-primary">Desire:</strong>{' '}
          Receive relevant and effective content to overcome specific
          challenges, develop new skills, and deepen your knowledge on topics
          that truly matter to you. Your personal development has never been so
          personalized.
        </p>
        <p>
          <strong className="font-semibold text-primary">Action:</strong>{' '}
          Discover your learning path and boost your personal growth!
        </p>
      </div>
    ),
  },
  {
    href: '/app/journal',
    label: 'Diário Hoʻoponopono',
    icon: BookMarked,
    description: 'Pratique a limpeza de memórias e cultive a paz.',
  },
  {
    href: '/app/music',
    label: 'Músicas e Meditações',
    icon: Music,
    description:
      'Áudios, meditações e suas playlists para relaxar e encontrar a calma.',
  },
  {
    href: '/app/support-circle',
    label: 'Círculo de Apoio',
    icon: Users,
    description: (
      <div className="p-2 space-y-2 max-w-xs text-left">
        <p>
          <strong className="font-semibold text-primary">Attention:</strong>{' '}
          Connect and share in a community that understands you.
        </p>
        <p>
          <strong className="font-semibold text-primary">Interest:</strong> The
          enhanced Support Circle offers discussion rooms focused on specific
          themes, such as 'Mothers of Babies' or 'Relationship Challenges', with
          AI assisting in moderation.
        </p>
        <p>
          <strong className="font-semibold text-primary">Desire:</strong> Find
          support, share experiences, and build bonds with other mothers in a
          safe, welcoming, and constructive environment. Feel part of something
          bigger, where your voice is valued.
        </p>
        <p>
          <strong className="font-semibold text-primary">Action:</strong> Join a
          thematic room and find your tribe!
        </p>
      </div>
    ),
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
    href: '/app/growth-garden',
    label: 'Jardim do Crescimento',
    icon: Flower2,
    description: (
      <div className="p-2 space-y-2 max-w-xs text-left">
        <p>
          <strong className="font-semibold text-primary">Attention:</strong>{' '}
          Transform your self-care into a fun and rewarding journey.
        </p>
        <p>
          <strong className="font-semibold text-primary">Interest:</strong> With
          the 'Growth Garden', your goals and progress are visually represented
          by seeds that bloom and elements that grow as you advance in your
          well-being.
        </p>
        <p>
          <strong className="font-semibold text-primary">Desire:</strong> Stay
          motivated, celebrate your achievements, and watch your efforts bloom
          in a playful and rewarding way. Every step towards your well-being is
          a new flower in your garden!
        </p>
        <p>
          <strong className="font-semibold text-primary">Action:</strong>{' '}
          Cultivate your garden and watch your progress bloom!
        </p>
      </div>
    ),
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
    href: '/app/admin',
    label: 'Admin',
    icon: Shield,
    description: 'Painel de administração e análise de dados.',
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
                {typeof item.description === 'string' ? (
                  <p>{item.description}</p>
                ) : (
                  item.description
                )}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </div>
    </div>
  )
}
