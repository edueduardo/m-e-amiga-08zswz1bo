import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import { AidaIndicator } from './AidaIndicator'

const painPoints = [
  'Você segura o choro para não preocupar ninguém?',
  'Sente-se exausta, mas a culpa de "reclamar" te impede de falar?',
  'Parece que todas têm um ombro amigo, menos você?',
]

export const PainPointsSection = () => {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 bg-background">
      <AidaIndicator principle="Interest" />
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              A solidão, o choro escondido, a sobrecarga...
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Se você se identifica com alguma dessas situações, saiba que não
              está sozinha. Este espaço foi criado para você.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-3 md:gap-12 lg:max-w-5xl mt-12">
          {painPoints.map((point, index) => (
            <Card
              key={index}
              className="bg-secondary/50 animate-fade-in-up transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-primary/50 border border-transparent"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 flex items-start space-x-4">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-lg font-medium">{point}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
