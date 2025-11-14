import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Bot,
  BrainCircuit,
  HeartHandshake,
  Users,
  Flower2,
  UserRound,
} from 'lucide-react'

const coreFeatures = [
  {
    icon: UserRound,
    title: 'Cabeça de Homem',
    aida: {
      attention:
        'Compreenda o que se passa na mente masculina de diferentes gerações.',
      interest:
        'Selecione perfis como avô, marido ou filho e saiba como abordar assuntos delicados.',
      desire: 'Sinta-se mais preparada e confiante para conversas importantes.',
      action: 'Experimente agora essa novidade.',
    },
  },
  {
    icon: Bot,
    title: 'Coaching com IA',
    aida: {
      attention: 'Sinta-se ouvida e compreendida a qualquer momento.',
      interest:
        'Com as Sessões de Aconselhamento Guiadas por IA, você tem uma coach pessoal disponível 24/7 para conversas profundas e exercícios práticos.',
      desire:
        'Descubra clareza, encontre soluções para seus desafios e acompanhe seu progresso em um ambiente seguro e confidencial. É como ter suporte constante para seu bem-estar emocional.',
      action:
        'Comece sua sessão e inicie sua jornada de autodescoberta hoje mesmo!',
    },
  },
  {
    icon: BrainCircuit,
    title: 'Autoconhecimento',
    aida: {
      attention: 'Desvende os segredos de suas emoções.',
      interest:
        'A Jornada de Autoconhecimento com Análise de Padrões Emocionais usa IA para analisar suas interações, anotações e humor, revelando gatilhos e padrões emocionais únicos.',
      desire:
        'Obtenha insights profundos sobre você, entenda o que te afeta e receba recomendações personalizadas para cultivar um bem-estar duradouro. Transforme como você se relaciona com suas emoções.',
      action:
        'Explore seus padrões emocionais e comece a construir uma vida mais equilibrada!',
    },
  },
  {
    icon: HeartHandshake,
    title: 'Cuidar de mim',
    aida: {
      attention: 'Aprenda e cresça no seu ritmo, do seu jeito.',
      interest:
        "As Trilhas de Aprendizagem Adaptativas criam 'mini-workshops' personalizados para você, ajustando-se dinamicamente às suas necessidades e estilo de aprendizado.",
      desire:
        'Receba conteúdo relevante e eficaz para superar desafios específicos, desenvolver novas habilidades e aprofundar seu conhecimento em tópicos que realmente importam para você. Seu desenvolvimento pessoal nunca foi tão personalizado.',
      action:
        'Descubra sua trilha de aprendizado e impulsione seu crescimento pessoal!',
    },
  },
  {
    icon: Users,
    title: 'Círculo de Apoio',
    aida: {
      attention: 'Conecte-se e compartilhe em uma comunidade que te entende.',
      interest:
        "O Círculo de Apoio aprimorado oferece salas de discussão focadas em temas específicos, como 'Mães de Bebês' ou 'Desafios no Relacionamento', com a IA auxiliando na moderação.",
      desire:
        'Encontre apoio, compartilhe experiências e crie laços com outras mães em um ambiente seguro, acolhedor e construtivo. Sinta-se parte de algo maior, onde sua voz é valorizada.',
      action: 'Participe de uma sala temática e encontre sua tribo!',
    },
  },
  {
    icon: Flower2,
    title: 'Jardim do Crescimento',
    aida: {
      attention:
        'Transforme seu autocuidado em uma jornada divertida e gratificante.',
      interest:
        "Com o 'Jardim do Crescimento', suas metas e progresso são visualmente representados por sementes que florescem e elementos que crescem à medida que você avança em seu bem-estar.",
      desire:
        'Mantenha-se motivado, celebre suas conquistas e veja seus esforços florescerem de forma lúdica e recompensadora. Cada passo em direção ao seu bem-estar é uma nova flor em seu jardim!',
      action: 'Cultive seu jardim e veja seu progresso florescer!',
    },
  },
]

export const CoreFeaturesSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Um Universo de Cuidado na Palma da Sua Mão
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Cada ferramenta foi pensada para te apoiar, fortalecer e inspirar.
            Descubra como a Mãe Amiga pode transformar seu dia a dia.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {coreFeatures.map((feature, index) => (
              <AccordionItem
                value={`item-${index + 1}`}
                key={index}
                className="border-b"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                  <div className="flex items-center gap-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                    <span>{feature.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="space-y-4 pl-10">
                    <div className="flex items-start gap-3">
                      <strong className="text-primary font-semibold w-20 shrink-0">
                        Atenção:
                      </strong>
                      <p className="text-muted-foreground">
                        {feature.aida.attention}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <strong className="text-primary font-semibold w-20 shrink-0">
                        Interesse:
                      </strong>
                      <p className="text-muted-foreground">
                        {feature.aida.interest}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <strong className="text-primary font-semibold w-20 shrink-0">
                        Desejo:
                      </strong>
                      <p className="text-muted-foreground">
                        {feature.aida.desire}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <strong className="text-primary font-semibold w-20 shrink-0">
                        Ação:
                      </strong>
                      <p className="text-muted-foreground">
                        {feature.aida.action}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
