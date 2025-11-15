import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Moon, HeartCrack, UserSearch } from 'lucide-react'

const useCases = [
  {
    icon: Moon,
    title: 'Para a mulher exausta',
    description:
      'Quando a carga mental pesa e você precisa de um espaço para desabafar sem interrupções, no seu próprio tempo, especialmente nas madrugadas silenciosas.',
  },
  {
    icon: HeartCrack,
    title: 'Para quem se sente desconectada',
    description:
      'Quando a comunicação nos relacionamentos parece um campo minado e você precisa de clareza para entender seus próprios sentimentos antes de conversar.',
  },
  {
    icon: UserSearch,
    title: 'Para a mulher em busca de si mesma',
    description:
      'Quando você se olha no espelho e não reconhece mais a mulher por trás dos papéis que desempenha, e precisa de um guia para se redescobrir.',
  },
]

export const UseCasesSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Feito para cada momento da sua jornada
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Seja qual for o seu desafio, a Mãe Amiga está aqui para te ouvir e
            apoiar.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-3 md:gap-12 lg:max-w-5xl">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="text-center animate-fade-in-up border-transparent hover:border-primary transition-colors"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                  <useCase.icon className="h-10 w-10 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle>{useCase.title}</CardTitle>
                <p className="text-muted-foreground">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

