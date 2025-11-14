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

export type FeedbackRating = 'helpful' | 'not_helpful' | null

export interface Feedback {
  rating: FeedbackRating
  comment?: string
}

export interface VoiceEntry {
  id: string
  created_at: string
  transcript: string
  mood_label: 'triste' | 'cansada' | 'ansiosa' | 'irritada' | 'feliz' | 'neutra'
  mother_reply: string
  audio_url?: string
  feedback?: Feedback
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
  phone_number?: string
  is_email_verified?: boolean
  is_phone_verified?: boolean
  is_two_factor_enabled?: boolean
}
