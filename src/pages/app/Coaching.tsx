import { useState, useEffect, useRef } from 'react'
import { useCoaching } from '@/contexts/CoachingContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, PlusCircle, Send, MessageSquare, Loader2 } from 'lucide-react'
import { CoachingMessage as CoachingMessageComponent } from '@/components/coaching/CoachingMessage'
import { cn } from '@/lib/utils'

const CoachingPage = () => {
  const {
    sessions,
    activeSession,
    startNewSession,
    sendMessage,
    setActiveSession,
  } = useCoaching()
  const [newMessage, setNewMessage] = useState('')
  const [isStarting, setIsStarting] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [activeSession?.messages])

  const handleStartSession = async () => {
    setIsStarting(true)
    await startNewSession('Sessão de Coaching sobre Autocuidado')
    setIsStarting(false)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      sendMessage(newMessage)
      setNewMessage('')
    }
  }

  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-6 h-[calc(100vh-8rem)]">
      <div className="flex flex-col border-r">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Sessões</h2>
          <Button size="sm" onClick={handleStartSession} disabled={isStarting}>
            {isStarting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PlusCircle className="mr-2 h-4 w-4" />
            )}
            Nova
          </Button>
        </div>
        <ScrollArea className="flex-grow">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setActiveSession(session.id)}
              className={cn(
                'w-full text-left p-3 hover:bg-secondary',
                activeSession?.id === session.id && 'bg-secondary',
              )}
            >
              <p className="font-medium truncate">{session.title}</p>
              <p className="text-xs text-muted-foreground">
                {session.messages.length} mensagens
              </p>
            </button>
          ))}
        </ScrollArea>
      </div>
      <div className="flex flex-col">
        {activeSession ? (
          <>
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">{activeSession.title}</h2>
            </div>
            <ScrollArea className="flex-grow p-4" viewportRef={scrollAreaRef}>
              <div className="space-y-4">
                {activeSession.messages.map((msg) => (
                  <CoachingMessageComponent key={msg.id} message={msg} />
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua resposta..."
                />
                <Button type="submit">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <MessageSquare className="h-16 w-16 mb-4 text-primary" />
            <h3 className="text-xl font-semibold">Coaching com a Mãe Amiga</h3>
            <p>
              Inicie uma nova sessão ou selecione uma existente para começar.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoachingPage
