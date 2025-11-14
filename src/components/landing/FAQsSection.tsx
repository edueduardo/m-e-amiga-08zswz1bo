import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'O que é a Mãe Amiga?',
    answer:
      'Mãe Amiga é um SaaS (Software como Serviço) que oferece apoio emocional e conselhos de vida para mulheres. Usamos uma inteligência artificial com o tom de uma mãe e melhor amiga para fornecer respostas carinhosas e acolhedoras, disponíveis 24/7.',
  },
  {
    question: 'A Mãe Amiga substitui a terapia?',
    answer:
      'Não. A Mãe Amiga é uma ferramenta de apoio emocional e autoconhecimento, mas não substitui a terapia ou o aconselhamento de um profissional de saúde mental qualificado. Em casos de sofrimento intenso ou risco, recomendamos fortemente que você procure ajuda profissional.',
  },
  {
    question: 'Como meus dados são protegidos?',
    answer:
      'Sua privacidade é nossa maior prioridade. Todas as suas conversas são criptografadas e armazenadas de forma segura. Você tem controle total sobre seus dados, podendo exportá-los ou excluí-los a qualquer momento. Não compartilhamos suas informações com terceiros.',
  },
  {
    question: 'Como funciona o diário de voz?',
    answer:
      'Você pode gravar áudios desabafando sobre o que estiver sentindo. Nossa IA transcreve o áudio, analisa suas emoções e gera uma resposta de acolhimento, como se fosse uma conversa com uma mãe amorosa. Você também pode digitar, se preferir.',
  },
  {
    question: 'Posso cancelar minha assinatura a qualquer momento?',
    answer:
      'Sim! Você pode cancelar sua assinatura a qualquer momento, sem burocracia. O acesso permanecerá ativo até o final do período já pago.',
  },
  {
    question: 'Para quem é a Mãe Amiga?',
    answer:
      'A Mãe Amiga foi criada para todas as mulheres que se sentem sobrecarregadas e buscam um espaço de acolhimento. Embora tenha nascido com um foco em mulheres casadas, a plataforma é um porto seguro para mulheres solteiras, divorciadas, em relacionamentos diversos ou que simplesmente precisam de um ombro amigo.',
  },
]

export const FAQsSection = () => {
  return (
    <section id="faqs" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Perguntas Frequentes
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Tudo o que você precisa saber para começar sua jornada de
            acolhimento.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger className="text-lg text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
