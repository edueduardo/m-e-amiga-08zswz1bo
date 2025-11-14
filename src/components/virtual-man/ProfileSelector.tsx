import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Label } from '@/components/ui/label'
import { VirtualManProfile } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ProfileSelectorProps {
  selectedProfile: VirtualManProfile
  onProfileChange: (profile: VirtualManProfile) => void
}

export const ProfileSelector = ({
  selectedProfile,
  onProfileChange,
}: ProfileSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>1. Escolha um Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <ToggleGroup
          type="single"
          value={selectedProfile}
          onValueChange={(value: VirtualManProfile) => {
            if (value) onProfileChange(value)
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <ToggleGroupItem
            value="avô"
            aria-label="Selecionar perfil Avô"
            className="h-auto"
          >
            <div className="p-4 text-center">
              <p className="font-bold text-lg">👴</p>
              <Label>Avô</Label>
              <p className="text-xs text-muted-foreground">
                Sabedoria e tradição
              </p>
            </div>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="marido"
            aria-label="Selecionar perfil Marido"
            className="h-auto"
          >
            <div className="p-4 text-center">
              <p className="font-bold text-lg">👨</p>
              <Label>Marido</Label>
              <p className="text-xs text-muted-foreground">
                Parceria e responsabilidade
              </p>
            </div>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="filho adolescente"
            aria-label="Selecionar perfil Filho Adolescente"
            className="h-auto"
          >
            <div className="p-4 text-center">
              <p className="font-bold text-lg">👦</p>
              <Label>Filho Adolescente</Label>
              <p className="text-xs text-muted-foreground">
                Identidade e conflito
              </p>
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  )
}
