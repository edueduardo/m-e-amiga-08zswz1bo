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

const PLAYLIST_KEY = 'mae-amiga-playlists'

interface PlaylistContextType {
  playlists: Playlist[]
  createPlaylist: (name: string) => void
  updatePlaylist: (playlistId: string, updates: Partial<Playlist>) => void
  deletePlaylist: (playlistId: string) => void
  getPlaylistById: (playlistId: string) => Playlist | undefined
}

export const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined,
)

export function PlaylistProvider({ children }: { children: ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    try {
      const stored = localStorage.getItem(PLAYLIST_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to parse playlists from localStorage', error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlists))
    } catch (error) {
      console.error('Failed to save playlists to localStorage', error)
    }
  }, [playlists])

  const createPlaylist = useCallback((name: string) => {
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      trackIds: [],
      created_at: new Date().toISOString(),
    }
    setPlaylists((prev) => [newPlaylist, ...prev])
  }, [])

  const updatePlaylist = useCallback(
    (playlistId: string, updates: Partial<Playlist>) => {
      setPlaylists((prev) =>
        prev.map((p) => (p.id === playlistId ? { ...p, ...updates } : p)),
      )
    },
    [],
  )

  const deletePlaylist = useCallback((playlistId: string) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId))
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
      createPlaylist,
      updatePlaylist,
      deletePlaylist,
      getPlaylistById,
    }),
    [
      playlists,
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
