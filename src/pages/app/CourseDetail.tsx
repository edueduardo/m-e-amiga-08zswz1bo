import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChevronLeft, CheckCircle, Loader2 } from 'lucide-react'
import { useGrowthGarden } from '@/contexts/GrowthGardenContext'
import { useGamification } from '@/contexts/GamificationContext'
import { SocialShareButtons } from '@/components/SocialShareButtons'
import { getCourseBySlug } from '@/services/courses'
import { Course } from '@/types'

const CourseDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { updateProgress } = useGrowthGarden()
  const { addPoints } = useGamification()
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      if (!slug) {
        setIsLoading(false)
        return
      }
      setIsLoading(true)
      const data = await getCourseBySlug(slug)
      setCourse(data)
      setIsLoading(false)
    }
    fetchCourse()
  }, [slug])

  const finishCourse = () => {
    if (!course) return
    addPoints(100, `Concluiu o curso: ${course.title}`)
    updateProgress('course')
    navigate('/app/courses')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

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
        <CardHeader className="p-6 border-b">
          <p className="text-sm text-muted-foreground mb-1">
            {course.category}
          </p>
          <h1 className="text-3xl font-bold">{course.title}</h1>
        </CardHeader>
        <CardContent className="p-6">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p>{course.description}</p>
            {/* Placeholder for actual course content */}
            <p>
              O conteúdo detalhado deste curso estará disponível em breve. Por
              enquanto, você pode marcar como concluído para registrar seu
              interesse e progresso.
            </p>
          </div>
        </CardContent>
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
  )
}

export default CourseDetailPage
