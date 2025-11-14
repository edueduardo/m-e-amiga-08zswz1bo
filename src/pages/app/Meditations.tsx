import { useState, useEffect } from 'react'
import { getDynamicMeditations, getDynamicGuidedAudios } from '@/lib/data'
import { MeditationAudio } from '@/types'
import { AudioPlayer } from '@/components/AudioPlayer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Headphones, Wind } from 'lucide-react'

const AudioCard = ({ audio }: { audio: MeditationAudio }) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} min`
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-base">{audio.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span>{audio.theme}</span>
          <span>{formatDuration(audio.duration_seconds)}</span>
        </div>
        <AudioPlayer src={audio.audio_url} />
      </CardContent>
    </Card>
  )
}

const MeditationsPage = () => {
  const [meditations, setMeditations] = useState<MeditationAudio[]>([])
  const [guidedAudios, setGuidedAudios] = useState<MeditationAudio[]>([])

  useEffect(() => {
    // Simulates content refreshing every 12 hours by refreshing on component mount
    setMeditations(getDynamicMeditations())
    setGuidedAudios(getDynamicGuidedAudios())
  }, [])

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Wind className="h-8 w-8 text-primary" />
          <h2 className="text-2xl font-bold">Meditações Rápidas</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {meditations.map((med) => (
            <AudioCard key={med.id} audio={med} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Headphones className="h-8 w-8 text-primary" />
          <h2 className="text-2xl font-bold">Áudios Guiados</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {guidedAudios.map((audio) => (
            <AudioCard key={audio.id} audio={audio} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default MeditationsPage
