import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Heart, Clock } from 'lucide-react'
import { careRoutines } from '@/lib/data'
import { CareRoutine } from '@/types'
import { cn } from '@/lib/utils'

const CareRoutineDetail = ({ routine }: { routine: CareRoutine }) => {
  const [favorites, setFavorites] = useState<string[]>([])

  const isFavorited = favorites.includes(routine.id)

  const toggleFavorite = () => {
    setFavorites((prev) =>
      isFavorited
        ? prev.filter((id) => id !== routine.id)
        : [...prev, routine.id],
    )
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-2xl">{routine.title}</DialogTitle>
      </DialogHeader>
      <div className="py-4 space-y-4">
        <p className="text-muted-foreground">{routine.description}</p>
        <div className="space-y-3">
          <h4 className="font-semibold">Passos:</h4>
          {routine.steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox id={`step-${index}`} />
              <Label htmlFor={`step-${index}`}>{step}</Label>
            </div>
          ))}
        </div>
      </div>
      <Button
        onClick={toggleFavorite}
        variant="ghost"
        className="w-full justify-center gap-2"
      >
        <Heart
          className={cn('h-5 w-5', isFavorited && 'fill-red-500 text-red-500')}
        />
        {isFavorited ? 'Remover dos Favoritos' : 'Favoritar'}
      </Button>
    </DialogContent>
  )
}

const CarePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Trilhas de Autocuidado</h1>
        <p className="text-muted-foreground">
          Pequenos rituais para você se reconectar consigo mesma.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {careRoutines.map((routine) => (
          <Dialog key={routine.id}>
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>{routine.title}</CardTitle>
                <CardDescription>{routine.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{routine.estimated_minutes} min</span>
                </div>
              </CardContent>
              <CardFooter>
                <DialogTrigger asChild>
                  <Button className="w-full">Começar</Button>
                </DialogTrigger>
              </CardFooter>
            </Card>
            <CareRoutineDetail routine={routine} />
          </Dialog>
        ))}
      </div>
    </div>
  )
}

export default CarePage
