import { CourseLesson } from '@/types'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface DownloadLessonProps {
  lesson: CourseLesson
}

export const DownloadLesson = ({ lesson }: DownloadLessonProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-secondary rounded-lg">
      <div className="flex-grow">
        <p className="font-semibold">Material de Apoio</p>
        <p className="text-sm text-muted-foreground">{lesson.content}</p>
      </div>
      <Button asChild>
        <a href={lesson.downloadUrl} download>
          <Download className="mr-2 h-4 w-4" />
          Baixar Material
        </a>
      </Button>
    </div>
  )
}
