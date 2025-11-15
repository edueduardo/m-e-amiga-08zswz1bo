import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/use-toast'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { PasswordStrength } from '@/components/PasswordStrength'
import { Switch } from '@/components/ui/switch'
import { PhoneNumberInput } from '@/components/PhoneNumberInput'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useConversations } from '@/contexts/ConversationsContext'
import { GenerateReportDialog } from '@/components/GenerateReportDialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  Shield,
  CreditCard,
  Database,
  Sparkles,
  LayoutDashboard,
  Bell,
  Loader2,
} from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useUserPreferences } from '@/contexts/UserPreferencesContext'
import { hooponoponoPractices, soothingSounds } from '@/lib/data'
import { HomePageCustomizer } from '@/components/HomePageCustomizer'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RelationshipStatus } from '@/types'
import { CustomReminders } from '@/components/CustomReminders'

const SettingsPage = () => {
  const {
    profile,
    isSubscribed,
    updateUser,
    requestPhoneEmailVerification,
    updatePassword,
  } = useAuth()
  const { deleteAllEntries } = useConversations()
  const { toast } = useToast()
  const { preferences, updatePreferences } = useUserPreferences()
  const [newPassword, setNewPassword] = useState('')
  const [phone, setPhone] = useState(profile?.phone_number || '')
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false)

  useEffect(() => {
    setPhone(profile?.phone_number || '')
  }, [profile?.phone_number])

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const fullName = formData.get('full_name') as string
    await updateUser({ full_name: fullName })
    toast({
      title: 'Perfil atualizado!',
      description: 'Suas informações foram salvas com sucesso.',
    })
  }

  const handlePhoneUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isNewNumber = phone !== profile?.phone_number
    await updateUser({
      phone_number: phone,
      phone_verification_status: isNewNumber
        ? 'not_verified'
        : profile?.phone_verification_status,
    })
    toast({
      title: 'Número de telefone salvo!',
      description: isNewNumber
        ? 'Agora, verifique seu número por e-mail.'
        : 'Seu número de telefone foi salvo.',
    })
  }

  const handleRequestVerification = async () => {
    const { error } = await requestPhoneEmailVerification()
    if (error) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'E-mail de verificação enviado!',
        description:
          'Enviamos um link para o seu e-mail para confirmar seu número de telefone.',
      })
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await updatePassword(newPassword)
    if (error) {
      toast({
        title: 'Erro ao alterar senha',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({ title: 'Senha alterada com sucesso!' })
      setNewPassword('')
    }
  }

  const getVerificationStatusBadge = () => {
    switch (profile?.phone_verification_status) {
      case 'verified':
        return <Badge variant="secondary">Verificado</Badge>
      case 'pending_email':
        return <Badge variant="destructive">Verificação Pendente</Badge>
      case 'not_verified':
      default:
        return <Badge variant="outline">Não Verificado</Badge>
    }
  }

  const handleDeleteAllConversations = () => {
    deleteAllEntries()
    toast({
      title: 'Conversas excluídas!',
      description: 'Todas as suas conversas foram excluídas com sucesso.',
    })
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie sua conta, segurança e dados.
        </p>
      </div>
      <Tabs defaultValue="profile" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" /> Perfil
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" /> Segurança
          </TabsTrigger>
          <TabsTrigger value="subscription">
            <CreditCard className="mr-2 h-4 w-4" /> Assinatura
          </TabsTrigger>
          <TabsTrigger value="personalization">
            <Sparkles className="mr-2 h-4 w-4" /> Personalização
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" /> Notificações
          </TabsTrigger>
          <TabsTrigger value="data">
            <Database className="mr-2 h-4 w-4" /> Dados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>
                Gerencie as informações da sua conta.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Nome Completo</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    defaultValue={profile.full_name}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={profile.email}
                    readOnly
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationship_status">
                    Status de Relacionamento
                  </Label>
                  <Select
                    value={
                      preferences.relationship_status || 'prefiro_nao_dizer'
                    }
                    onValueChange={(value) =>
                      updatePreferences({
                        relationship_status: value as RelationshipStatus,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casada">Casada</SelectItem>
                      <SelectItem value="solteira">Solteira</SelectItem>
                      <SelectItem value="divorciada">Divorciada</SelectItem>
                      <SelectItem value="em_um_relacionamento">
                        Em um relacionamento
                      </SelectItem>
                      <SelectItem value="prefiro_nao_dizer">
                        Prefiro não dizer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit">Salvar Alterações</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Gerencie sua senha e segurança da conta.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new_password">Nova Senha</Label>
                  <Input
                    id="new_password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <PasswordStrength password={newPassword} />
                </div>
                <Button>Alterar Senha</Button>
              </form>
              <form onSubmit={handlePhoneUpdate} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="phone">Número de Telefone</Label>
                    {profile.phone_number && getVerificationStatusBadge()}
                  </div>
                  <PhoneNumberInput value={phone} onChange={setPhone} />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Salvar Telefone</Button>
                  {profile.phone_verification_status !== 'verified' &&
                    profile.phone_number && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleRequestVerification}
                      >
                        Verificar por E-mail
                      </Button>
                    )}
                </div>
              </form>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-semibold">
                    Autenticação de Dois Fatores
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Adicione uma camada extra de segurança à sua conta.
                  </p>
                </div>
                <Switch
                  checked={profile.is_two_factor_enabled}
                  onCheckedChange={(checked) =>
                    updateUser({ is_two_factor_enabled: checked })
                  }
                  disabled={profile.phone_verification_status !== 'verified'}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Assinatura</CardTitle>
              <CardDescription>Gerencie sua assinatura.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Status da Assinatura</h3>
                <p className={isSubscribed ? 'text-green-600' : 'text-red-600'}>
                  {isSubscribed ? 'Assinatura Ativa' : 'Assinatura Inativa'}
                </p>
              </div>
              {isSubscribed ? (
                <Button variant="outline" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Gerenciar Assinatura
                  </a>
                </Button>
              ) : (
                <Button asChild>
                  <Link to="/pricing">Ativar Mãe Amiga por R$ 10</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personalization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalizar Página Inicial</CardTitle>
              <CardDescription>
                Escolha quais cards exibir e em que ordem.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setIsCustomizerOpen(true)}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Abrir Personalizador
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Personalização do SOS</CardTitle>
              <CardDescription>
                Escolha a prática e o som que mais te acalmam para o botão SOS.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="font-semibold">Prática Ho'oponopono</Label>
                <RadioGroup
                  value={preferences.sosPracticeId}
                  onValueChange={(value) =>
                    updatePreferences({ sosPracticeId: value })
                  }
                  className="space-y-2"
                >
                  {hooponoponoPractices.map((practice) => (
                    <div
                      key={practice.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={practice.id} id={practice.id} />
                      <Label htmlFor={practice.id}>{practice.title}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-3">
                <Label className="font-semibold">Som Relaxante</Label>
                <RadioGroup
                  value={preferences.sosSoundId}
                  onValueChange={(value) =>
                    updatePreferences({ sosSoundId: value })
                  }
                  className="space-y-2"
                >
                  {soothingSounds.map((sound) => (
                    <div key={sound.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={sound.id} id={sound.id} />
                      <Label htmlFor={sound.id}>{sound.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Escolha quais notificações você deseja receber.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-challenges">Novos desafios</Label>
                <Switch
                  id="notif-challenges"
                  checked={preferences.notification_preferences?.new_challenges}
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      notification_preferences: {
                        ...preferences.notification_preferences,
                        new_challenges: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-circle">
                  Novas mensagens no Círculo de Apoio
                </Label>
                <Switch
                  id="notif-circle"
                  checked={
                    preferences.notification_preferences?.circle_messages
                  }
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      notification_preferences: {
                        ...preferences.notification_preferences,
                        circle_messages: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="notif-updates">
                  Atualizações do aplicativo
                </Label>
                <Switch
                  id="notif-updates"
                  checked={preferences.notification_preferences?.app_updates}
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      notification_preferences: {
                        ...preferences.notification_preferences,
                        app_updates: checked,
                      },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Horários Preferidos</CardTitle>
              <CardDescription>
                Nos diga os melhores horários para interagirmos com você.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="time-morning">Manhã (8h - 12h)</Label>
                <Switch
                  id="time-morning"
                  checked={preferences.preferred_interaction_times?.morning}
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      preferred_interaction_times: {
                        ...preferences.preferred_interaction_times,
                        morning: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="time-afternoon">Tarde (12h - 18h)</Label>
                <Switch
                  id="time-afternoon"
                  checked={preferences.preferred_interaction_times?.afternoon}
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      preferred_interaction_times: {
                        ...preferences.preferred_interaction_times,
                        afternoon: checked,
                      },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="time-evening">Noite (18h - 22h)</Label>
                <Switch
                  id="time-evening"
                  checked={preferences.preferred_interaction_times?.evening}
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      preferred_interaction_times: {
                        ...preferences.preferred_interaction_times,
                        evening: checked,
                      },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
          <CustomReminders />
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Dados</CardTitle>
              <CardDescription>
                Exporte ou exclua permanentemente seus dados do aplicativo.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={() => setIsReportDialogOpen(true)}
              >
                Gerar Relatório de Conversas
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    Excluir Todas as Conversas
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Você tem certeza absoluta?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso excluirá
                      permanentemente todas as suas conversas, incluindo áudios
                      e textos.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAllConversations}>
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Ações de dados são irreversíveis.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <GenerateReportDialog
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
      />
      <HomePageCustomizer
        open={isCustomizerOpen}
        onOpenChange={setIsCustomizerOpen}
      />
    </>
  )
}

export default SettingsPage
