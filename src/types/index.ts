export interface Testimonial {
  name: string
  quote: string
  avatarUrl: string
}

export interface CareRoutine {
  id: string
  title: string
  description: string
  estimated_minutes: number
  steps: string[]
}

export interface MicroLesson {
  id: string
  course_slug: string
  lesson_number: number
  title: string
  content_markdown: string
}

export interface MicroCourse {
  id: string
  slug: string
  title: string
  summary: string
  lessons: MicroLesson[]
}

export interface VoiceEntry {
  id: string
  created_at: string
  transcript: string
  mood_label: 'triste' | 'cansada' | 'ansiosa' | 'irritada' | 'feliz' | 'neutra'
  mother_reply: string
}

export interface WeeklySummary {
  id: string
  start_date: string
  end_date: string
  mood_overview: Record<string, number>
  summary_text: string
}

export interface UserProfile {
  id: string
  full_name: string
  email: string
}
