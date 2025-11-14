import { LucideIcon } from 'lucide-react'

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

export interface QuizResult {
  date: string
  answers: Record<string, string>
  plan: SelfCarePlan
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
  roomId: string
  authorAlias: string
  title: string
  content: string
  created_at: string
  replies: SupportReply[]
}

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
  type: 'affirmation' | 'hooponopono'
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
  duration_days?: number
  start_date?: string
  end_date?: string
  category: string
  community_challenge: boolean
  created_at: string
  // Frontend-specific properties
  steps?: ChallengeStep[]
  personalized_tip?: string
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

export interface AidaStory {
  attention: string
  interest: string
  desire: string
  action: string
}

export interface HooponoponoPractice {
  id: string
  title: string
  phrase: string
  explanation: string
  practice_tip: string
  aidaStory: AidaStory
}

export interface SoothingSound {
  id: string
  name: string
  url: string
  duration_seconds: number
}

export interface GamificationBadge {
  id: string
  name: string
  description: string
  icon: LucideIcon
}

export interface UserGamificationProfile {
  points: number
  level: number
  unlockedBadges: string[]
}

export interface HomePageLayoutItem {
  id: string
  visible: boolean
}

export interface UserPreferences {
  sosPracticeId: string
  sosSoundId: string
  home_page_layout?: HomePageLayoutItem[]
}

export interface HooponoponoJournalEntry {
  id: string
  date: string
  prompt: string
  content: string
}

export interface CommunityChallenge {
  id: string
  title: string
  description: string
  goal: number
  currentProgress: number
  unit: string
  rewardPoints: number
  endDate: string
}

export interface Playlist {
  id: string
  name: string
  trackIds: string[]
  created_at: string
}

export type CoachingMessageSender = 'ai' | 'user'
export type CoachingExerciseType = 'multiple-choice' | 'text-input' | 'rating'
export type CoachingSessionStatus = 'active' | 'completed' | 'paused'

export interface CoachingExercise {
  id: string
  type: CoachingExerciseType
  prompt: string
  options?: string[]
  response?: string | number
}

export interface CoachingMessage {
  id: string
  sender: CoachingMessageSender
  text: string
  timestamp: string
  exercise?: CoachingExercise
}

export interface CoachingSession {
  id: string
  title: string
  status: CoachingSessionStatus
  startedAt: string
  messages: CoachingMessage[]
}

export interface EmotionalPattern {
  id: string
  title: string
  description: string
  recommendation: string
  data: {
    labels: string[]
    values: number[]
  }
  chartType: 'line' | 'pie'
}

export interface ThematicRoom {
  id: string
  name: string
  description: string
  icon: LucideIcon
}

export type GardenElementStatus = 'seed' | 'seedling' | 'flower'

export interface GardenGoal {
  id: string
  title: string
  relatedFeature: 'journal' | 'challenge' | 'course'
  targetCount: number
  currentCount: number
}

export interface GardenElement {
  id: string
  goalId: string
  status: GardenElementStatus
  position: { x: number; y: number }
}

// New types based on user story
export interface Course {
  id: string
  title: string
  description: string
  content_url: string
  category: string
  created_at: string
}

export type NotificationType =
  | 'new_challenge'
  | 'circle_message'
  | 'app_update'
  | 'generic'

export interface Notification {
  id: string
  user_id: string
  notification_type: NotificationType
  message: string
  scheduled_at: string
  is_read: boolean
}
