import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/ui/use-toast'

const features = [
  'Diário de voz ilimitado',
  'Respostas carinhosas da Mãe Amiga',
  'Acesso a todas as trilhas de autocuidado',
  'Acesso a todos os minicursos',
  'Resumo semanal da sua jornada',
]

const PricingPage = () => {
  const { isAuthenticated, isSubscribed, subscribe } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubscription = () => {
    if (!isAuthenticated) {
      navigate('/signup')
      return
    }
    if (isSubscribed) {
      navigate('/app')
      return
    }
    // Simulate Stripe checkout and success
    subscribe()
    toast({
      title: 'Assinatura Ativada!',
      description: 'Bem-vinda, filha! Agora você tem acesso a tudo.',
    })
    navigate('/app')
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] py-12 bg-secondary">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Plano Mãe Amiga</CardTitle>
          <CardDescription>
            Acesso completo a tudo que você precisa para se sentir acolhida.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <span className="text-4xl font-bold">R$ 10</span>
            <span className="text-muted-foreground">/mês</span>
          </div>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubscription} className="w-full" size="lg">
            {isSubscribed ? 'Ir para o App' : 'Ativar Mãe Amiga por R$ 10'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PricingPage

