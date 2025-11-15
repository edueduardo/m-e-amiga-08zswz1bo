import { AidaIndicator } from './AidaIndicator'
import { InteractiveChatSimulation } from './InteractiveChatSimulation'

export const InterestSection = () => {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <AidaIndicator principle="Interest" />
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center lg:text-left">
              Entenda a Perspectiva Masculina
            </h2>
            <p className="text-muted-foreground md:text-xl text-center lg:text-left">
              Antes de conversar com seu companheiro, pai ou filho, tire suas
              dúvidas com nosso consultor virtual baseado em pesquisas de
              psicologia. Receba respostas empáticas e pautadas em evidências
              sobre comunicação, comportamentos sociais e expectativas
              masculinas.
            </p>
            <p className="text-sm text-muted-foreground italic text-center lg:text-left">
              Lembre-se: as previsões do nosso consultor são guias gerais para
              te ajudar a se preparar para conversas, não verdades absolutas.
              Cada pessoa é única.
            </p>
            <div className="hidden lg:block pt-6">
              <img
                src="https://img.usecurling.com/p/500/300?q=chat%20bubbles%20animation"
                alt="Animação de balões de conversa"
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
          </div>
          <div>
            <InteractiveChatSimulation />
          </div>
        </div>
      </div>
    </section>
  )
}

