import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

const painPoints = [
  'Seguro o choro pra não preocupar ninguém.',
  'Estou cansada, mas me sinto culpada por dizer isso.',
  'Parece que todo mundo tem com quem desabafar, menos eu.',
]

export const PainPointsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Mulher casada sobrecarregada, choro escondido, sensação de
              solidão.
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Se você se identifica com alguma dessas situações, saiba que não
              está sozinha.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-3 md:gap-12 lg:max-w-5xl mt-12">
          {painPoints.map((point, index) => (
            <Card key={index} className="bg-secondary/50">
              <CardContent className="p-6 flex items-start space-x-4">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
                <p className="text-lg font-medium">{point}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
