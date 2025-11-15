import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle, Sprout, Loader2 } from 'lucide-react'
import { useGrowthGarden } from '@/contexts/GrowthGardenContext'
import { GardenPlot } from '@/components/garden/GardenPlot'
import { GoalSetterDialog } from '@/components/garden/GoalSetterDialog'

const GrowthGardenPage = () => {
  const { goals, elements, isLoading } = useGrowthGarden()
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold">Seu Jardim do Crescimento</h1>
          <p className="text-muted-foreground mt-1">
            Veja seus objetivos florescerem à medida que você se cuida.
          </p>
        </div>
        <Button onClick={() => setIsGoalDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Plantar um Novo Objetivo
        </Button>
      </div>

      <div className="relative w-full aspect-[2/1] bg-green-100 dark:bg-green-900/20 rounded-lg border-2 border-dashed border-green-300 dark:border-green-800 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-green-700" />
          </div>
        ) : elements.length > 0 ? (
          <GardenPlot elements={elements} goals={goals} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-green-700 dark:text-green-300">
            <Sprout className="h-16 w-16 mb-4" />
            <h3 className="text-xl font-semibold">Seu jardim está pronto!</h3>
            <p>Plante seu primeiro objetivo para começar a cultivar.</p>
          </div>
        )}
      </div>
      <GoalSetterDialog
        open={isGoalDialogOpen}
        onOpenChange={setIsGoalDialogOpen}
      />
    </div>
  )
}

export default GrowthGardenPage
