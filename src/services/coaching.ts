import { supabase } from '@/lib/supabase/client'
import { CoachingSession, CoachingMessage } from '@/types'

export const getCoachingSessions = async (
  userId: string,
): Promise<CoachingSession[]> => {
  if (!userId) return []
  const { data, error } = await supabase
    .from('coaching_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false })

  if (error) {
    console.error('Error fetching coaching sessions:', error)
    return []
  }
  return data as CoachingSession[]
}

export const addCoachingSession = async (
  userId: string,
  session: Omit<CoachingSession, 'id' | 'messages'> & {
    messages: CoachingMessage[]
  },
): Promise<CoachingSession | null> => {
  const { data, error } = await supabase
    .from('coaching_sessions')
    .insert({ ...session, user_id: userId })
    .select()
    .single()

  if (error) {
    console.error('Error adding coaching session:', error)
    return null
  }
  return data as CoachingSession
}

export const updateCoachingSession = async (
  sessionId: string,
  updates: Partial<CoachingSession>,
): Promise<CoachingSession | null> => {
  const { data, error } = await supabase
    .from('coaching_sessions')
    .update(updates)
    .eq('id', sessionId)
    .select()
    .single()

  if (error) {
    console.error('Error updating coaching session:', error)
    return null
  }
  return data as CoachingSession
}
