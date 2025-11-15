import { supabase } from '@/lib/supabase/client'
import { UserGamificationProfile } from '@/types'

export const getGamificationProfile = async (
  userId: string,
): Promise<UserGamificationProfile | null> => {
  if (!userId) return null
  const { data, error } = await supabase
    .from('gamification_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching gamification profile:', error)
    return null
  }
  return data as UserGamificationProfile
}

export const updateGamificationProfile = async (
  userId: string,
  updates: Partial<UserGamificationProfile>,
): Promise<UserGamificationProfile | null> => {
  const { data, error } = await supabase
    .from('gamification_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) {
    console.error('Error updating gamification profile:', error)
    return null
  }
  return data as UserGamificationProfile
}
