import { useNavigate } from 'react-router-dom'
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
import { useToast } from '@/components/ui/use-toast'
import { useState, useEffect } from 'react'
import { PasswordStrength } from '@/components/PasswordStrength'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

const ResetPasswordPage = () => {
  const { updatePassword } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState(false)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsTokenValid(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      toast({
        title: 'As senhas não coincidem',
        description: 'Por favor, verifique se as senhas são iguais.',
        variant: 'destructive',
      })
      return
    }
    setIsLoading(true)
    const { error } = await updatePassword(password)

    if (error) {
      toast({
        title: 'Erro ao redefinir senha',
        description:
          error.message || 'O link pode ter expirado. Tente novamente.',
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Senha redefinida com sucesso!',
        description: 'Você já pode entrar com sua nova senha.',
      })
      navigate('/login')
    }
    setIsLoading(false)
  }

  if (!isTokenValid) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-150px)] py-12">
        <Card className="mx-auto max-w-sm text-center">
          <CardHeader>
            <CardTitle>Verificando link...</CardTitle>
          </CardHeader>
          <CardContent>
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Redefinir Senha</CardTitle>
          <CardDescription>Digite sua nova senha abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Nova Senha</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <PasswordStrength password={password} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Redefinir Senha
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPasswordPage
