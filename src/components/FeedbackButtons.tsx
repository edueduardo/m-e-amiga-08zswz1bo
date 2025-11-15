import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Feedback, FeedbackRating } from '@/types'

interface FeedbackButtonsProps {
  entryId: string
  initialFeedback?: Feedback
  onFeedbackSubmit: (entryId: string, feedback: Feedback) => void
}

export const FeedbackButtons = ({
  entryId,
  initialFeedback,
  onFeedbackSubmit,
}: FeedbackButtonsProps) => {
  const [rating, setRating] = useState<FeedbackRating>(
    initialFeedback?.rating || null,
  )
  const [comment, setComment] = useState(initialFeedback?.comment || '')
  const [popoverOpen, setPopoverOpen] = useState(false)

  const handleRating = (newRating: FeedbackRating) => {
    const finalRating = rating === newRating ? null : newRating
    setRating(finalRating)
    onFeedbackSubmit(entryId, { rating: finalRating, comment })
  }

  const handleCommentSubmit = () => {
    onFeedbackSubmit(entryId, { rating, comment })
    setPopoverOpen(false)
  }

  return (
    <div className="flex items-center gap-2 mt-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleRating('helpful')}
      >
        <ThumbsUp
          className={cn(
            'h-4 w-4',
            rating === 'helpful' && 'fill-green-500 text-green-500',
          )}
        />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleRating('not_helpful')}
      >
        <ThumbsDown
          className={cn(
            'h-4 w-4',
            rating === 'not_helpful' && 'fill-red-500 text-red-500',
          )}
        />
      </Button>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="link" className="text-xs p-0 h-auto">
            Deixar comentário
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Seu feedback</h4>
              <p className="text-sm text-muted-foreground">
                O que podemos melhorar nesta resposta?
              </p>
            </div>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Sua opinião é muito importante..."
            />
            <Button onClick={handleCommentSubmit}>Enviar</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
