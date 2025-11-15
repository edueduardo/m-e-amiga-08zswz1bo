import { supabase } from '@/lib/supabase/client'
import { UserPreferences, HomePageLayoutItem } from '@/types'

// This is a placeholder user ID. In a real app, you'd get this from the auth context.
const FAKE_USER_ID = '00000000-0000-0000-0000-000000000000'

export const getUserPreferences = async (
  userId: string,
): Promise<Partial<UserPreferences>> => {
  // Using a placeholder ID for now as the table is not linked to auth.users
  const { data, error } = await supabase
    .from('user_preferences')
    .select('home_page_layout')
    .limit(1)
    .single()
  // .eq('user_id', userId)

  if (error && error.code !== 'PGRST116') {
    // PGRST116: "The result contains 0 rows" which is not an error for us
    console.error('Error fetching user preferences:', error)
    return {}
  }

  return (data as Partial<UserPreferences>) || {}
}

export const updateUserHomePageLayout = async (
  userId: string,
  layout: HomePageLayoutItem[],
): Promise<boolean> => {
  // Using a placeholder ID for now
  const { error } = await supabase
    .from('user_preferences')
    .upsert(
      { id: FAKE_USER_ID, user_id: userId, home_page_layout: layout },
      { onConflict: 'id' },
    )

  if (error) {
    console.error('Error updating home page layout:', error)
    return false
  }

  return true
}
