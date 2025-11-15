import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { Playlist } from '@/types'
import { useAuth } from '@/contexts/AuthContext'
import {
  getPlaylists,
  createPlaylist as createPlaylistService,
  updatePlaylist as updatePlaylistService,
  deletePlaylist as deletePlaylistService,
} from '@/services/playlists'

interface PlaylistContextType {
  playlists: Playlist[]
  isLoading: boolean
  createPlaylist: (name: string) => Promise<void>
  updatePlaylist: (
    playlistId: string,
    updates: Partial<Playlist>,
  ) => Promise<void>
  deletePlaylist: (playlistId: string) => Promise<void>
  getPlaylistById: (playlistId: string) => Playlist | undefined
}

export const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined,
)

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (user) {
        setIsLoading(true)
        const data = await getPlaylists(user.id)
        setPlaylists(data)
        setIsLoading(false)
      } else {
        setPlaylists([])
        setIsLoading(false)
      }
    }
    fetchPlaylists()
  }, [user])

  const createPlaylist = useCallback(
    async (name: string) => {
      if (!user) return
      const newPlaylist = await createPlaylistService(user.id, name)
      if (newPlaylist) {
        setPlaylists((prev) => [newPlaylist, ...prev])
      }
    },
    [user],
  )

  const updatePlaylist = useCallback(
    async (playlistId: string, updates: Partial<Playlist>) => {
      const updatedPlaylist = await updatePlaylistService(playlistId, updates)
      if (updatedPlaylist) {
        setPlaylists((prev) =>
          prev.map((p) => (p.id === playlistId ? updatedPlaylist : p)),
        )
      }
    },
    [],
  )

  const deletePlaylist = useCallback(async (playlistId: string) => {
    const success = await deletePlaylistService(playlistId)
    if (success) {
      setPlaylists((prev) => prev.filter((p) => p.id !== playlistId))
    }
  }, [])

  const getPlaylistById = useCallback(
    (playlistId: string) => {
      return playlists.find((p) => p.id === playlistId)
    },
    [playlists],
  )

  const value = useMemo(
    () => ({
      playlists,
      isLoading,
      createPlaylist,
      updatePlaylist,
      deletePlaylist,
      getPlaylistById,
    }),
    [
      playlists,
      isLoading,
      createPlaylist,
      updatePlaylist,
      deletePlaylist,
      getPlaylistById,
    ],
  )

  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  )
}

export const usePlaylists = () => {
  const context = useContext(PlaylistContext)
  if (context === undefined) {
    throw new Error('usePlaylists must be used within a PlaylistProvider')
  }
  return context
}
