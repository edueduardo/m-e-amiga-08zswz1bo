import { CourseLesson } from '@/types'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface VideoLessonProps {
  lesson: CourseLesson
}

export const VideoLesson = ({ lesson }: VideoLessonProps) => {
  if (!lesson.videoUrl) {
    return <p>Vídeo indisponível no momento.</p>
  }

  return (
    <div className="space-y-4">
      <AspectRatio ratio={16 / 9}>
        <iframe
          src={lesson.videoUrl}
          title={lesson.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg w-full h-full"
        ></iframe>
      </AspectRatio>
      {lesson.content && (
        <div
          className="prose dark:prose-invert max-w-none text-sm"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
      )}
    </div>
  )
}
