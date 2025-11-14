import { supabase } from '@/lib/supabase/client'
import { TeamMember } from '@/types'

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const { data, error } = await supabase.from('team_members').select('*')

  if (error) {
    console.error('Error fetching team members:', error)
    return []
  }

  return data as TeamMember[]
}
