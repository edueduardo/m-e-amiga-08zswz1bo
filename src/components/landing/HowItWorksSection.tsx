import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BrainCircuit, Mic, HandHeart } from 'lucide-react'

const steps = [
  {
    icon: Mic,
    title: 'Você fala',
    description: 'Grava ou escreve seu desabafo.',
  },
  {
    icon: BrainCircuit,
    title: 'Mãe Amiga entende',
    description: 'IA analisa o contexto emocional (sem diagnóstico).',
  },
  {
    icon: HandHeart,
    title: 'Você recebe carinho',
    description: 'Conselho doce e prático.',
  },
]

export const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Como funciona
          </h2>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-3 lg:gap-12">
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
