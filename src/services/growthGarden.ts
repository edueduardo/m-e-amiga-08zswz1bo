import { supabase } from '@/lib/supabase/client'
import { GardenGoal, GardenElement } from '@/types'

export const getGardenData = async (
  userId: string,
): Promise<{ goals: GardenGoal[]; elements: GardenElement[] }> => {
  if (!userId) return { goals: [], elements: [] }

  const [goalsRes, elementsRes] = await Promise.all([
    supabase.from('growth_garden_goals').select('*').eq('user_id', userId),
    supabase.from('growth_garden_elements').select('*').eq('user_id', userId),
  ])

  if (goalsRes.error) console.error('Error fetching goals:', goalsRes.error)
  if (elementsRes.error)
    console.error('Error fetching elements:', elementsRes.error)

  return {
    goals: (goalsRes.data as GardenGoal[]) || [],
    elements: (elementsRes.data as GardenElement[]) || [],
  }
}

export const addGardenGoal = async (
  userId: string,
  goal: Omit<GardenGoal, 'id' | 'currentCount'>,
): Promise<{ newGoal: GardenGoal; newElement: GardenElement } | null> => {
  const { data: newGoal, error: goalError } = await supabase
    .from('growth_garden_goals')
    .insert({ ...goal, user_id: userId })
    .select()
    .single()

  if (goalError || !newGoal) {
    console.error('Error adding goal:', goalError)
    return null
  }

  const { data: newElement, error: elementError } = await supabase
    .from('growth_garden_elements')
    .insert({
      user_id: userId,
      goal_id: newGoal.id,
      position: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
    })
    .select()
    .single()

  if (elementError || !newElement) {
    console.error('Error adding element:', elementError)
    // Rollback goal creation? For now, we'll just log the error.
    return null
  }

  return {
    newGoal: newGoal as GardenGoal,
    newElement: newElement as GardenElement,
  }
}

export const updateGardenGoal = async (
  goalId: string,
  updates: Partial<GardenGoal>,
): Promise<GardenGoal | null> => {
  const { data, error } = await supabase
    .from('growth_garden_goals')
    .update(updates)
    .eq('id', goalId)
    .select()
    .single()

  if (error) {
    console.error('Error updating goal:', error)
    return null
  }
  return data as GardenGoal
}

export const updateGardenElement = async (
  elementId: string,
  updates: Partial<GardenElement>,
): Promise<GardenElement | null> => {
  const { data, error } = await supabase
    .from('growth_garden_elements')
    .update(updates)
    .eq('id', elementId)
    .select()
    .single()

  if (error) {
    console.error('Error updating element:', error)
    return null
  }
  return data as GardenElement
}
