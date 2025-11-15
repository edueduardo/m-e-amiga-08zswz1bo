import { AlertTriangle } from 'lucide-react'

export const EthicalNoticeSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl p-6 border-l-4 border-primary bg-background rounded-r-lg">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="text-xl font-semibold">
                Nosso Compromisso com Você
              </h3>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                <li>
                  <span className="font-semibold">Não é terapia:</span> Este é
                  um espaço de apoio e conselho de vida, não substitui consultas
                  médicas ou psicológicas.
                </li>
                <li>
                  <span className="font-semibold">Sua privacidade:</span> Seus
                  desabafos são seus. Nós respeitamos e protegemos seus dados.
                </li>
                <li>
                  <span className="font-semibold">Procure ajuda:</span> Em casos
                  de risco, procure ajuda profissional. Sua saúde mental é a
                  maior prioridade.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
