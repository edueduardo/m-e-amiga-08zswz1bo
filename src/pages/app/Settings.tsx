import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/use-toast'
import { Link } from 'react-router-dom'

const SettingsPage = () => {
  const { user, isSubscribed, updateUser } = useAuth()
  const { toast } = useToast()

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
          <CardTitle>Área de Billing</CardTitle>
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
                Gerenciar Assinatura no Stripe
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
