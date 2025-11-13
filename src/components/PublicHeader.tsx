import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export const PublicHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Mãe Amiga</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
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
  )
}
