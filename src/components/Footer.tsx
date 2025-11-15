import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import { NewsletterSignup } from './NewsletterSignup'

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-secondary">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Mãe Amiga</h3>
          <p className="text-muted-foreground">
            Seu espaço de acolhimento e conselhos de vida.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        <div className="md:col-span-2 flex justify-end">
          <NewsletterSignup />
        </div>
      </div>
      <div className="bg-background/50">
        <div className="container mx-auto py-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© Mãe Amiga {new Date().getFullYear()}</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="/terms-of-use" className="hover:text-primary">
              Termos de Uso
            </Link>
            <Link to="/cookie-policy" className="hover:text-primary">
              Política de Cookies
            </Link>
            <Link to="/contact" className="hover:text-primary">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

