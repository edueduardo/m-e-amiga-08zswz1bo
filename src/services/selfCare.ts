import { supabase } from '@/lib/supabase/client'
import { QuizResult, SelfCarePlan } from '@/types'

export const getSelfCareHistory = async (
  userId: string,
): Promise<QuizResult[]> => {
  if (!userId) return []
  const { data, error } = await supabase
    .from('self_care_history')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching self-care history:', error)
    return []
  }
  return data as QuizResult[]
}

export const saveSelfCareResult = async (
  userId: string,
  answers: Record<string, string>,
  plan: SelfCarePlan,
): Promise<QuizResult | null> => {
  const { data, error } = await supabase
    .from('self_care_history')
    .insert({
      user_id: userId,
      date: new Date().toISOString(),
      answers,
      plan,
    })
    .select()
    .single()

  if (error) {
    console.error('Error saving self-care result:', error)
    return null
  }
  return data as QuizResult
}
