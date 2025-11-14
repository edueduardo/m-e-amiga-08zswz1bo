import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/use-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { PasswordStrength } from '@/components/PasswordStrength'
import { Switch } from '@/components/ui/switch'

const SettingsPage = () => {
  const { user, isSubscribed, updateUser } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [phone, setPhone] = useState(user?.phone_number || '')

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const fullName = formData.get('full_name') as string
    updateUser({ full_name: fullName })
    toast({
      title: 'Perfil atualizado!',
      description: 'Suas informações foram salvas com sucesso.',
    })
  }

  const handlePhoneSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUser({ phone_number: phone })
    // In a real app, this would trigger an SMS to be sent
    navigate('/verify-phone')
  }

  return (
    <div className="grid gap-6">
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
                defaultValue={user?.full_name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user?.email}
                readOnly
                disabled
              />
            </div>
            <Button type="submit">Salvar</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardDescription>
            Gerencie sua senha e segurança da conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4">
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
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Número de Telefone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-8888"
              />
            </div>
            <Button type="submit">
              {user?.is_phone_verified
                ? 'Alterar Telefone'
                : 'Verificar Telefone'}
            </Button>
          </form>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <h3 className="font-semibold">Autenticação de Dois Fatores</h3>
              <p className="text-sm text-muted-foreground">
                Adicione uma camada extra de segurança à sua conta.
              </p>
            </div>
            <Switch
              checked={user?.is_two_factor_enabled}
              onCheckedChange={(checked) =>
                updateUser({ is_two_factor_enabled: checked })
              }
              disabled={!user?.is_phone_verified}
            />
          </div>
        </CardContent>
      </Card>

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
    </div>
  )
}

export default SettingsPage
