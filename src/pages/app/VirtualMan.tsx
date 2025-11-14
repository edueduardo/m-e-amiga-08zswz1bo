import { useState } from 'react'
import { VirtualManProfile } from '@/types'
import { useVirtualMan } from '@/contexts/VirtualManContext'
import { ProfileSelector } from '@/components/virtual-man/ProfileSelector'
import { InteractionInterface } from '@/components/virtual-man/InteractionInterface'
import { AiResponseDisplay } from '@/components/virtual-man/AiResponseDisplay'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, History, UserRound } from 'lucide-react'

const VirtualManPage = () => {
  const { interactions, status, error, getInteraction } = useVirtualMan()
  const [selectedProfile, setSelectedProfile] =
    useState<VirtualManProfile>('marido')

  const handleSubmit = (query: string) => {
    getInteraction(query, selectedProfile)
  }

  const latestInteraction = interactions[0]
  const pastInteractions = interactions.slice(1)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <UserRound className="h-16 w-16 mx-auto text-primary animate-float" />
        <h1 className="text-3xl font-bold tracking-tight mt-4">
          Homem Virtual
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Entenda a perspectiva masculina sobre diversas situações para melhorar
          suas interações na vida real.
        </p>
      </div>

      <ProfileSelector
        selectedProfile={selectedProfile}
        onProfileChange={setSelectedProfile}
      />

      <InteractionInterface
        profile={selectedProfile}
        onSubmit={handleSubmit}
        isLoading={status === 'loading'}
      />

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {latestInteraction && status !== 'loading' && (
        <AiResponseDisplay interaction={latestInteraction} />
      )}

      {pastInteractions.length > 0 && (
        <div className="space-y-4 pt-8">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-2xl font-bold">Consultas Anteriores</h2>
          </div>
          <Separator />
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {pastInteractions.map((interaction) => (
                <AiResponseDisplay
                  key={interaction.id}
                  interaction={interaction}
                  isCollapsed={true}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

export default VirtualManPage
