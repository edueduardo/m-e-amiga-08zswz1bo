import { useState, useRef, useEffect } from 'react'
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
  Mic,
  Send,
  Loader2,
  Square,
  Upload,
  MessageSquareHeart,
  AlertTriangle,
  Trash2,
  Share2,
} from 'lucide-react'
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
import { useConversations } from '@/contexts/ConversationsContext'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SocialShareButtons } from '@/components/SocialShareButtons'

const moodMap: { [key: string]: { color: string; border: string } } = {
  triste: { color: 'bg-blue-100 text-blue-800', border: 'border-blue-200' },
  cansada: {
    color: 'bg-purple-100 text-purple-800',
    border: 'border-purple-200',
  },
  ansiosa: {
    color: 'bg-yellow-100 text-yellow-800',
    border: 'border-yellow-200',
  },
  irritada: { color: 'bg-red-100 text-red-800', border: 'border-red-200' },
  feliz: { color: 'bg-green-100 text-green-800', border: 'border-green-200' },
  neutra: { color: 'bg-gray-100 text-gray-800', border: 'border-gray-200' },
}

const ConversationsPage = () => {
  const { abTestGroup } = useAuth()
  const { entries, addEntry, deleteEntry, updateFeedback } = useConversations()
  const { toast } = useToast()
  const [newEntry, setNewEntry] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioDuration, setAudioDuration] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (audioURL) {
      audioRef.current = new Audio(audioURL)
      audioRef.current.onloadedmetadata = () => {
        setAudioDuration(audioRef.current?.duration || 0)
      }
    }
  }, [audioURL])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [entries])

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
      toast({
        title: 'Erro de Microfone',
        description:
          'Não consegui acessar seu microfone. Verifique as permissões do navegador.',
        variant: 'destructive',
      })
      setStatus('')
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
    updateFeedback(entryId, feedback)
  }

  const handleDeleteEntry = (entryId: string) => {
    deleteEntry(entryId)
    toast({
      title: 'Desabafo excluído',
      description: 'Sua mensagem foi removida com sucesso.',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEntry && !audioFile) return

    if (audioFile && audioDuration < 1) {
      toast({
        title: 'Áudio muito curto',
        description: 'Por favor, grave um áudio com pelo menos 1 segundo.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    let transcript = newEntry
    if (audioFile && !newEntry) {
      setStatus('Transcrevendo seu áudio...')
      transcript = await transcribeAudio(audioFile)
    }

    if (transcript.startsWith('ERRO:')) {
      toast({
        title: 'Falha na Transcrição',
        description: transcript,
        variant: 'destructive',
      })
      setStatus('')
      setIsLoading(false)
      return
    }
    setNewEntry(transcript)

    setStatus('Preparando uma resposta com carinho...')
    const {
      reply: motherReply,
      mood_label,
      professional_help_suggestion,
    } = await generateMotherReply(transcript, abTestGroup || 'A')

    const entry: VoiceEntry = {
      id: new Date().toISOString(),
      created_at: new Date().toISOString(),
      transcript,
      mood_label: mood_label as VoiceEntry['mood_label'],
      mother_reply: motherReply,
      audio_url: audioURL || undefined,
      feedback: { rating: null },
      professional_help_suggestion,
    }

    addEntry(entry)
    setNewEntry('')
    setAudioFile(null)
    setAudioURL(null)
    setAudioDuration(0)
    setStatus('')
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Diário de Voz</h1>
        <p className="text-muted-foreground mt-1">
          Um espaço seguro para você registrar seus sentimentos.
        </p>
      </div>
      <Card className="flex-grow flex flex-col">
        <CardContent className="p-0 flex-grow flex flex-col">
          <ScrollArea className="flex-grow p-6" viewportRef={scrollAreaRef}>
            {entries.length > 0 ? (
              <div className="space-y-6">
                {entries.map((entry) => (
                  <div key={entry.id} className="space-y-4 animate-fade-in-up">
                    <div className="flex items-start gap-3 justify-end group">
                      <div className="p-3 rounded-lg bg-secondary max-w-xl shadow-sm">
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
                      <div className="flex flex-col items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>V</AvatarFallback>
                        </Avatar>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Excluir este desabafo?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita. Seu desabafo e
                                a resposta da Mãe Amiga serão removidos
                                permanentemente.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteEntry(entry.id)}
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 group">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>MA</AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          'p-3 rounded-lg bg-primary/10 border max-w-xl shadow-sm',
                          moodMap[entry.mood_label]?.border || 'border-primary',
                        )}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium">Mãe Amiga</p>
                          <Badge
                            className={
                              moodMap[entry.mood_label]?.color || 'bg-gray-100'
                            }
                          >
                            {entry.mood_label}
                          </Badge>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">
                          {entry.mother_reply}
                        </p>
                        {entry.professional_help_suggestion && (
                          <Alert className="mt-4 bg-yellow-100 border-yellow-300 text-yellow-800">
                            <AlertTriangle className="h-4 w-4 !text-yellow-800" />
                            <AlertTitle>Uma observação importante</AlertTitle>
                            <AlertDescription>
                              {entry.professional_help_suggestion}
                            </AlertDescription>
                          </Alert>
                        )}
                        <FeedbackButtons
                          entryId={entry.id}
                          initialFeedback={entry.feedback}
                          onFeedbackSubmit={handleFeedbackSubmit}
                        />
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <SocialShareButtons
                            url={window.location.href}
                            title={`Um conselho da Mãe Amiga: "${entry.mother_reply.substring(0, 100)}..."`}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <MessageSquareHeart className="h-16 w-16 mb-4 text-primary animate-float" />
                <h3 className="text-xl font-semibold">
                  Como você está se sentindo hoje, filha?
                </h3>
                <p>Use o campo abaixo para começar seu primeiro desabafo.</p>
              </div>
            )}
          </ScrollArea>
          <div className="p-4 border-t bg-background">
            <form onSubmit={handleSubmit} className="space-y-3">
              <Textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="Escreva aqui ou grave um áudio..."
                className="flex-grow"
                disabled={isLoading}
                rows={3}
              />
              {audioURL && <AudioPlayer src={audioURL} />}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex gap-2">
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
                  disabled={isLoading || (!newEntry && !audioFile)}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  {isLoading ? status : 'Enviar'}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ConversationsPage
