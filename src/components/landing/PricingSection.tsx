import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Check } from 'lucide-react'

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
            Invista em você por menos de um café por dia
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Acesso ilimitado a todas as ferramentas por apenas{' '}
            <span className="font-bold text-primary">R$ 10 por mês</span>.
            Cancele a qualquer momento, sem burocracia.
          </p>
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> Acesso ilimitado
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> Cancele quando quiser
            </span>
          </div>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to={getCtaLink()}>Quero meu bem-estar de volta</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
