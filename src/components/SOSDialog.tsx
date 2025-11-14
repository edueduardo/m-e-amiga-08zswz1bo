import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AudioPlayer } from './AudioPlayer'
import { HeartPulse, Wind, Sparkles } from 'lucide-react'
import { getDynamicHooponoponoPractice } from '@/lib/data'
import { HooponoponoPractice } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface SOSDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SOSDialog = ({ open, onOpenChange }: SOSDialogProps) => {
  const [practice, setPractice] = useState<HooponoponoPractice | null>(null)

  useEffect(() => {
    if (open) {
      // Fetches new content each time the dialog is opened, simulating the 12-hour refresh
      setPractice(getDynamicHooponoponoPractice())
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HeartPulse className="text-primary" />
            SOS - Um Momento de Paz
          </DialogTitle>
          <DialogDescription>
            Use estes recursos para encontrar um pouco de calma agora.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="hooponopono" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hooponopono">
              <Sparkles className="h-4 w-4 mr-1" /> Ho'oponopono
            </TabsTrigger>
            <TabsTrigger value="respiracao">
              <Wind className="h-4 w-4 mr-1" /> Respiração
            </TabsTrigger>
            <TabsTrigger value="audio">
              <HeartPulse className="h-4 w-4 mr-1" /> Áudio
            </TabsTrigger>
          </TabsList>
          <TabsContent value="hooponopono" className="mt-4">
            {practice && (
              <Card className="border-primary bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg">{practice.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-2xl font-semibold text-center italic text-primary">
                    "{practice.phrase}"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {practice.explanation}
                  </p>
                  <div>
                    <h4 className="font-semibold mb-1">Como praticar:</h4>
                    <p className="text-sm text-muted-foreground">
                      {practice.practice_tip}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="respiracao" className="mt-4">
            <div className="text-center space-y-4 p-4 border rounded-lg">
              <h3 className="font-semibold">Respiração Quadrada</h3>
              <p className="text-muted-foreground text-sm">
                Siga o guia para acalmar seu sistema nervoso.
              </p>
              <p className="text-lg">1. Inspire por 4 segundos.</p>
              <p className="text-lg">2. Segure o ar por 4 segundos.</p>
              <p className="text-lg">3. Expire por 4 segundos.</p>
              <p className="text-lg">4. Segure sem ar por 4 segundos.</p>
              <p className="text-sm text-muted-foreground pt-2">
                Repita o ciclo por 1 a 3 minutos.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="audio" className="mt-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-center">
                Áudio Calmante (3 min)
              </h3>
              <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" />
              <p className="text-sm text-muted-foreground text-center">
                Feche os olhos e permita-se relaxar.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
