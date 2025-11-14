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
} from 'lucide-react'

const navItems = [
  { href: '/app', label: 'Início', icon: Home },
  { href: '/app/conversations', label: 'Conversas', icon: MessageSquare },
  { href: '/app/care', label: 'Cuidar de mim', icon: HeartHandshake },
  { href: '/app/meditations', label: 'Meditações', icon: Music },
  { href: '/app/support-circle', label: 'Círculo de Apoio', icon: Users },
  { href: '/app/courses', label: 'Cursos', icon: BookHeart },
  { href: '/app/planner', label: 'Meu Plano', icon: ListTodo },
  { href: '/app/challenges', label: 'Desafios', icon: Trophy },
  { href: '/app/library', label: 'Biblioteca', icon: Library },
  { href: '/app/summary', label: 'Resumo', icon: Calendar },
  { href: '/app/settings', label: 'Configurações', icon: Cog },
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
            <Button
              key={item.href}
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
          ))}
        </nav>
      </div>
    </div>
  )
}
