import { CourseLesson } from '@/types'

interface TextLessonProps {
  lesson: CourseLesson
}

export const TextLesson = ({ lesson }: TextLessonProps) => {
  return (
    <div
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: lesson.content || '' }}
    />
  )
}
