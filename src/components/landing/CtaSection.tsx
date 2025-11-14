import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export const CtaSection = () => {
  const { isAuthenticated, isSubscribed } = useAuth()

  const getCtaLink = () => {
    if (isAuthenticated && isSubscribed) return '/app'
    if (isAuthenticated && !isSubscribed) return '/pricing'
    return '/signup'
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Pronta para se sentir ouvida e acolhida?
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Dê o primeiro passo na sua jornada de autocuidado. Sua Mãe Amiga
            está aqui, esperando por você.
          </p>
          <Button asChild size="lg">
            <Link to={getCtaLink()}>Começar meu acolhimento agora</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
