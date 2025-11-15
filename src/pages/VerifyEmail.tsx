import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { MailCheck } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const VerifyEmailPage = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleResendEmail = async () => {
    if (!user?.email) return
    setIsLoading(true)
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
    })
    if (error) {
      toast({
        title: 'Erro ao reenviar',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'E-mail reenviado!',
        description: 'Verifique sua caixa de entrada.',
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] py-12">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
            <MailCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Verifique seu e-mail</CardTitle>
          <CardDescription>
            Enviamos um link de verificação para{' '}
            <span className="font-semibold">{user?.email}</span>. Por favor,
            clique no link para ativar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Não recebeu o e-mail? Verifique sua pasta de spam ou
          </p>
          <Button
            variant="link"
            className="px-0"
            onClick={handleResendEmail}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            clique aqui para reenviar.
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmailPage
