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
  isAiGenerated?: boolean
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
  professional_help_suggestion?: string
}

export interface WeeklySummary {
  id: string
  start_date: string
  end_date: string
  mood_overview: Record<string, number>
  summary_text: string
}

export type PhoneVerificationStatus =
  | 'verified'
  | 'pending_email'
  | 'not_verified'

export interface UserProfile {
  id: string
  full_name: string
  email: string
  phone_number?: string
  is_email_verified?: boolean
  phone_verification_status?: PhoneVerificationStatus
  is_two_factor_enabled?: boolean
}

export interface QuizQuestion {
  id: string
  question: string
  type: 'multiple-choice' | 'text' | 'rorschach'
  options?: string[]
  imageUrl?: string
}

export type AiTone = 'amoras' | 'reais duros' | 'impactantes'

export interface SelfCareAction {
  title: string
  description: string
}

export interface SelfCarePlan {
  tone: AiTone
  monthlyFocus: SelfCareAction
  weeklyFocus: SelfCareAction
  dailyFocus: SelfCareAction
  professional_help_suggestion?: string
}

export interface SupportReply {
  id: string
  postId: string
  authorAlias: string
  content: string
  created_at: string
}

export interface SupportPost {
  id: string
  authorAlias: string
  title: string
  content: string
  created_at: string
  replies: SupportReply[]
}

// New Types for Well-being Features
export interface MeditationAudio {
  id: string
  title: string
  theme: 'relaxation' | 'focus' | 'sleep' | 'gratitude' | 'self-esteem'
  duration_seconds: number
  audio_url: string
}

export interface Affirmation {
  id: string
  text: string
  mood_target: 'general' | 'sadness' | 'anxiety' | 'stress' | 'confidence'
}

export type PlannerTaskStatus = 'todo' | 'in-progress' | 'done'

export interface PlannerTask {
  id: string
  content: string
  status: PlannerTaskStatus
  due_date?: string
}

export interface ChallengeStep {
  id: string
  description: string
  is_completed: boolean
}

export interface Challenge {
  id: string
  title: string
  description: string
  theme: 'communication' | 'gratitude' | 'organization' | 'self-care'
  steps: ChallengeStep[]
  personalized_tip: string
}

export type LibraryResourceType = 'article' | 'video' | 'book'

export interface LibraryResource {
  id: string
  title: string
  description: string
  type: LibraryResourceType
  url: string
  cover_image_url: string
  topic:
    | 'mental_health'
    | 'relationships'
    | 'motherhood'
    | 'personal_development'
}
