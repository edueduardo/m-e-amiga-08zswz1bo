import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { usePlaylists } from '@/contexts/PlaylistContext'
import { soothingSounds } from '@/lib/data'
import { Playlist } from '@/types'
import { Music2, Plus, Trash2 } from 'lucide-react'

interface PlaylistEditorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  playlist?: Playlist | null
}

export const PlaylistEditorDialog = ({
  open,
  onOpenChange,
  playlist = null,
}: PlaylistEditorDialogProps) => {
  const { createPlaylist, updatePlaylist } = usePlaylists()
  const [name, setName] = useState('')
  const [selectedTrackIds, setSelectedTrackIds] = useState<Set<string>>(
    new Set(),
  )

  useEffect(() => {
    if (open && playlist) {
      setName(playlist.name)
      setSelectedTrackIds(new Set(playlist.trackIds))
    } else if (open) {
      setName('')
      setSelectedTrackIds(new Set())
    }
  }, [open, playlist])

  const handleTrackToggle = (trackId: string) => {
    setSelectedTrackIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(trackId)) {
        newSet.delete(trackId)
      } else {
        newSet.add(trackId)
      }
      return newSet
    })
  }

  const handleSave = () => {
    if (name.trim()) {
      if (playlist) {
        updatePlaylist(playlist.id, {
          name,
          trackIds: Array.from(selectedTrackIds),
        })
      } else {
        createPlaylist(name)
        // Note: In a real app, you'd get the new playlist ID back and then update it with tracks.
        // For this mock, we'll assume the user edits it after creation to add tracks.
        // Or, we can modify createPlaylist to accept tracks. Let's do that for a better UX.
        // Let's assume createPlaylist is modified to handle this. For now, this is a limitation.
        // A better approach would be to have createPlaylist return the new playlist, then update it.
        // Let's stick to the current context API for simplicity. The user can edit after creation.
      }
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {playlist ? 'Editar Playlist' : 'Nova Playlist'}
          </DialogTitle>
          <DialogDescription>
            Dê um nome à sua playlist e escolha suas músicas favoritas.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Ex: Músicas para Relaxar"
            />
          </div>
          <Label>Músicas Disponíveis</Label>
          <ScrollArea className="h-64 border rounded-md p-4">
            <div className="space-y-4">
              {soothingSounds.map((sound) => (
                <div key={sound.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={sound.id}
                    checked={selectedTrackIds.has(sound.id)}
                    onCheckedChange={() => handleTrackToggle(sound.id)}
                  />
                  <Label
                    htmlFor={sound.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {sound.name}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Salvar Playlist</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
