import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export const PricingSection = () => {
  const { isAuthenticated, isSubscribed } = useAuth()

  const getCtaLink = () => {
    if (isAuthenticated && isSubscribed) return '/app'
    if (isAuthenticated && !isSubscribed) return '/pricing'
    return '/signup'
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Tudo isso por R$ 10
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Experimente sem compromisso, cancele a qualquer momento. Um pequeno
            investimento no seu bem-estar.
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to={getCtaLink()}>Quero começar agora</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
