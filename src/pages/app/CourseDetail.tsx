import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { microCourses } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { useGrowthGarden } from '@/contexts/GrowthGardenContext'
import { useGamification } from '@/contexts/GamificationContext'
import { SocialShareButtons } from '@/components/SocialShareButtons'

const CourseDetailPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { updateProgress } = useGrowthGarden()
  const { addPoints } = useGamification()
  const course = microCourses.find((c) => c.slug === slug)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(
    new Set(),
  )

  useEffect(() => {
    setCompletedLessons(new Set())
    setCurrentLessonIndex(0)
  }, [slug])

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
  const progressValue =
    ((completedLessons.size + (isLastLesson ? 1 : 0)) / course.lessons.length) *
    100

  const markLessonAsComplete = () => {
    if (!completedLessons.has(currentLessonIndex)) {
      setCompletedLessons((prev) => new Set(prev).add(currentLessonIndex))
      addPoints(20, `Completou uma lição do curso: ${course.title}`)
    }
  }

  const goToNextLesson = () => {
    if (!isLastLesson) {
      markLessonAsComplete()
      setCurrentLessonIndex((prev) => prev + 1)
    }
  }

  const goToPrevLesson = () => {
    if (!isFirstLesson) {
      setCurrentLessonIndex((prev) => prev - 1)
    }
  }

  const finishCourse = () => {
    markLessonAsComplete()
    addPoints(100, `Concluiu o curso: ${course.title}`)
    updateProgress('course')
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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
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
        <SocialShareButtons
          url={window.location.href}
          title={`Estou fazendo o curso "${course.title}" no Mãe Amiga!`}
        />
      </div>
    </div>
  )
}

export default CourseDetailPage
