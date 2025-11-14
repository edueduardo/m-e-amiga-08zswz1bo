import { useSearchParams, Link } from 'react-router-dom'
import { microCourses, libraryResources } from '@/lib/data'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BookOpenCheck, Library } from 'lucide-react'

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const courseResults = microCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.summary.toLowerCase().includes(query.toLowerCase()),
  )

  const libraryResults = libraryResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(query.toLowerCase()) ||
      resource.description.toLowerCase().includes(query.toLowerCase()),
  )

  const totalResults = courseResults.length + libraryResults.length

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-3xl font-bold">Resultados da busca por: "{query}"</h1>
      <p className="text-muted-foreground mt-2">
        {totalResults} resultado(s) encontrado(s).
      </p>

      <div className="mt-8 space-y-8">
        {courseResults.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpenCheck className="h-6 w-6 text-primary" />
              Cursos
            </h2>
            <div className="space-y-4">
              {courseResults.map((course) => (
                <Link
                  key={course.id}
                  to={`/app/courses/${course.slug}`}
                  className="block"
                >
                  <Card className="hover:bg-secondary/50 transition-colors">
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.summary}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {libraryResults.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Library className="h-6 w-6 text-primary" />
              Biblioteca
            </h2>
            <div className="space-y-4">
              {libraryResults.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="hover:bg-secondary/50 transition-colors">
                    <CardHeader>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </a>
              ))}
            </div>
          </section>
        )}

        {totalResults === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              Nenhum resultado encontrado. Tente buscar por outras palavras.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResultsPage
