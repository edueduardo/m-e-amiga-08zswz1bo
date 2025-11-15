import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { InstallAppDialog } from '@/components/InstallAppDialog'
import { HeartPulse, Music, MessageCircleQuestion } from 'lucide-react'
import { SOSDialog } from '../SOSDialog'
import { AidaIndicator } from './AidaIndicator'
import { FreeSoundsDialog } from '../FreeSoundsDialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const carouselImages = [
  {
    src: 'https://img.usecurling.com/p/600/800?q=woman%20listening%20calmly',
    alt: 'Mulher ouvindo com calma',
  },
  {
    src: 'https://img.usecurling.com/p/600/800?q=woman%20smiling%20serenely',
    alt: 'Mulher sorrindo serenamente',
  },
  {
    src: 'https://img.usecurling.com/p/600/800?q=woman%20writing%20in%20journal',
    alt: 'Mulher escrevendo em um diário',
  },
]

export const HeroSection = () => {
  const { user } = useAuth()
  const [isInstallDialogOpen, setIsInstallDialogOpen] = useState(false)
  const [isSOSDialogOpen, setIsSOSDialogOpen] = useState(false)
  const [isFreeSoundsOpen, setIsFreeSoundsOpen] = useState(false)

  const getCtaLink = () => {
    if (user) return '/app'
    return '/signup'
  }

  const headline = 'Sinta-se ouvida. Encontre seu equilíbrio.'
  const subheadline =
    'Descubra também como ele pode pensar e reagir – uma ferramenta exclusiva para entender perspectivas masculinas.'

  return (
    <>
      <section className="relative w-full py-20 md:py-32 lg:py-40 xl:py-48 bg-secondary/50">
        <AidaIndicator principle="Attention" />
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  {headline}
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-muted-foreground md:text-xl">
                  <MessageCircleQuestion className="h-8 w-8 text-primary flex-shrink-0" />
                  <p className="mx-auto max-w-[700px]">{subheadline}</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Button asChild size="lg">
                  <Link to={getCtaLink()}>Começar meu acolhimento</Link>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setIsFreeSoundsOpen(true)}
                >
                  <Music className="mr-2 h-5 w-5" />
                  Experimentar Sons
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={() => setIsSOSDialogOpen(true)}
                >
                  <HeartPulse className="mr-2 h-5 w-5" />
                  Preciso de ajuda agora
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Carousel
                className="w-full max-w-sm"
                plugins={[Autoplay({ delay: 3000 })]}
                opts={{ loop: true }}
              >
                <CarouselContent>
                  {carouselImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="rounded-lg shadow-2xl object-cover aspect-[3/4] w-full"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>
      <InstallAppDialog
        open={isInstallDialogOpen}
        onOpenChange={setIsInstallDialogOpen}
      />
      <SOSDialog open={isSOSDialogOpen} onOpenChange={setIsSOSDialogOpen} />
      <FreeSoundsDialog
        open={isFreeSoundsOpen}
        onOpenChange={setIsFreeSoundsOpen}
      />
    </>
  )
}
