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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Mic, Send, Loader2 } from 'lucide-react'
import { voiceEntries } from '@/lib/data'
import { VoiceEntry } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { generateMotherReply, analyzeMoodFromText } from '@/lib/motherAi'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

const moodColors: { [key: string]: string } = {
  triste: 'bg-blue-100 text-blue-800',
  cansada: 'bg-purple-100 text-purple-800',
  ansiosa: 'bg-yellow-100 text-yellow-800',
  irritada: 'bg-red-100 text-red-800',
  feliz: 'bg-green-100 text-green-800',
  neutra: 'bg-gray-100 text-gray-800',
}

const DiaryPage = () => {
  const [entries, setEntries] = useState<VoiceEntry[]>(voiceEntries)
  const [newEntry, setNewEntry] = useState('')
  const [mood, setMood] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [reply, setReply] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEntry || !mood) return
    setIsLoading(true)
    setReply(null)

    const detectedMood = await analyzeMoodFromText(newEntry)
    const motherReply = await generateMotherReply(newEntry, detectedMood)

    const entry: VoiceEntry = {
      id: new Date().toISOString(),
      created_at: new Date().toISOString(),
      transcript: newEntry,
      mood_label: mood as VoiceEntry['mood_label'],
      mother_reply: motherReply,
    }

    setReply(motherReply)
    setEntries([entry, ...entries])
    setNewEntry('')
    setMood('')
    setIsLoading(false)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Novo Desabafo</CardTitle>
            <CardDescription>
              Conte aqui o que está pesando hoje...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="Escreva aqui ou grave um áudio..."
                rows={6}
                disabled={isLoading}
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  disabled
                >
                  <Mic className="mr-2 h-4 w-4" /> Gravar Áudio (em breve)
                </Button>
                <Select
                  value={mood}
                  onValueChange={setMood}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Como você se sente?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="triste">Triste</SelectItem>
                    <SelectItem value="cansada">Cansada</SelectItem>
                    <SelectItem value="ansiosa">Ansiosa</SelectItem>
                    <SelectItem value="irritada">Irritada</SelectItem>
                    <SelectItem value="feliz">Feliz</SelectItem>
                    <SelectItem value="neutra">Neutra</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={isLoading || !newEntry || !mood}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Enviar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {isLoading && (
          <Card className="animate-pulse">
            <CardHeader>
              <CardTitle>Mãe Amiga está te ouvindo...</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Aguarde um momento, estou preparando uma resposta com carinho
                para você.
              </p>
            </CardContent>
          </Card>
        )}
        {reply && (
          <Card className="bg-primary/10 border-primary animate-fade-in">
            <CardHeader>
              <CardTitle>Resposta da Mãe Amiga</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{reply}</p>
            </CardContent>
          </Card>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Seus Desabafos</CardTitle>
          <CardDescription>
            Relembre sua jornada e veja suas conversas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">
                      {format(
                        new Date(entry.created_at),
                        "dd 'de' MMMM, yyyy",
                        { locale: ptBR },
                      )}
                    </p>
                    <Badge className={moodColors[entry.mood_label]}>
                      {entry.mood_label}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground truncate">
                    {entry.transcript}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default DiaryPage
