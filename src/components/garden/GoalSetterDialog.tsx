import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useGrowthGarden } from '@/contexts/GrowthGardenContext'
import { GardenGoal } from '@/types'

interface GoalSetterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const GoalSetterDialog = ({
  open,
  onOpenChange,
}: GoalSetterDialogProps) => {
  const { addGoal } = useGrowthGarden()
  const [title, setTitle] = useState('')
  const [feature, setFeature] = useState<GardenGoal['relatedFeature'] | ''>('')
  const [target, setTarget] = useState(5)

  const handleSave = () => {
    if (title.trim() && feature) {
      addGoal({
        title,
        relatedFeature: feature,
        targetCount: target,
      })
      onOpenChange(false)
      setTitle('')
      setFeature('')
      setTarget(5)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Plantar um Novo Objetivo</DialogTitle>
          <DialogDescription>
            Defina uma meta de autocuidado. Ela se tornará uma semente no seu
            jardim.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Nome do Objetivo</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Praticar gratidão"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feature">Área de Foco</Label>
            <Select
              value={feature}
              onValueChange={(val) =>
                setFeature(val as GardenGoal['relatedFeature'])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="journal">Diário Ho'oponopono</SelectItem>
                <SelectItem value="challenge">Desafios Semanais</SelectItem>
                <SelectItem value="course">Minicursos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="target">Meta</Label>
            <Input
              id="target"
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              min={1}
            />
            <p className="text-xs text-muted-foreground">
              Quantas vezes você quer completar esta ação?
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Plantar Objetivo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
