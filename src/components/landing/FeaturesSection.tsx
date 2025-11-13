import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Book,
  CalendarCheck,
  Heart,
  MessageSquareHeart,
  Leaf,
} from 'lucide-react'

const features = [
  {
    icon: MessageSquareHeart,
    title: 'Diário de voz',
    description: 'Um espaço seguro para você registrar seus sentimentos.',
  },
  {
    icon: Heart,
    title: 'Respostas carinhosas',
    description: 'Receba o acolhimento e o conselho de uma mãe amiga.',
  },
  {
    icon: Leaf,
    title: 'Trilhas de autocuidado',
    description: 'Pequenos rituais para você se reconectar consigo mesma.',
  },
  {
    icon: Book,
    title: 'Minicursos de comunicação',
    description: 'Aprenda a expressar suas necessidades de forma gentil.',
  },
  {
    icon: CalendarCheck,
    title: 'Resumo semanal',
    description: 'Veja sua jornada emocional e celebre seu progresso.',
  },
]

export const FeaturesSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            O que você recebe
          </h2>
        </div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-secondary/50">
              <CardHeader className="flex flex-row items-center gap-4">
                <feature.icon className="h-8 w-8 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
