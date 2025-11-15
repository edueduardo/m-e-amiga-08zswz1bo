import { GardenElement, GardenGoal } from '@/types'
import { Seedling } from './Seedling'
import { Flower } from './Flower'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface GardenPlotProps {
  elements: GardenElement[]
  goals: GardenGoal[]
}

export const GardenPlot = ({ elements, goals }: GardenPlotProps) => {
  return (
    <div className="w-full h-full relative">
      {elements.map((element) => {
        const goal = goals.find((g) => g.id === element.goalId)
        if (!goal) return null

        const renderElement = () => {
          switch (element.status) {
            case 'seed':
              return <div className="w-4 h-4 bg-yellow-900 rounded-full" />
            case 'seedling':
              return <Seedling />
            case 'flower':
              return <Flower />
            default:
              return null
          }
        }

        return (
          <TooltipProvider key={element.id}>
            <Tooltip>
              <TooltipTrigger
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${element.position.x}%`,
                  top: `${element.position.y}%`,
                }}
              >
                {renderElement()}
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-bold">{goal.title}</p>
                <p>
                  Progresso: {goal.currentCount} / {goal.targetCount}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      })}
    </div>
  )
}
