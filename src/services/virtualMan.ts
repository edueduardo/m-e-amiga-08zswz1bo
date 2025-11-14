import { supabase } from '@/lib/supabase/client'
import {
  VirtualManInteraction,
  VirtualManAiResponse,
  VirtualManProfile,
} from '@/types'
import { Database } from '@/lib/supabase/types'

export type VirtualManProfileFromDB =
  Database['public']['Tables']['virtual_man_profiles']['Row']

export const getVirtualManProfiles = async (): Promise<
  VirtualManProfileFromDB[]
> => {
  const { data, error } = await supabase
    .from('virtual_man_profiles')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching virtual man profiles:', error)
    return []
  }
  return data
}

export const getVirtualManInteractions = async (
  userId: string,
): Promise<VirtualManInteraction[]> => {
  if (!userId) return []
  const { data, error } = await supabase
    .from('virtual_man_interactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching virtual man interactions:', error)
    return []
  }
  return data as VirtualManInteraction[]
}

export const addVirtualManInteraction = async (interaction: {
  userId: string
  profile: VirtualManProfile
  query: string
  response: VirtualManAiResponse
}): Promise<VirtualManInteraction | null> => {
  const { data, error } = await supabase
    .from('virtual_man_interactions')
    .insert({
      user_id: interaction.userId,
      profile_selected: interaction.profile,
      user_query: interaction.query,
      ai_response: interaction.response,
    })
    .select()
    .single()

  if (error) {
    console.error('Error adding virtual man interaction:', error)
    return null
  }
  return data as VirtualManInteraction
}

export const updateVirtualManInteractionFeedback = async (
  interactionId: string,
  feedback: { rating: 'helpful' | 'not_helpful'; comment?: string },
): Promise<VirtualManInteraction | null> => {
  const { data, error } = await supabase
    .from('virtual_man_interactions')
    .update({
      feedback_rating: feedback.rating,
      feedback_comment: feedback.comment,
    })
    .eq('id', interactionId)
    .select()
    .single()

  if (error) {
    console.error('Error updating feedback:', error)
    return null
  }
  return data as VirtualManInteraction
}
