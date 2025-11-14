import { supabase } from '@/lib/supabase/client'
import { Course } from '@/types'

export const getCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase.from('courses').select('*')

  if (error) {
    console.error('Error fetching courses:', error)
    return []
  }

  // The type from Supabase might not match exactly, so we cast it.
  // In a real app, you might want to do more robust validation (e.g., with Zod).
  return data as Course[]
}

export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  // Assuming the content_url is in the format /app/courses/{slug}
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('content_url', `/app/courses/${slug}`)
    .single()

  if (error) {
    console.error(`Error fetching course with slug ${slug}:`, error)
    return null
  }

  return data as Course | null
}
