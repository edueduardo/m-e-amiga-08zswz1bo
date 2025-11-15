import { useState, useEffect, DragEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { GripVertical } from 'lucide-react'
import { useLayout, defaultDashboardCards } from '@/contexts/LayoutContext'
import { HomePageLayoutItem } from '@/types'
import { useToast } from './ui/use-toast'
import { cn } from '@/lib/utils'

interface HomePageCustomizerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const HomePageCustomizer = ({
  open,
  onOpenChange,
}: HomePageCustomizerProps) => {
  const { layout, updateLayout, resetLayout } = useLayout()
  const { toast } = useToast()
  const [localLayout, setLocalLayout] = useState<HomePageLayoutItem[]>([])
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null)

  useEffect(() => {
    if (open) {
      // Sync local state with context when dialog opens
      setLocalLayout(layout)
    }
  }, [open, layout])

  const handleVisibilityChange = (id: string, checked: boolean) => {
    setLocalLayout((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, visible: checked } : item,
      ),
    )
  }

  const handleSave = async () => {
    await updateLayout(localLayout)
    toast({
      title: 'Página inicial salva!',
      description: 'Seu layout personalizado foi salvo com sucesso.',
    })
    onOpenChange(false)
  }

  const handleReset = async () => {
    await resetLayout()
    toast({
      title: 'Layout redefinido',
      description: 'A página inicial foi restaurada para o padrão.',
    })
    onOpenChange(false)
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItemIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    if (draggedItemIndex === null || draggedItemIndex === index) return

    const items = Array.from(localLayout)
    const [reorderedItem] = items.splice(draggedItemIndex, 1)
    items.splice(index, 0, reorderedItem)

    setDraggedItemIndex(index)
    setLocalLayout(items)
  }

  const handleDragEnd = () => {
    setDraggedItemIndex(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Personalizar Página Inicial</DialogTitle>
          <DialogDescription>
            Arraste para reordenar e ative ou desative os cards que você deseja
            ver.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-2 max-h-96 overflow-y-auto">
          {localLayout.map((item, index) => {
            const cardInfo = defaultDashboardCards.find((c) => c.id === item.id)
            if (!cardInfo) return null

            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg border bg-secondary/50 cursor-grab',
                  draggedItemIndex === index && 'opacity-50',
                )}
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <Label htmlFor={`switch-${item.id}`}>{cardInfo.title}</Label>
                </div>
                <Switch
                  id={`switch-${item.id}`}
                  checked={item.visible}
                  onCheckedChange={(checked) =>
                    handleVisibilityChange(item.id, checked)
                  }
                />
              </div>
            )
          })}
        </div>
        <DialogFooter className="sm:justify-between">
          <Button variant="ghost" onClick={handleReset}>
            Resetar
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
