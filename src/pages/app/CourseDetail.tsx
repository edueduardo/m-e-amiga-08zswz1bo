import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { microCourses } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const CourseDetailPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const course = microCourses.find((c) => c.slug === slug)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)

  if (!course) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold">Curso não encontrado</h2>
        <p className="text-muted-foreground mt-2">
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
  const progressValue = ((currentLessonIndex + 1) / course.lessons.length) * 100

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

  const finishCourse = () => {
    navigate('/app/courses')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate('/app/courses')}
        className="text-muted-foreground"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Cursos
      </Button>
      <Card className="overflow-hidden">
        <div className="p-6 border-b">
          <p className="text-sm text-muted-foreground mb-1">{course.title}</p>
          <h1 className="text-3xl font-bold">{lesson.title}</h1>
          <div className="flex items-center gap-4 mt-4">
            <Progress value={progressValue} className="w-full" />
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Lição {currentLessonIndex + 1} de {course.lessons.length}
            </span>
          </div>
        </div>
        <CardContent className="p-6">
          <div
            className="prose prose-lg max-w-none dark:prose-invert prose-blockquote:bg-primary/10 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:p-4 prose-blockquote:rounded-r-md"
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
        {isLastLesson ? (
          <Button onClick={finishCourse}>
            <CheckCircle className="mr-2 h-4 w-4" /> Concluir Curso
          </Button>
        ) : (
          <Button onClick={goToNextLesson}>
            Próxima Lição <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default CourseDetailPage
