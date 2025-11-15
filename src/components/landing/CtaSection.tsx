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
            Pronta para ter mais clareza sobre a mente dele?
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Assine e tenha acesso ao consultor masculino virtual, além de todas
            as outras ferramentas de acolhimento. O acesso a esta funcionalidade
            está incluído em todos os nossos planos.
          </p>
          <Button asChild size="lg">
            <Link to={getCtaLink()}>
              Assine e tenha acesso ao consultor masculino virtual
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
