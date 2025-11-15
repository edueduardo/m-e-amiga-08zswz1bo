import { CourseLesson } from '@/types'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface VideoLessonProps {
  lesson: CourseLesson
}

export const VideoLesson = ({ lesson }: VideoLessonProps) => {
  if (!lesson.videoUrl) {
    return <p>Vídeo indisponível.</p>
  }

  return (
    <div>
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
    </div>
  )
}
