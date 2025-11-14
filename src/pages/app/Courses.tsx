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
import { ArrowRight, BookOpenCheck } from 'lucide-react'
import { microCourses } from '@/lib/data'

const CoursesPage = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <BookOpenCheck className="h-16 w-16 mx-auto text-primary animate-float" />
        <h1 className="text-3xl font-bold tracking-tight mt-4">Minicursos</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Aprenda habilidades práticas para o seu dia a dia em lições curtas e
          diretas, pensadas com carinho para você.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {microCourses.map((course, index) => (
          <Card
            key={course.id}
            className="flex flex-col hover:shadow-xl hover:-translate-y-1 transition-transform animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader>
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <CardDescription>{course.summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground">
                {course.lessons.length} lições
              </div>
            </CardContent>
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
