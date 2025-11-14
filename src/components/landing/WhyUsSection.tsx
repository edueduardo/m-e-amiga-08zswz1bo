import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, ShieldCheck, Sparkles, Zap } from 'lucide-react'

const differentials = [
  {
    icon: Clock,
    title: 'Apoio 24/7, Sem Espera',
    description:
      'Acolhimento imediato sempre que você precisar, sem agendamentos ou filas de espera. Sua Mãe Amiga está sempre online para você.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacidade Absoluta',
    description:
      'Um espaço 100% seguro e anônimo para você ser quem realmente é, sem medo de julgamentos. Suas conversas são só suas.',
  },
  {
    icon: Sparkles,
    title: 'Inteligência e Carinho',
    description:
      'Nossa IA foi treinada para oferecer não apenas respostas, mas acolhimento genuíno, com a sabedoria e o carinho de uma mãe.',
  },
  {
    icon: Zap,
    title: 'Fácil como Conversar',
    description:
      'Use sua voz para desabafar. É natural, intuitivo e terapêutico. Sem a pressão de ter que escrever tudo o que sente.',
  },
]

export const WhyUsSection = () => {
  return (
    <section
      id="solutions"
      className="w-full py-12 md:py-24 lg:py-32 bg-background"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Por que escolher a Mãe Amiga?
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Em um mundo barulhento, criamos um silêncio acolhedor onde sua voz é
            a única que importa.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {differentials.map((item, index) => (
            <Card
              key={index}
              className="text-center animate-fade-in-up border-transparent hover:border-primary/50 hover:shadow-lg transition-all"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
