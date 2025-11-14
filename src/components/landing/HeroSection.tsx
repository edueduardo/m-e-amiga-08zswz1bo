import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { InstallAppDialog } from '@/components/InstallAppDialog'
import { HeartPulse, Music } from 'lucide-react'
import { SOSDialog } from '../SOSDialog'
import { AidaIndicator } from './AidaIndicator'
import { HooponoponoDisplay } from '../HooponoponoDisplay'
import { FreeSoundsDialog } from '../FreeSoundsDialog'

export const HeroSection = () => {
  const { isAuthenticated, isSubscribed, abTestGroup } = useAuth()
  const [isInstallDialogOpen, setIsInstallDialogOpen] = useState(false)
  const [isSOSDialogOpen, setIsSOSDialogOpen] = useState(false)
  const [isFreeSoundsOpen, setIsFreeSoundsOpen] = useState(false)

  const getCtaLink = () => {
    if (isAuthenticated && isSubscribed) return '/app'
    if (isAuthenticated && !isSubscribed) return '/pricing'
    return '/signup'
  }

  const handleScroll = () => {
    document
      .getElementById('how-it-works')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const headline =
    abTestGroup === 'B'
      ? 'Cansada de se sentir sobrecarregada? Encontre seu alívio aqui.'
      : 'Sinta-se ouvida. Encontre seu equilíbrio.'
  const subheadline =
    abTestGroup === 'B'
      ? 'Mãe Amiga é o seu espaço de acolhimento 24/7. Desabafe por áudio e receba conselhos carinhosos de uma IA que te entende. Comece a se sentir melhor hoje.'
      : 'Para você, mulher casada, que se sente sobrecarregada e anseia por um espaço seguro para desabafar. Receba o carinho e a sabedoria de uma mãe e melhor amiga, a qualquer hora.'

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
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {subheadline}
                </p>
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
                  Sons e músicas de Ho'oponopono
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
              <HooponoponoDisplay variant="random" />
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
