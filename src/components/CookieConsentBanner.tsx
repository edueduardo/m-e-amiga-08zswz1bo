import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCookieConsent } from '@/hooks/useCookieConsent'
import { Cookie, X } from 'lucide-react'

export const CookieConsentBanner = () => {
  const { consent, acceptConsent, declineConsent } = useCookieConsent()
  const [isDismissed, setIsDismissed] = useState(false)

  if (consent || isDismissed) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 md:p-4 animate-fade-in-up">
      <Card className="max-w-4xl mx-auto shadow-lg bg-background/90 backdrop-blur-sm">
        {/* Mobile View */}
        <div className="p-3 flex flex-col md:hidden items-center gap-3">
          <div className="w-full flex items-start gap-3">
            <Cookie className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
            <p className="flex-grow text-xs text-muted-foreground">
              Usamos cookies para melhorar sua experiência. Ao continuar, você
              concorda com nossa{' '}
              <Link to="/cookie-policy" className="underline">
                Política de Cookies
              </Link>
              .
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0 -mr-2 -mt-1"
              onClick={() => setIsDismissed(true)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={declineConsent}
            >
              Recusar
            </Button>
            <Button size="sm" className="flex-1" onClick={acceptConsent}>
              Aceitar
            </Button>
          </div>
        </div>

        {/* Desktop View */}
        <CardContent className="p-6 hidden md:flex items-center gap-6">
          <Cookie className="h-10 w-10 text-primary flex-shrink-0" />
          <div className="flex-grow text-left">
            <p className="font-semibold">Nós usamos cookies</p>
            <p className="text-sm text-muted-foreground">
              Este site usa cookies para garantir que você obtenha a melhor
              experiência. Ao continuar, você concorda com o nosso uso de
              cookies. Leia nossa{' '}
              <Link
                to="/cookie-policy"
                className="underline hover:text-primary"
              >
                Política de Cookies
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-4 flex-shrink-0">
            <Button variant="outline" onClick={declineConsent}>
              Recusar Todos
            </Button>
            <Button onClick={acceptConsent}>Aceitar Todos</Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDismissed(true)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
