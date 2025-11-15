import { supabase } from '@/lib/supabase/client'
import { PlannerTask, PlannerTaskStatus } from '@/types'

export const getPlannerTasks = async (
  userId: string,
): Promise<PlannerTask[]> => {
  if (!userId) return []
  const { data, error } = await supabase
    .from('planner_tasks')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching planner tasks:', error)
    return []
  }
  return data as PlannerTask[]
}

export const addPlannerTask = async (
  userId: string,
  content: string,
): Promise<PlannerTask | null> => {
  const { data, error } = await supabase
    .from('planner_tasks')
    .insert({ user_id: userId, content, due_date: new Date().toISOString() })
    .select()
    .single()

  if (error) {
    console.error('Error adding planner task:', error)
    return null
  }
  return data as PlannerTask
}

export const updatePlannerTaskStatus = async (
  taskId: string,
  newStatus: PlannerTaskStatus,
): Promise<PlannerTask | null> => {
  const { data, error } = await supabase
    .from('planner_tasks')
    .update({ status: newStatus })
    .eq('id', taskId)
    .select()
    .single()

  if (error) {
    console.error('Error updating planner task status:', error)
    return null
  }
  return data as PlannerTask
}
