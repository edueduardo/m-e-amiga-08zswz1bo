import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChevronLeft,
  CheckCircle,
  Loader2,
  Clock,
  BookText,
  Video,
  Download,
} from 'lucide-react'
import { useGrowthGarden } from '@/contexts/GrowthGardenContext'
import { useGamification } from '@/contexts/GamificationContext'
import { SocialShareButtons } from '@/components/SocialShareButtons'
import { getCourseBySlug, getCourseContent } from '@/services/courses'
import { Course, CourseContent, CourseLesson, CourseLessonType } from '@/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { TextLesson } from '@/components/course/TextLesson'
import { VideoLesson } from '@/components/course/VideoLesson'
import { DownloadLesson } from '@/components/course/DownloadLesson'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const lessonIconMap: Record<CourseLessonType, React.ElementType> = {
  text: BookText,
  video: Video,
  download: Download,
}

const CourseDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { updateProgress } = useGrowthGarden()
  const { addPoints } = useGamification()
  const [course, setCourse] = useState<Course | null>(null)
  const [courseContent, setCourseContent] = useState<CourseContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(null)

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!slug) {
        setIsLoading(false)
        return
      }
      setIsLoading(true)
      const courseData = await getCourseBySlug(slug)
      setCourse(courseData)

      if (courseData?.content_url) {
        const contentData = await getCourseContent(courseData.content_url)
        setCourseContent(contentData)
        if (contentData?.modules[0]?.lessons[0]) {
          setActiveLesson(contentData.modules[0].lessons[0])
        }
      }
      setIsLoading(false)
    }
    fetchCourseData()
  }, [slug])

  const finishCourse = () => {
    if (!course) return
    addPoints(100, `Concluiu o curso: ${course.title}`)
    updateProgress('course')
    navigate('/app/courses')
  }

  const renderLessonContent = () => {
    if (!activeLesson) {
      return (
        <p className="text-muted-foreground">
          Selecione uma aula para começar.
        </p>
      )
    }
    switch (activeLesson.type) {
      case 'text':
        return <TextLesson lesson={activeLesson} />
      case 'video':
        return <VideoLesson lesson={activeLesson} />
      case 'download':
        return <DownloadLesson lesson={activeLesson} />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!course || !courseContent) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold">Curso não encontrado</h2>
        <p className="text-muted-foreground mt-2">
          O conteúdo para este curso não pôde ser carregado.
        </p>
        <Button
          asChild
          variant="link"
          className="mt-4"
          onClick={() => navigate('/app/courses')}
        >
          <a>Voltar para os cursos</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate('/app/courses')}
        className="text-muted-foreground"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Cursos
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">
                {course.category}
              </Badge>
              <h1 className="text-3xl font-bold">{activeLesson?.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </CardHeader>
            <CardContent>{renderLessonContent()}</CardContent>
          </Card>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button onClick={finishCourse} size="lg">
              <CheckCircle className="mr-2 h-4 w-4" /> Marcar como Concluído
            </Button>
            <SocialShareButtons
              url={window.location.href}
              title={`Estou fazendo o curso "${course.title}" no Mãe Amiga!`}
            />
          </div>
        </div>

        <Card className="lg:col-span-1 h-fit sticky top-24">
          <CardHeader>
            <CardTitle>Conteúdo do Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion
              type="single"
              collapsible
              defaultValue={courseContent.modules[0]?.id}
              className="w-full"
            >
              {courseContent.modules.map((module) => (
                <AccordionItem value={module.id} key={module.id}>
                  <AccordionTrigger>{module.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => {
                        const Icon = lessonIconMap[lesson.type]
                        return (
                          <Button
                            key={lesson.id}
                            variant={
                              activeLesson?.id === lesson.id
                                ? 'secondary'
                                : 'ghost'
                            }
                            className="w-full justify-start h-auto py-2"
                            onClick={() => setActiveLesson(lesson)}
                          >
                            <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                            <div className="flex flex-col items-start">
                              <span className="text-left">{lesson.title}</span>
                              {lesson.durationMinutes && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {lesson.durationMinutes} min
                                </span>
                              )}
                            </div>
                          </Button>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CourseDetailPage
