import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Check } from 'lucide-react'
import { AidaIndicator } from './AidaIndicator'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const plans = [
  {
    name: 'Acolhimento',
    price: 'R$ 10',
    period: '/mês',
    description: 'Para quem busca um apoio constante no dia a dia.',
    features: [
      'Diário de voz ilimitado',
      'Respostas da Mãe Amiga 24/7',
      'Acesso ao Círculo de Apoio',
      'Biblioteca de Recursos',
    ],
    isRecommended: false,
  },
  {
    name: 'Jornada',
    price: 'R$ 97',
    period: '/ano',
    description: 'O plano completo para sua jornada de autoconhecimento.',
    features: [
      'Tudo do plano Acolhimento',
      'Trilhas de autocuidado com IA',
      'Todos os minicursos',
      'Resumo semanal da sua jornada',
      'Desafios semanais',
    ],
    isRecommended: true,
  },
  {
    name: 'Plenitude',
    price: 'R$ 197',
    period: '/ano',
    description: 'Acesso premium com sessões de coaching individuais.',
    features: [
      'Tudo do plano Jornada',
      '2 sessões de coaching com IA por mês',
      'Análise de Padrões Emocionais',
      'Suporte prioritário',
    ],
    isRecommended: false,
  },
]

export const PricingSection = () => {
  const { isAuthenticated, isSubscribed } = useAuth()

  const getCtaLink = () => {
    if (isAuthenticated && isSubscribed) return '/app'
    if (isAuthenticated && !isSubscribed) return '/pricing'
    return '/signup'
  }

  return (
    <section
      id="pricing"
      className="relative w-full py-12 md:py-24 lg:py-32 bg-secondary"
    >
      <AidaIndicator principle="Action" />
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Invista em você. Você merece.
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Escolha o plano que mais combina com o seu momento. Cancele a
            qualquer momento, sem burocracia.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                'flex flex-col',
                plan.isRecommended && 'border-primary shadow-2xl scale-105',
              )}
            >
              {plan.isRecommended && (
                <Badge className="absolute -top-3 self-center">
                  Mais Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full"
                  variant={plan.isRecommended ? 'default' : 'outline'}
                >
                  <Link to={getCtaLink()}>Escolher Plano</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
