import { AidaIndicator } from './AidaIndicator'

export const InterestSection = () => {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <AidaIndicator principle="Interest" />
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Entenda a Perspectiva Masculina
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Antes de conversar com seu companheiro, pai ou filho, tire suas
            dúvidas com nosso consultor virtual baseado em pesquisas de
            psicologia. Receba respostas empáticas e pautadas em evidências
            sobre comunicação, comportamentos sociais e expectativas masculinas.
          </p>
          <p className="text-sm text-muted-foreground italic">
            Lembre-se: as previsões do nosso consultor são guias gerais para te
            ajudar a se preparar para conversas, não verdades absolutas. Cada
            pessoa é única.
          </p>
        </div>
      </div>
    </section>
  )
}
