import { supabase } from '@/lib/supabase/client'
import { CustomReminder } from '@/types'

export const getReminders = async (
  userId: string,
): Promise<CustomReminder[]> => {
  if (!userId) return []

  const { data, error } = await supabase
    .from('custom_reminders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reminders:', error)
    return []
  }

  return data as CustomReminder[]
}

export const addReminder = async (
  reminder: Omit<CustomReminder, 'id' | 'created_at' | 'is_active'>,
): Promise<CustomReminder | null> => {
  const { data, error } = await supabase
    .from('custom_reminders')
    .insert(reminder)
    .select()
    .single()

  if (error) {
    console.error('Error adding reminder:', error)
    return null
  }

  return data as CustomReminder
}

export const updateReminder = async (
  reminderId: string,
  updates: Partial<CustomReminder>,
): Promise<CustomReminder | null> => {
  const { data, error } = await supabase
    .from('custom_reminders')
    .update(updates)
    .eq('id', reminderId)
    .select()
    .single()

  if (error) {
    console.error('Error updating reminder:', error)
    return null
  }

  return data as CustomReminder
}

export const deleteReminder = async (reminderId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('custom_reminders')
    .delete()
    .eq('id', reminderId)

  if (error) {
    console.error('Error deleting reminder:', error)
    return false
  }

  return true
}
