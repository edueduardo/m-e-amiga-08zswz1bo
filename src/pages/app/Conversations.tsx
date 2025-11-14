import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Mic, Send, Loader2, Square, Upload } from 'lucide-react'
import { voiceEntries } from '@/lib/data'
import { VoiceEntry, Feedback } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { generateMotherReply, transcribeAudio } from '@/lib/motherAi'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AudioPlayer } from '@/components/AudioPlayer'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { FeedbackButtons } from '@/components/FeedbackButtons'

const moodColors: { [key: string]: string } = {
  triste: 'bg-blue-100 text-blue-800',
  cansada: 'bg-purple-100 text-purple-800',
  ansiosa: 'bg-yellow-100 text-yellow-800',
  irritada: 'bg-red-100 text-red-800',
  feliz: 'bg-green-100 text-green-800',
  neutra: 'bg-gray-100 text-gray-800',
}

const ConversationsPage = () => {
  const { abTestGroup } = useAuth()
  const [entries, setEntries] = useState<VoiceEntry[]>(voiceEntries)
  const [newEntry, setNewEntry] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setIsRecording(true)
      setStatus('Gravando... Fale com o coração.')
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/webm',
        })
        const url = URL.createObjectURL(audioBlob)
        setAudioURL(url)
        setAudioFile(
          new File([audioBlob], 'desabafo.webm', { type: 'audio/webm' }),
        )
        stream.getTracks().forEach((track) => track.stop())
      }
      mediaRecorderRef.current.start()
    } catch (err) {
      console.error('Error accessing microphone:', err)
      setStatus('Não consegui acessar seu microfone.')
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setStatus('Gravação finalizada. Pronto para enviar.')
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAudioFile(file)
      setAudioURL(URL.createObjectURL(file))
      setStatus('Arquivo de áudio carregado.')
    }
  }

  const handleFeedbackSubmit = (entryId: string, feedback: Feedback) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === entryId ? { ...entry, feedback } : entry,
      ),
    )
    console.log('Feedback submitted:', { entryId, feedback })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEntry && !audioFile) return
    setIsLoading(true)

    let transcript = newEntry
    if (audioFile && !newEntry) {
      setStatus('Transcrevendo seu áudio...')
      transcript = await transcribeAudio(audioFile)
      setNewEntry(transcript)
    }

    if (!transcript) {
      setStatus('Não foi possível obter a transcrição.')
      setIsLoading(false)
      return
    }

    setStatus('Preparando uma resposta com carinho...')
    const { reply: motherReply, mood_label } = await generateMotherReply(
      transcript,
      abTestGroup || 'A',
    )

    const entry: VoiceEntry = {
      id: new Date().toISOString(),
      created_at: new Date().toISOString(),
      transcript,
      mood_label: mood_label as VoiceEntry['mood_label'],
      mother_reply: motherReply,
      audio_url: audioURL || undefined,
      feedback: { rating: null },
    }

    setEntries([entry, ...entries])
    setNewEntry('')
    setAudioFile(null)
    setAudioURL(null)
    setStatus('')
    setIsLoading(false)
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_2fr] h-[calc(100vh-8rem)]">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Novo Desabafo</CardTitle>
          <CardDescription>
            Grave um áudio ou escreva. Estou aqui para te ouvir.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col space-y-4">
          <form
            onSubmit={handleSubmit}
            className="flex-grow flex flex-col space-y-4"
          >
            <Textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="Escreva aqui ou grave um áudio..."
              className="flex-grow"
              disabled={isLoading}
            />
            {audioURL && <AudioPlayer src={audioURL} />}
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={isRecording ? 'destructive' : 'outline'}
                onClick={
                  isRecording ? handleStopRecording : handleStartRecording
                }
                disabled={isLoading}
              >
                {isRecording ? (
                  <Square className="mr-2 h-4 w-4" />
                ) : (
                  <Mic className="mr-2 h-4 w-4" />
                )}
                {isRecording ? 'Parar' : 'Gravar'}
              </Button>
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="audio/*"
                id="audio-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <Upload className="mr-2 h-4 w-4" /> Carregar
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || (!newEntry && !audioFile)}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {isLoading ? status : 'Enviar para Mãe Amiga'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Suas Conversas</CardTitle>
          <CardDescription>
            Relembre sua jornada e veja suas conversas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
            <div className="space-y-6">
              {entries.map((entry) => (
                <div key={entry.id} className="space-y-4">
                  <div className="flex items-start gap-3 justify-end">
                    <div className="p-3 border rounded-lg bg-secondary max-w-xl">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">Você</p>
                        <p className="text-xs text-muted-foreground">
                          {format(
                            new Date(entry.created_at),
                            "dd/MM/yy 'às' HH:mm",
                            { locale: ptBR },
                          )}
                        </p>
                      </div>
                      {entry.audio_url && (
                        <AudioPlayer src={entry.audio_url} className="mb-2" />
                      )}
                      <p className="text-sm">{entry.transcript}</p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>V</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>MA</AvatarFallback>
                    </Avatar>
                    <div className="p-3 border rounded-lg bg-primary/10 border-primary max-w-xl">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">Mãe Amiga</p>
                        <Badge className={moodColors[entry.mood_label]}>
                          {entry.mood_label}
                        </Badge>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">
                        {entry.mother_reply}
                      </p>
                      <FeedbackButtons
                        entryId={entry.id}
                        initialFeedback={entry.feedback}
                        onFeedbackSubmit={handleFeedbackSubmit}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default ConversationsPage
