import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { InstallAppDialog } from '@/components/InstallAppDialog'
import { HeartPulse } from 'lucide-react'
import { SOSDialog } from '../SOSDialog'

export const HeroSection = () => {
  const { isAuthenticated, isSubscribed } = useAuth()
  const [isInstallDialogOpen, setIsInstallDialogOpen] = useState(false)
  const [isSOSDialogOpen, setIsSOSDialogOpen] = useState(false)

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

  return (
    <>
      <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Sinta-se ouvida. Encontre seu equilíbrio.
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                O apoio emocional que você merece, no seu tempo. Grave seus
                desabafos e receba o carinho e a sabedoria de uma mãe e melhor
                amiga, com a ajuda da IA.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to={getCtaLink()}>Começar meu acolhimento</Link>
              </Button>
              <Button variant="outline" size="lg" onClick={handleScroll}>
                Ver como funciona
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
        </div>
      </section>
      <InstallAppDialog
        open={isInstallDialogOpen}
        onOpenChange={setIsInstallDialogOpen}
      />
      <SOSDialog open={isSOSDialogOpen} onOpenChange={setIsSOSDialogOpen} />
    </>
  )
}
