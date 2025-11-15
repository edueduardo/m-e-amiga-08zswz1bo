import { useState } from 'react'
import { MeditationAudio, Playlist } from '@/types'
import { AudioPlayer } from '@/components/AudioPlayer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Headphones,
  Wind,
  Music2,
  PlusCircle,
  MoreHorizontal,
  Loader2,
} from 'lucide-react'
import { usePlaylists } from '@/contexts/PlaylistContext'
import { Button } from '@/components/ui/button'
import { PlaylistEditorDialog } from '@/components/PlaylistEditorDialog'
import { PlaylistPlayer } from '@/components/PlaylistPlayer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { soothingSounds } from '@/lib/data'

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

const MusicPage = () => {
  const { playlists, isLoading, deletePlaylist } = usePlaylists()
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null,
  )
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null)

  const handleEditPlaylist = (playlist: Playlist) => {
    setEditingPlaylist(playlist)
    setIsEditorOpen(true)
  }

  const handleNewPlaylist = () => {
    setEditingPlaylist(null)
    setIsEditorOpen(true)
  }

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music2 className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold">Minhas Playlists</h2>
          </div>
          <Button onClick={handleNewPlaylist}>
            <PlusCircle className="mr-2 h-4 w-4" /> Nova Playlist
          </Button>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : playlists.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {playlists.map((playlist) => (
              <Card
                key={playlist.id}
                className="cursor-pointer hover:shadow-lg"
                onClick={() => setSelectedPlaylist(playlist)}
              >
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>{playlist.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditPlaylist(playlist)
                        }}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          deletePlaylist(playlist.id)
                        }}
                      >
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {playlist.track_ids.length} músicas
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Você ainda não criou nenhuma playlist.
          </p>
        )}
      </section>

      {selectedPlaylist && <PlaylistPlayer playlist={selectedPlaylist} />}

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Wind className="h-8 w-8 text-primary" />
          <h2 className="text-2xl font-bold">Sons Relaxantes</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {soothingSounds.map((sound) => (
            <AudioCard
              key={sound.id}
              audio={{
                id: sound.id,
                title: sound.name,
                theme: 'relaxation',
                duration_seconds: sound.duration_seconds,
                audio_url: sound.url,
              }}
            />
          ))}
        </div>
      </section>

      <PlaylistEditorDialog
        open={isEditorOpen}
        onOpenChange={setIsEditorOpen}
        playlist={editingPlaylist}
      />
    </div>
  )
}

export default MusicPage
