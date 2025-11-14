import { useState, useEffect } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Label } from '@/components/ui/label'
import { VirtualManProfile } from '@/types'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  getVirtualManProfiles,
  VirtualManProfileFromDB,
} from '@/services/virtualMan'
import { Skeleton } from '../ui/skeleton'

interface ProfileSelectorProps {
  selectedProfile: VirtualManProfile
  onProfileChange: (profile: VirtualManProfile) => void
}

const profileIcons: Record<string, string> = {
  Avô: '👴',
  Marido: '👨',
  'Filho Adolescente': '👦',
  'Pai Apoiador': '👨‍👧',
  'Amigo Sincero': '🤝',
  'Chefe Experiente': '👔',
}

export const ProfileSelector = ({
  selectedProfile,
  onProfileChange,
}: ProfileSelectorProps) => {
  const [profiles, setProfiles] = useState<VirtualManProfileFromDB[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true)
      const data = await getVirtualManProfiles()
      setProfiles(data)
      setIsLoading(false)
    }
    fetchProfiles()
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </CardContent>
      </Card>
    )
  }

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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {profiles.map((profile) => (
            <ToggleGroupItem
              key={profile.id}
              value={profile.name}
              aria-label={`Selecionar perfil ${profile.name}`}
              className="h-auto"
            >
              <div className="p-4 text-center">
                <p className="font-bold text-2xl">
                  {profileIcons[profile.name] || '👤'}
                </p>
                <Label>{profile.name}</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {profile.description}
                </p>
              </div>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardContent>
    </Card>
  )
}
