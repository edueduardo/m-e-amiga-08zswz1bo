import { cn } from '@/lib/utils'
import {
  Target,
  Sparkles,
  Heart,
  ArrowRightCircle,
  LucideIcon,
} from 'lucide-react'

type AidaPrinciple = 'Attention' | 'Interest' | 'Desire' | 'Action'

interface AidaIndicatorProps {
  principle: AidaPrinciple
  className?: string
}

const principleMap: Record<
  AidaPrinciple,
  { Icon: LucideIcon; text: string; color: string }
> = {
  Attention: {
    Icon: Target,
    text: 'Atenção',
    color: 'text-blue-500',
  },
  Interest: {
    Icon: Sparkles,
    text: 'Interesse',
    color: 'text-purple-500',
  },
  Desire: { Icon: Heart, text: 'Desejo', color: 'text-pink-500' },
  Action: {
    Icon: ArrowRightCircle,
    text: 'Ação',
    color: 'text-green-500',
  },
}

export const AidaIndicator = ({ principle, className }: AidaIndicatorProps) => {
  const { Icon, text, color } = principleMap[principle]

  return (
    <div
      className={cn(
        'absolute -top-4 -left-4 z-10 flex items-center gap-2 rounded-full bg-background px-3 py-1.5 text-sm font-semibold shadow-lg animate-fade-in-up',
        color,
        className,
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{text}</span>
    </div>
  )
}
