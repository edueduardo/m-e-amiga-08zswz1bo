import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpenCheck, Sparkles } from 'lucide-react'
import { getDynamicMicroCourses } from '@/lib/data'
import { MicroCourse } from '@/types'
import { Badge } from '@/components/ui/badge'

const CoursesPage = () => {
  const [courses, setCourses] = useState<MicroCourse[]>([])

  useEffect(() => {
    // Simulates content refreshing daily by refreshing on component mount
    setCourses(getDynamicMicroCourses())
  }, [])

  return (
    <div className="space-y-8">
      <div className="text-center">
        <BookOpenCheck className="h-16 w-16 mx-auto text-primary animate-float" />
        <h1 className="text-3xl font-bold tracking-tight mt-4">
          Aprenda habilidades práticas para o seu dia a dia
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Minicursos gerados por IA e adaptados para você, com lições curtas e
          diretas, pensadas com carinho. O conteúdo é atualizado diariamente.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <Card
            key={course.id}
            className="flex flex-col hover:shadow-xl hover:-translate-y-1 transition-transform animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              {course.isAiGenerated && (
                <Badge variant="secondary" className="absolute top-3 right-3">
                  <Sparkles className="h-3 w-3 mr-1" />
                  IA
                </Badge>
              )}
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <CardDescription>{course.summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground">
                {course.lessons.length > 0
                  ? `${course.lessons.length} lições`
                  : 'Em breve'}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full"
                disabled={course.lessons.length === 0}
              >
                <Link to={`/app/courses/${course.slug}`}>
                  Começar curso <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CoursesPage
