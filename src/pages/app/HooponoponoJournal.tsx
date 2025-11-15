import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { BookHeart, PlusCircle, Loader2 } from 'lucide-react'
import { useJournal } from '@/contexts/JournalContext'

const journalPrompts = [
  'Que memória ou sentimento doloroso você gostaria de limpar hoje?',
  'Pelo que você pode dizer "Sinto muito" e "Me perdoe" em sua vida agora?',
  'Para quem ou o quê você pode enviar "Te amo" e "Sou grata(o)" hoje?',
  'Qual situação externa está refletindo um incômodo interno que você pode limpar?',
]

const getDailyPrompt = () => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000,
  )
  return journalPrompts[dayOfYear % journalPrompts.length]
}

const HooponoponoJournalPage = () => {
  const { entries, isLoading, addEntry } = useJournal()
  const [currentEntry, setCurrentEntry] = useState('')
  const dailyPrompt = getDailyPrompt()

  const handleSaveEntry = async () => {
    await addEntry(currentEntry, dailyPrompt)
    setCurrentEntry('')
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <BookHeart className="h-16 w-16 mx-auto text-primary animate-float" />
        <h1 className="text-3xl font-bold tracking-tight mt-4">
          Diário Ho'oponopono
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Um espaço para você praticar a limpeza de memórias e cultivar a paz
          interior.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reflexão do Dia</CardTitle>
          <CardDescription>{dailyPrompt}</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="Escreva livremente, com o coração..."
            rows={8}
          />
        </CardContent>
        <CardContent>
          <Button onClick={handleSaveEntry} disabled={!currentEntry.trim()}>
            <PlusCircle className="mr-2 h-4 w-4" /> Salvar Reflexão
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Suas Reflexões Anteriores</h2>
        <ScrollArea className="h-[400px] pr-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id} className="bg-secondary">
                  <CardHeader>
                    <CardTitle className="text-base">{entry.prompt}</CardTitle>
                    <CardDescription>
                      {format(new Date(entry.date), "dd 'de' MMMM, yyyy", {
                        locale: ptBR,
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{entry.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

export default HooponoponoJournalPage
