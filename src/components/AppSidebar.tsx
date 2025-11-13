import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  BookHeart,
  Calendar,
  Cog,
  HeartHandshake,
  Home,
  NotebookText,
} from 'lucide-react'

const navItems = [
  { href: '/app', label: 'Início', icon: Home },
  { href: '/app/diary', label: 'Diário', icon: NotebookText },
  { href: '/app/care', label: 'Cuidar de mim', icon: HeartHandshake },
  { href: '/app/courses', label: 'Cursos', icon: BookHeart },
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
              variant={location.pathname === item.href ? 'default' : 'ghost'}
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
