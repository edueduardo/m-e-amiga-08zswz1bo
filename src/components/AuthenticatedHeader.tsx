import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { LogOut, Menu, HeartPulse } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AppSidebar } from './AppSidebar'
import { SOSDialog } from './SOSDialog'
import { ThemeToggle } from './ThemeToggle'
import { SiteSearch } from './SiteSearch'
import { NotificationCenter } from './NotificationCenter'

export const AuthenticatedHeader = () => {
  const { logout } = useAuth()
  const [isSOSDialogOpen, setIsSOSDialogOpen] = useState(false)

  return (
    <>
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
          <SiteSearch />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <NotificationCenter />
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setIsSOSDialogOpen(true)}
          >
            <HeartPulse className="h-5 w-5" />
            <span className="sr-only">SOS</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sair</span>
          </Button>
        </div>
      </header>
      <SOSDialog open={isSOSDialogOpen} onOpenChange={setIsSOSDialogOpen} />
    </>
  )
}
