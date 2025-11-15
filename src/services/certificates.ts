import { supabase } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'

export type Certificate =
  Database['public']['Tables']['user_certificates']['Row']

export const getCertificates = async (
  userId: string,
): Promise<Certificate[]> => {
  if (!userId) return []

  const { data, error } = await supabase
    .from('user_certificates')
    .select('*')
    .eq('user_id', userId)
    .order('completion_date', { ascending: false })

  if (error) {
    console.error('Error fetching certificates:', error)
    return []
  }
  return data
}
