import { supabase } from '@/lib/supabase/client'
import { VoiceEntry, Feedback } from '@/types'

export const getConversations = async (
  userId: string,
): Promise<VoiceEntry[]> => {
  if (!userId) return []
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching conversations:', error)
    return []
  }
  return data as VoiceEntry[]
}

export const addConversation = async (
  userId: string,
  entry: Omit<VoiceEntry, 'id' | 'created_at' | 'feedback'>,
): Promise<VoiceEntry | null> => {
  const { data, error } = await supabase
    .from('conversations')
    .insert({ ...entry, user_id: userId })
    .select()
    .single()

  if (error) {
    console.error('Error adding conversation:', error)
    return null
  }
  return data as VoiceEntry
}

export const deleteConversation = async (entryId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('id', entryId)

  if (error) {
    console.error('Error deleting conversation:', error)
    return false
  }
  return true
}

export const deleteAllConversations = async (
  userId: string,
): Promise<boolean> => {
  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('user_id', userId)

  if (error) {
    console.error('Error deleting all conversations:', error)
    return false
  }
  return true
}

export const updateConversationFeedback = async (
  entryId: string,
  feedback: Feedback,
): Promise<boolean> => {
  const { error } = await supabase
    .from('conversations')
    .update({ feedback })
    .eq('id', entryId)

  if (error) {
    console.error('Error updating feedback:', error)
    return false
  }
  return true
}
