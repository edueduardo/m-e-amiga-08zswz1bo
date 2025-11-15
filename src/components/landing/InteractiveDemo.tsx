import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const demoScript = [
  {
    sender: 'ai',
    text: 'Olá, filha! Que bom te ver. Como você está se sentindo hoje?',
  },
  {
    sender: 'user',
    options: [
      'Estou tão cansada de tudo...',
      'Um pouco ansiosa com o trabalho.',
      'Na verdade, hoje foi um bom dia!',
    ],
  },
  {
    sender: 'ai',
    responses: [
      'Eu sinto o peso nas suas palavras, querida. Lembre-se que é normal se sentir assim. Que tal respirar fundo por um instante? Estou aqui para te ouvir, sem pressa.',
      'Ansiedade é como uma visita indesejada, não é? Mas ela vai embora. Conte-me um pouco mais sobre o que está te preocupando, se você se sentir à vontade.',
      'Que maravilha ouvir isso, filha! Fico tão feliz por você. O que aconteceu de bom hoje? Adoraria celebrar essa alegria com você.',
    ],
  },
  {
    sender: 'ai',
    text: 'Isso é apenas um gostinho de como a Mãe Amiga pode te acolher. Pronta para começar sua jornada?',
  },
]

export const InteractiveDemo = () => {
  const [messages, setMessages] = useState([demoScript[0]])
  const [step, setStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleOptionClick = (optionIndex: number) => {
    const userMessage = {
      sender: 'user',
      text: demoScript[1].options![optionIndex],
    }
    const aiResponse = {
      sender: 'ai',
      text: demoScript[2].responses![optionIndex],
    }
    const finalMessage = demoScript[3]

    setSelectedOption(optionIndex)
    setMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      setMessages((prev) => [...prev, aiResponse])
      setTimeout(() => {
        setMessages((prev) => [...prev, finalMessage])
        setStep(3)
      }, 1500)
    }, 1000)

    setStep(2)
  }

  useEffect(() => {
    // Start the demo by showing the user options after the first AI message
    if (messages.length === 1 && step === 0) {
      setTimeout(() => {
        setStep(1)
      }, 1500)
    }
  }, [messages, step])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Sinta o Acolhimento
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Experimente uma pequena demonstração de como é conversar com a Mãe
            Amiga.
          </p>
        </div>
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-4">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-3 animate-fade-in-up',
                    msg.sender === 'user' ? 'justify-end' : 'justify-start',
                  )}
                >
                  {msg.sender === 'ai' && (
                    <Bot className="h-8 w-8 text-primary flex-shrink-0" />
                  )}
                  <div
                    className={cn(
                      'p-3 rounded-lg max-w-md',
                      msg.sender === 'user' ? 'bg-secondary' : 'bg-primary/10',
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  {msg.sender === 'user' && (
                    <User className="h-8 w-8 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {step === 1 && (
              <div className="p-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-2 animate-fade-in">
                {demoScript[1].options?.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleOptionClick(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
