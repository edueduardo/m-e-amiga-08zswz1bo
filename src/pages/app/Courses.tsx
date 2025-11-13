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
import { ArrowRight } from 'lucide-react'
import { microCourses } from '@/lib/data'

const CoursesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Minicursos</h1>
        <p className="text-muted-foreground">
          Aprenda habilidades práticas para o seu dia a dia.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {microCourses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardFooter>
              <Button asChild className="w-full">
                <Link to={`/app/courses/${course.slug}`}>
                  Ver curso <ArrowRight className="ml-2 h-4 w-4" />
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
