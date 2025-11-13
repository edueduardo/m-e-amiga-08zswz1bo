import { AlertTriangle } from 'lucide-react'

export const EthicalNoticeSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl p-6 border-l-4 border-primary bg-background rounded-r-lg">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Aviso Ético Importante</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                <li>Não é terapia, não é consulta médica.</li>
                <li>É apoio e conselho de vida, com carinho e empatia.</li>
                <li>
                  Em casos de risco, procure ajuda profissional. Sua saúde
                  mental é prioridade.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
