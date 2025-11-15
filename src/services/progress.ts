import { supabase } from '@/lib/supabase/client'

export const getProgress = async (userId: string) => {
  const { data, error } = await supabase
    .from('cbt_progress')
    .select('course_slug, lesson_id')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching progress:', error)
    return []
  }
  return data
}

export const markLessonComplete = async (
  userId: string,
  courseSlug: string,
  lessonId: string,
) => {
  const { data, error } = await supabase
    .from('cbt_progress')
    .insert({
      user_id: userId,
      course_slug: courseSlug,
      lesson_id: lessonId,
    })
    .select()
    .single()

  if (error) {
    // Code for unique constraint violation
    if (error.code === '23505') {
      console.log('Lesson already completed.')
      return null // Or return existing record
    }
    console.error('Error marking lesson complete:', error)
    return null
  }
  return data
}
