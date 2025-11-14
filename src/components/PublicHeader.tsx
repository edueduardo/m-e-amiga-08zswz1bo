import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { SOSDialog } from './SOSDialog'
import { HeartPulse } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { SiteSearch } from './SiteSearch'

export const PublicHeader = () => {
  const [isSOSDialogOpen, setIsSOSDialogOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Mãe Amiga</span>
            </Link>
          </div>
          <div className="flex-1 md:flex-grow-0">
            <SiteSearch />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsSOSDialogOpen(true)}
              >
                <HeartPulse className="mr-2 h-4 w-4" />
                SOS
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/pricing">Preço</Link>
              </Button>
              <Button asChild>
                <Link to="/login">Entrar</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <SOSDialog open={isSOSDialogOpen} onOpenChange={setIsSOSDialogOpen} />
    </>
  )
}
