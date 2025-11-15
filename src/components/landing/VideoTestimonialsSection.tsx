import { Card, CardContent } from '@/components/ui/card'
import { PlayCircle } from 'lucide-react'

const videoTestimonials = [
  {
    name: 'Mariana V.',
    thumbnailUrl:
      'https://img.usecurling.com/p/400/225?q=woman%20smiling%20at%20camera',
    duration: '1:15',
  },
  {
    name: 'Fernanda L.',
    thumbnailUrl:
      'https://img.usecurling.com/p/400/225?q=woman%20talking%20in%20living%20room',
    duration: '2:03',
  },
  {
    name: 'Beatriz C.',
    thumbnailUrl:
      'https://img.usecurling.com/p/400/225?q=woman%20laughing%20outdoors',
    duration: '0:58',
  },
]

export const VideoTestimonialsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Histórias que Inspiram
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Veja como a Mãe Amiga tem feito a diferença na vida de outras
            mulheres.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:grid-cols-3">
          {videoTestimonials.map((video, index) => (
            <Card
              key={index}
              className="overflow-hidden group cursor-pointer"
              onClick={() => alert('Player de vídeo em breve!')}
            >
              <CardContent className="p-0 relative">
                <img
                  src={video.thumbnailUrl}
                  alt={`Depoimento de ${video.name}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-white/80 group-hover:text-white transition-colors" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
                <p className="absolute top-2 left-2 text-white font-semibold">
                  {video.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
