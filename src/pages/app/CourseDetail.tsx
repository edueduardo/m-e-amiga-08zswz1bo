import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { microCourses } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CourseDetailPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const course = microCourses.find((c) => c.slug === slug)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)

  if (!course) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Curso não encontrado</h2>
        <p className="text-muted-foreground">
          O curso que você está procurando não existe.
        </p>
        <Button asChild variant="link" className="mt-4">
          <Link to="/app/courses">Voltar para os cursos</Link>
        </Button>
      </div>
    )
  }

  const lesson = course.lessons[currentLessonIndex]
  const isFirstLesson = currentLessonIndex === 0
  const isLastLesson = currentLessonIndex === course.lessons.length - 1

  const goToNextLesson = () => {
    if (!isLastLesson) {
      setCurrentLessonIndex((prev) => prev + 1)
    }
  }

  const goToPrevLesson = () => {
    if (!isFirstLesson) {
      setCurrentLessonIndex((prev) => prev - 1)
    }
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate('/app/courses')}>
        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Cursos
      </Button>
      <Card>
        <CardHeader>
          <p className="text-sm text-muted-foreground">{course.title}</p>
          <CardTitle className="text-3xl">{lesson.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-lg max-w-none prose-blockquote:bg-primary/10 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:p-4 prose-blockquote:rounded-r-md"
            dangerouslySetInnerHTML={{
              __html: lesson.content_markdown.replace(/\n/g, '<br />'),
            }}
          />
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button onClick={goToPrevLesson} disabled={isFirstLesson}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Lição Anterior
        </Button>
        <Button onClick={goToNextLesson} disabled={isLastLesson}>
          Próxima Lição <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default CourseDetailPage
