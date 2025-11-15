import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { getDailyFreeContent } from '@/lib/data'
import { HooponoponoPractice, SoothingSound } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { AidaTooltip } from './AidaTooltip'
import { AudioPlayer } from './AudioPlayer'
import { Button } from './ui/button'
import { RefreshCw, Sparkles } from 'lucide-react'

interface FreeSoundsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const FreeSoundsDialog = ({
  open,
  onOpenChange,
}: FreeSoundsDialogProps) => {
  const [practice, setPractice] = useState<HooponoponoPractice | null>(null)
  const [sounds, setSounds] = useState<SoothingSound[]>([])

  const fetchDailyContent = () => {
    const { practice: dailyPractice, sounds: dailySounds } =
      getDailyFreeContent()
    setPractice(dailyPractice)
    setSounds(dailySounds)
  }

  useEffect(() => {
    if (open) {
      fetchDailyContent()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="text-primary" />
            Seu Momento de Paz Gratuito
          </DialogTitle>
          <DialogDescription>
            Uma prática e sons para te acalmar e trazer um momento de paz.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {practice && (
            <Card className="border-primary bg-primary/5 animate-fade-in">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-lg">{practice.title}</CardTitle>
                <AidaTooltip story={practice.aidaStory} />
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p className="text-2xl font-semibold italic text-primary">
                  "{practice.phrase}"
                </p>
              </CardContent>
            </Card>
          )}
          <div className="space-y-4">
            <h3 className="font-semibold">Sons para acompanhar:</h3>
            {sounds.map((sound) => (
              <div key={sound.id}>
                <p className="text-sm font-medium mb-1">{sound.name}</p>
                <AudioPlayer src={sound.url} />
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={fetchDailyContent}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Gerar novo conteúdo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
