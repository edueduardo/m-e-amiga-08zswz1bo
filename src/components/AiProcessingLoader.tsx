import { useState, useEffect } from 'react'
import { Loader2, BrainCircuit } from 'lucide-react'

interface AiProcessingLoaderProps {
  maxTime: number
}

export const AiProcessingLoader = ({ maxTime }: AiProcessingLoaderProps) => {
  const [countdown, setCountdown] = useState(maxTime)
  const [pollingStatus, setPollingStatus] = useState(
    'Iniciando conexão segura...',
  )

  useEffect(() => {
    setCountdown(maxTime)
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    const pollingMessages = [
      'Analisando suas respostas...',
      'Consultando a sabedoria da Mãe Amiga...',
      'Preparando seus conselhos...',
      'Quase pronto, tecendo as palavras com carinho...',
    ]
    let messageIndex = 0

    const pollingTimer = setInterval(() => {
      setPollingStatus(pollingMessages[messageIndex % pollingMessages.length])
      messageIndex++
    }, 3000)

    return () => {
      clearInterval(countdownTimer)
      clearInterval(pollingTimer)
    }
  }, [maxTime])

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 p-8 animate-fade-in">
      <div className="relative">
        <BrainCircuit className="h-20 w-20 text-primary" />
        <Loader2 className="h-24 w-24 text-primary/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
      </div>
      <h2 className="text-2xl font-semibold">
        A resposta está sendo pensada...
      </h2>
      <p className="text-muted-foreground max-w-md">{pollingStatus}</p>
      <div className="w-full max-w-sm pt-4">
        <p className="text-sm text-muted-foreground">
          Tempo máximo estimado: {countdown} segundos
        </p>
      </div>
    </div>
  )
}
