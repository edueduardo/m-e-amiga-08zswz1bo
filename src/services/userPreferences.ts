import { supabase } from '@/lib/supabase/client'
import { UserPreferences, HomePageLayoutItem } from '@/types'

export const getUserPreferences = async (
  userId: string,
): Promise<Partial<UserPreferences>> => {
  if (!userId) return {}

  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user preferences:', error)
    return {}
  }

  return (data as Partial<UserPreferences>) || {}
}

export const updateUserPreferences = async (
  userId: string,
  preferences: Partial<UserPreferences>,
): Promise<boolean> => {
  if (!userId) return false

  const { data, error } = await supabase
    .from('user_preferences')
    .upsert({ user_id: userId, ...preferences }, { onConflict: 'user_id' })
    .select()
    .single()

  if (error) {
    console.error('Error updating user preferences:', error)
    return false
  }

  return !!data
}

export const updateUserHomePageLayout = async (
  userId: string,
  layout: HomePageLayoutItem[],
): Promise<boolean> => {
  return updateUserPreferences(userId, { home_page_layout: layout })
}
