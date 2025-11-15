import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const caseStudies = [
  {
    title: 'Da Sobrecarga à Serenidade',
    description:
      'Como Ana, mãe de dois, usou o diário de voz para organizar seus sentimentos e melhorar a comunicação com seu parceiro, redescobrindo a leveza no dia a dia.',
    link: '#',
  },
  {
    title: 'Redescobrindo a Si Mesma',
    description:
      'A jornada de Júlia, que se sentia perdida nos papéis de mãe e esposa, e encontrou no coaching com IA as ferramentas para se reconectar com seus próprios sonhos e paixões.',
    link: '#',
  },
  {
    title: 'Fortalecendo Laços',
    description:
      'A história de Carla, que através do Círculo de Apoio, encontrou uma rede de suporte com outras mulheres e percebeu que não estava sozinha em seus desafios.',
    link: '#',
  },
]

export const CaseStudiesSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Jornadas de Transformação
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Histórias reais de mulheres que encontraram um novo caminho com a
            Mãe Amiga.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-3">
          {caseStudies.map((study, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{study.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{study.description}</CardDescription>
              </CardContent>
              <CardContent>
                <Button variant="link" className="p-0">
                  Ler história completa <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

