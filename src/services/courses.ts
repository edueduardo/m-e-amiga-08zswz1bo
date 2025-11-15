import { supabase } from '@/lib/supabase/client'
import { Course, CourseContent } from '@/types'

export const getCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase.from('courses').select('*')

  if (error) {
    console.error('Error fetching courses:', error)
    return []
  }
  return data as Course[]
}

export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(`Error fetching course with slug ${slug}:`, error)
    return null
  }

  return data as Course | null
}

export const getCourseContent = async (
  contentUrl: string,
): Promise<CourseContent | null> => {
  if (!contentUrl) return null
  try {
    const response = await fetch(contentUrl)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data as CourseContent
  } catch (error) {
    console.error('Error fetching course content:', error)
    return null
  }
}
