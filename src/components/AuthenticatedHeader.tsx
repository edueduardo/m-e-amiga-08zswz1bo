import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { LogOut, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AppSidebar } from './AppSidebar'

export const AuthenticatedHeader = () => {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <AppSidebar />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-semibold">
          Oi, filha, {user?.full_name || 'bem-vinda'}
        </h1>
      </div>
      <Button variant="ghost" size="icon" onClick={logout}>
        <LogOut className="h-5 w-5" />
        <span className="sr-only">Sair</span>
      </Button>
    </header>
  )
}
