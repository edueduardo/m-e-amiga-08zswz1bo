import { Star, StarHalf } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

const reviewsData = {
  average: 4.8,
  total: 1250,
  distribution: [
    { stars: 5, percentage: 85 },
    { stars: 4, percentage: 12 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 0 },
  ],
}

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="h-5 w-5 text-yellow-400 fill-yellow-400"
        />
      ))}
      {halfStar && (
        <StarHalf className="h-5 w-5 text-yellow-400 fill-yellow-400" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="h-5 w-5 text-yellow-200 fill-yellow-200"
        />
      ))}
    </div>
  )
}

export const UserReviewsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Avaliado com Carinho por Nossa Comunidade
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-5xl font-bold">{reviewsData.average}</span>
              <div>
                {renderStars(reviewsData.average)}
                <p className="text-sm text-muted-foreground">
                  Baseado em {reviewsData.total.toLocaleString('pt-BR')}{' '}
                  avaliações
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {reviewsData.distribution.map((dist) => (
              <div key={dist.stars} className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-12">
                  {dist.stars} estrelas
                </span>
                <Progress value={dist.percentage} className="flex-1" />
                <span className="text-sm text-muted-foreground w-10 text-right">
                  {dist.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
