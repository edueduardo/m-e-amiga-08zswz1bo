import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react'
import { useAuth } from './AuthContext'
import { getProgress, markLessonComplete } from '@/services/progress'

type ProgressRecord = { course_slug: string; lesson_id: string }

interface ProgressContextType {
  progress: ProgressRecord[]
  isLoading: boolean
  markAsComplete: (courseSlug: string, lessonId: string) => Promise<void>
  isCompleted: (lessonId: string) => boolean
}

export const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined,
)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [progress, setProgress] = useState<ProgressRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchProgress = useCallback(async () => {
    if (user) {
      setIsLoading(true)
      const data = await getProgress(user.id)
      setProgress(data)
      setIsLoading(false)
    } else {
      setProgress([])
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchProgress()
  }, [fetchProgress])

  const isCompleted = useCallback(
    (lessonId: string) => {
      return progress.some((p) => p.lesson_id === lessonId)
    },
    [progress],
  )

  const markAsComplete = useCallback(
    async (courseSlug: string, lessonId: string) => {
      if (!user || isCompleted(lessonId)) return
      const result = await markLessonComplete(user.id, courseSlug, lessonId)
      if (result) {
        setProgress((prev) => [
          ...prev,
          { course_slug: courseSlug, lesson_id: lessonId },
        ])
      }
    },
    [user, isCompleted],
  )

  const value = useMemo(
    () => ({
      progress,
      isLoading,
      markAsComplete,
      isCompleted,
    }),
    [progress, isLoading, markAsComplete, isCompleted],
  )

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}
