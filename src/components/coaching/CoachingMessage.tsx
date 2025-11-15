import { CoachingMessage as CoachingMessageType } from '@/types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { CoachingExerciseCard } from './CoachingExerciseCard'

interface CoachingMessageProps {
  message: CoachingMessageType
}

export const CoachingMessage = ({ message }: CoachingMessageProps) => {
  const isUser = message.sender === 'user'

  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>MA</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'p-3 rounded-lg max-w-lg shadow-sm',
          isUser ? 'bg-secondary' : 'bg-primary/10',
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        {message.exercise && (
          <CoachingExerciseCard exercise={message.exercise} />
        )}
      </div>
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>V</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
