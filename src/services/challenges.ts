import { supabase } from '@/lib/supabase/client'
import { Challenge } from '@/types'

export const getChallenges = async (): Promise<Challenge[]> => {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .eq('community_challenge', false)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching challenges:', error)
    return []
  }

  // In a real app, you would fetch steps for each challenge or model the data differently.
  // For now, we'll mock the steps on the frontend based on the challenge type.
  return data as Challenge[]
}

export const getCommunityChallenges = async (): Promise<Challenge[]> => {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .eq('community_challenge', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching community challenges:', error)
    return []
  }

  return data as Challenge[]
}
