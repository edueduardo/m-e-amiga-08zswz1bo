import { supabase } from '@/lib/supabase/client'
import { SupportPost, SupportReply, ThematicRoom } from '@/types'
import {
  Baby,
  HeartCrack,
  Briefcase,
  User,
  Heart,
  LucideIcon,
} from 'lucide-react'

const iconMap: { [key: string]: LucideIcon } = {
  Baby,
  HeartCrack,
  Briefcase,
  User,
  Heart,
}

export const getRooms = async (): Promise<ThematicRoom[]> => {
  const { data, error } = await supabase.from('support_rooms').select('*')
  if (error) {
    console.error('Error fetching rooms:', error)
    return []
  }
  return data.map((room) => ({
    ...room,
    icon: iconMap[room.icon_name] || User,
  })) as ThematicRoom[]
}

export const getPosts = async (roomId: string): Promise<SupportPost[]> => {
  const { data, error } = await supabase
    .from('support_posts')
    .select('*, support_replies(*)')
    .eq('room_id', roomId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }
  return data as SupportPost[]
}

export const addPost = async (
  userId: string,
  post: Omit<SupportPost, 'id' | 'created_at' | 'replies'>,
): Promise<SupportPost | null> => {
  const { data, error } = await supabase
    .from('support_posts')
    .insert({ ...post, user_id: userId })
    .select()
    .single()

  if (error) {
    console.error('Error adding post:', error)
    return null
  }
  return { ...data, replies: [] } as SupportPost
}

export const addReply = async (
  userId: string,
  reply: Omit<SupportReply, 'id' | 'created_at'>,
): Promise<SupportReply | null> => {
  const { data, error } = await supabase
    .from('support_replies')
    .insert({ ...reply, user_id: userId })
    .select()
    .single()

  if (error) {
    console.error('Error adding reply:', error)
    return null
  }
  return data as SupportReply
}
