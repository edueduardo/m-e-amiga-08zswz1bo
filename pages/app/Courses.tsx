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
import { ArrowRight, BookOpenCheck, Loader2 } from 'lucide-react'
import { Course } from '@/types'
import { Badge } from '@/components/ui/badge'
import { getCourses } from '@/services/courses'

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true)
      const data = await getCourses()
      setCourses(data)
      setIsLoading(false)
    }
    fetchCourses()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <BookOpenCheck className="h-16 w-16 mx-auto text-primary animate-float" />
        <h1 className="text-3xl font-bold tracking-tight mt-4">
          Aprenda habilidades práticas para o seu dia a dia
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Minicursos com lições curtas e diretas, pensadas com carinho para
          você.
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
              <Badge variant="secondary" className="w-fit">
                {course.category}
              </Badge>
              <CardTitle className="text-xl pt-2">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardFooter>
              <Button asChild className="w-full">
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
