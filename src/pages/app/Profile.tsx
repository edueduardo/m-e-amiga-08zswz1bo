import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useGamification } from '@/contexts/GamificationContext'
import { useAuth } from '@/hooks/useAuth'
import { gamificationBadges } from '@/lib/data'
import { Award, Star } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const ProfilePage = () => {
  const { profile: authProfile } = useAuth()
  const { profile: gamificationProfile } = useGamification()
  const pointsForNextLevel = gamificationProfile.level * 100
  const progressToNextLevel =
    ((gamificationProfile.points - (gamificationProfile.level - 1) * 100) /
      100) *
    100

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Sua Jornada de Cuidado</h1>
        <p className="text-muted-foreground mt-1">
          Veja seu progresso e suas conquistas.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Olá, {authProfile?.full_name}!</CardTitle>
          <CardDescription>
            Continue se dedicando ao seu bem-estar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Star className="h-16 w-16 text-yellow-400 fill-yellow-300" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl text-yellow-800">
                {gamificationProfile.level}
              </span>
            </div>
            <div className="flex-grow space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Nível {gamificationProfile.level}</span>
                <span>
                  {gamificationProfile.points} / {pointsForNextLevel} Pontos
                </span>
              </div>
              <Progress value={progressToNextLevel} />
              <p className="text-xs text-muted-foreground text-right">
                {pointsForNextLevel - gamificationProfile.points} pontos para o
                próximo nível
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suas Medalhas</CardTitle>
          <CardDescription>
            Conquistas desbloqueadas na sua jornada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 text-center">
            {gamificationBadges.map((badge) => {
              const isUnlocked = gamificationProfile.unlockedBadges.includes(
                badge.id,
              )
              return (
                <TooltipProvider key={badge.id}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className={cn(
                          'flex flex-col items-center gap-2 transition-opacity',
                          !isUnlocked && 'opacity-30',
                        )}
                      >
                        <div
                          className={cn(
                            'p-4 rounded-full bg-secondary',
                            isUnlocked && 'bg-primary/10',
                          )}
                        >
                          <badge.icon
                            className={cn(
                              'h-8 w-8 text-muted-foreground',
                              isUnlocked && 'text-primary',
                            )}
                          />
                        </div>
                        <span className="text-xs font-semibold">
                          {badge.name}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-bold">{badge.name}</p>
                      <p>{badge.description}</p>
                      {!isUnlocked && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Bloqueada
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePage
