import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { AidaStory } from '@/types'
import { Info } from 'lucide-react'

interface AidaTooltipProps {
  story: AidaStory
}

export const AidaTooltip = ({ story }: AidaTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Info className="h-4 w-4 text-muted-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4" side="top">
          <div className="space-y-2">
            <h4 className="font-bold text-primary">A História por Trás</h4>
            <p className="text-xs">
              <strong className="font-semibold">Atenção:</strong>{' '}
              {story.attention}
            </p>
            <p className="text-xs">
              <strong className="font-semibold">Interesse:</strong>{' '}
              {story.interest}
            </p>
            <p className="text-xs">
              <strong className="font-semibold">Desejo:</strong> {story.desire}
            </p>
            <p className="text-xs">
              <strong className="font-semibold">Ação:</strong> {story.action}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
