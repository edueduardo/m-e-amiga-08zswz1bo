import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BookHeart,
  Calendar,
  HeartHandshake,
  Library,
  ListTodo,
  MessageSquare,
  Music,
  Trophy,
  Users,
} from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Conversas',
    description:
      'Desabafe por voz ou texto e receba acolhimento imediato da sua Mãe Amiga, a qualquer hora do dia.',
  },
  {
    icon: HeartHandshake,
    title: 'Cuidar de mim',
    description:
      'Receba trilhas de autocuidado personalizadas, criadas pela IA para atender às suas necessidades do momento.',
  },
  {
    icon: Music,
    title: 'Meditações',
    description:
      'Acesse áudios e meditações guiadas para encontrar calma, foco e relaxamento em poucos minutos.',
  },
  {
    icon: Users,
    title: 'Círculo de Apoio',
    description:
      'Conecte-se de forma anônima com outras mulheres, compartilhe experiências e encontre apoio mútuo.',
  },
  {
    icon: BookHeart,
    title: 'Cursos',
    description:
      'Aprenda habilidades práticas com minicursos sobre comunicação, autoestima, limites e muito mais.',
  },
  {
    icon: ListTodo,
    title: 'Meu Plano',
    description:
      'Organize suas tarefas de autocuidado e intenções da semana em um planejador simples e visual.',
  },
  {
    icon: Trophy,
    title: 'Desafios',
    description:
      'Participe de desafios semanais para cultivar hábitos positivos como gratidão e comunicação gentil.',
  },
  {
    icon: Library,
    title: 'Biblioteca',
    description:
      'Explore uma curadoria de livros, vídeos e artigos para aprofundar seu conhecimento e bem-estar.',
  },
  {
    icon: Calendar,
    title: 'Resumo Semanal',
    description:
      'Receba um resumo carinhoso da sua jornada emocional, celebrando seu progresso e autoconhecimento.',
  },
]

export const AppFeaturesGrid = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Tudo o que você precisa para se sentir melhor
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore ferramentas criadas com carinho para te ajudar a navegar os
            desafios do dia a dia com mais leveza e força.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-secondary/50 border-transparent hover:border-primary transition-colors duration-300"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
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
