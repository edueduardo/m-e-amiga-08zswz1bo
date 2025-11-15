import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { testimonials } from '@/lib/data'
import { AidaIndicator } from './AidaIndicator'

export const TestimonialsSection = () => {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <AidaIndicator principle="Desire" />
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            O que o coração delas diz sobre nós
          </h2>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                      <p className="text-lg italic">"{testimonial.quote}"</p>
                      <div className="flex items-center space-x-3 pt-4">
                        <Avatar>
                          <AvatarImage
                            src={testimonial.avatarUrl}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">
                          {testimonial.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
