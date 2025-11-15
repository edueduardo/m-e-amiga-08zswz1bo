import { supabase } from '@/lib/supabase/client'
import { Playlist } from '@/types'

export const getPlaylists = async (userId: string): Promise<Playlist[]> => {
  if (!userId) return []
  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching playlists:', error)
    return []
  }
  return data as Playlist[]
}

export const createPlaylist = async (
  userId: string,
  name: string,
): Promise<Playlist | null> => {
  const { data, error } = await supabase
    .from('playlists')
    .insert({ user_id: userId, name })
    .select()
    .single()

  if (error) {
    console.error('Error creating playlist:', error)
    return null
  }
  return data as Playlist
}

export const updatePlaylist = async (
  playlistId: string,
  updates: Partial<Omit<Playlist, 'id' | 'user_id'>>,
): Promise<Playlist | null> => {
  const { data, error } = await supabase
    .from('playlists')
    .update(updates)
    .eq('id', playlistId)
    .select()
    .single()

  if (error) {
    console.error('Error updating playlist:', error)
    return null
  }
  return data as Playlist
}

export const deletePlaylist = async (playlistId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('playlists')
    .delete()
    .eq('id', playlistId)

  if (error) {
    console.error('Error deleting playlist:', error)
    return false
  }
  return true
}
