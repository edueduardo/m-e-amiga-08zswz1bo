import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BrainCircuit, Mic, HandHeart, Users } from 'lucide-react'
import { AidaIndicator } from './AidaIndicator'

const steps = [
  {
    icon: Mic,
    title: '1. Você Desabafa',
    description: 'Com sua voz ou por texto, sem filtros e sem julgamentos.',
  },
  {
    icon: BrainCircuit,
    title: '2. A IA Acolhe',
    description:
      'Nossa tecnologia entende suas emoções para oferecer o melhor apoio.',
  },
  {
    icon: HandHeart,
    title: '3. Você se Fortalece',
    description: 'Receba conselhos práticos e o carinho que você merece.',
  },
  {
    icon: Users,
    title: '4. Você se Conecta',
    description: 'Encontre apoio e força em uma comunidade de mulheres.',
  },
]

export const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="relative w-full py-12 md:py-24 lg:py-32 bg-secondary/50"
    >
      <AidaIndicator principle="Interest" />
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Seu Acolhimento em 4 Passos Simples
          </h2>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle>{step.title}</CardTitle>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
