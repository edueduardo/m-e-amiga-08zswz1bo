import { supabase } from '@/lib/supabase/client'
import { Notification } from '@/types'

export const getNotifications = async (
  userId: string,
): Promise<Notification[]> => {
  if (!userId) return []

  const { data, error } = await supabase
    .from('scheduled_notifications')
    .select('*')
    // In a real app, you would filter by user_id.
    // .eq('user_id', userId)
    .order('scheduled_at', { ascending: false })

  if (error) {
    console.error('Error fetching notifications:', error)
    return []
  }

  return data as Notification[]
}

export const markNotificationAsRead = async (
  notificationId: string,
): Promise<boolean> => {
  const { error } = await supabase
    .from('scheduled_notifications')
    .update({ is_read: true })
    .eq('id', notificationId)

  if (error) {
    console.error('Error marking notification as read:', error)
    return false
  }
  return true
}

export const markAllNotificationsAsRead = async (
  userId: string,
): Promise<boolean> => {
  if (!userId) return false

  const { error } = await supabase
    .from('scheduled_notifications')
    .update({ is_read: true })
    .eq('is_read', false)
  // In a real app, you would also filter by user_id.
  // .eq('user_id', userId)

  if (error) {
    console.error('Error marking all notifications as read:', error)
    return false
  }
  return true
}
