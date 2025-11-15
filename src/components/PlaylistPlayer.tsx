import { useState, useEffect, useRef, useCallback } from 'react'
import { Playlist, SoothingSound } from '@/types'
import { soothingSounds } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Play, Pause, SkipBack, SkipForward, ListMusic } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface PlaylistPlayerProps {
  playlist: Playlist
}

export const PlaylistPlayer = ({ playlist }: PlaylistPlayerProps) => {
  const tracks = playlist.track_ids
    .map((id) => soothingSounds.find((s) => s.id === id))
    .filter((track): track is SoothingSound => track !== undefined)

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = tracks[currentTrackIndex]

  const playNext = useCallback(() => {
    if (tracks.length === 0) return
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
  }, [tracks.length])

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.url
      if (isPlaying) {
        audioRef.current.play().catch(console.error)
      }
    }
  }, [currentTrackIndex, currentTrack, isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => setCurrentTime(audio.currentTime)
    const setAudioData = () => setDuration(audio.duration)
    const handleEnded = () => playNext()

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', setAudioData)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', setAudioData)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [playNext])

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play().catch(console.error)
    }
    setIsPlaying(!isPlaying)
  }

  const playPrev = () => {
    if (tracks.length === 0) return
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time) || time === Infinity) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  if (tracks.length === 0) {
    return (
      <Card className="text-center p-8">
        <ListMusic className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">
          Esta playlist está vazia. Adicione músicas para começar a ouvir.
        </p>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <audio ref={audioRef} />
      <CardHeader className="text-center">
        <CardTitle>{currentTrack?.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{playlist.name}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration || 1}
            step={1}
            onValueChange={handleSeek}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Button variant="ghost" size="icon" onClick={playPrev}>
            <SkipBack />
          </Button>
          <Button
            size="lg"
            className="rounded-full h-16 w-16"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8" />
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={playNext}>
            <SkipForward />
          </Button>
        </div>
        <div className="h-40 overflow-y-auto mt-4 border rounded-md p-2">
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className={cn(
                'p-2 rounded-md cursor-pointer hover:bg-secondary',
                index === currentTrackIndex && 'bg-primary/10 text-primary',
              )}
              onClick={() => setCurrentTrackIndex(index)}
            >
              {track.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
