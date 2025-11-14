import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { SOSDialog } from './SOSDialog'
import { HeartPulse, Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { SiteSearch } from './SiteSearch'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { useIsMobile } from '@/hooks/use-mobile'

const navLinks = [
  { href: '/#how-it-works', label: 'Como Funciona' },
  { href: '/#solutions', label: 'Soluções' },
  { href: '/pricing', label: 'Preço' },
  { href: '/#faqs', label: 'Dúvidas' },
]

export const PublicHeader = () => {
  const [isSOSDialogOpen, setIsSOSDialogOpen] = useState(false)
  const isMobile = useIsMobile()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const targetId = href.substring(2)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Mãe Amiga</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link to="/" className="mr-6 flex items-center space-x-2 mb-6">
                  <span className="font-bold">Mãe Amiga</span>
                </Link>
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.label}>
                      <Link
                        to={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              {!(isMobile && isHomePage) && <SiteSearch />}
            </div>
            <nav className="hidden md:flex items-center space-x-2">
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
                <Link to="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Começar Grátis</Link>
              </Button>
            </nav>
            <div className="md:hidden flex items-center gap-2">
              {isHomePage && (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/login">Entrar</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/pricing">Preço</Link>
                  </Button>
                </>
              )}
              <ThemeToggle />
              <