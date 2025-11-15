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
          <strong className="font-semibold text-primary">Atenção:</strong>{' '}
          Sinta-se ouvida e compreendida a qualquer momento.
        </p>
        <p>
          <strong className="font-semibold text-primary">Interesse:</strong> Com
          as Sessões de Aconselhamento Guiadas por IA, você tem uma coach
          pessoal disponível 24/7 para conversas profundas e exercícios
          práticos.
        </p>
        <p>
          <strong className="font-semibold text-primary">Desejo:</strong>{' '}
          Descubra clareza, encontre soluções para seus desafios e acompanhe seu
          progresso em um ambiente seguro e confidencial. É como ter suporte
          constante para seu bem-estar emocional.
        </p>
        <p>
          <strong className="font-semibold text-primary">Ação:</strong> Comece
          sua sessão e inicie sua jornada de autodescoberta hoje mesmo!
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
          <strong className="font-semibold text-primary">Atenção:</strong>{' '}
          Desvende os segredos de suas emoções.
        </p>
        <p>
          <strong className="font-semibold text-primary">Interesse:</strong> A
          Jornada de Autoconhecimento com Análise de Padrões Emocionais usa IA
          para analisar suas interações, anotações e humor, revelando gatilhos e
          padrões emocionais únicos.
        </p>
        <p>
          <strong className="font-semibold text-primary">Desejo:</strong>{' '}
          Obtenha insights profundos sobre você, entenda o que te afeta e receba
          recomendações personalizadas para cultivar um bem-estar duradouro.
          Transforme como você se relaciona com suas emoções.
        </p>
        <p>
          <strong className="font-semibold text-primary">Ação:</strong> Explore
          seus padrões emocionais e comece a construir uma vida mais
          equilibrada!
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
          <strong className="font-semibold text-primary">Atenção:</strong>{' '}
          Aprenda e cresça no seu ritmo, do seu jeito.
        </p>
        <p>
          <strong className="font-semibold text-primary">Interesse:</strong> As
          Trilhas de Aprendizagem Adaptativas criam 'mini-workshops'
          personalizados para você, ajustando-se dinamicamente às suas
          necessidades e estilo de aprendizado.
        </p>
        <p>
          <strong className="font-semibold text-primary">Desejo:</strong> Receba
          conteúdo relevante e eficaz para superar desafios específicos,
          desenvolver novas habilidades e aprofundar seu conhecimento em tópicos
          que realmente importam para você. Seu desenvolvimento pessoal nunca
          foi tão personalizado.
        </p>
        <p>
          <strong className="font-semibold text-primary">Ação:</strong> Descubra
          sua trilha de aprendizado e impulsione seu crescimento pessoal!
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
          <strong className="font-semibold text-primary">Atenção:</strong>{' '}
          Conecte-se e compartilhe em uma comunidade que te entende.
        </p>
        <p>
          <strong className="font-semibold text-primary">Interesse:</strong> O
          Círculo de Apoio aprimorado oferece salas de discussão focadas em
          temas específicos, como 'Mães de Bebês' ou 'Desafios no
          Relacionamento', com a IA auxiliando na moderação.
        </p>
        <p>
          <strong className="font-semibold text-primary">Desejo:</strong>{' '}
          Encontre apoio, compartilhe experiências e crie laços com outras mães
          em um ambiente seguro, acolhedor e construtivo. Sinta-se parte de algo
          maior, onde sua voz é valorizada.
        </p>
        <p>
          <strong className="font-semibold text-primary">Ação:</strong>{' '}
          Participe de uma sala temática e encontre sua tribo!
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
          <strong className="font-semibold text-primary">Atenção:</strong>{' '}
          Transforme seu autocuidado em uma jornada divertida e gratificante.
        </p>
        <p>
          <strong className="font-semibold text-primary">Interesse:</strong> Com
          o 'Jardim do Crescimento', suas metas e progresso são visualmente
          representados por sementes que florescem e elementos que crescem à
          medida que você avança em seu bem-estar.
        </p>
        <p>
          <strong className="font-semibold text-primary">Desejo:</strong>{' '}
          Mantenha-se motivado, celebre suas conquistas e veja seus esforços
          florescerem de forma lúdica e recompensadora. Cada passo em direção ao
          seu bem-estar é uma nova flor em seu jardim!
        </p>
        <p>
          <strong className="font-semibold text-primary">Ação:</strong> Cultive
          seu jardim e veja seu progresso florescer!
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
