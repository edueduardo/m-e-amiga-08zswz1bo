import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { MailCheck } from 'lucide-react'

const VerifyEmailPage = () => {
  const { user } = useAuth()

  const handleResendEmail = () => {
    // Mock resend logic
    console.log('Resending verification email to:', user?.email)
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
          <Button variant="link" className="px-0" onClick={handleResendEmail}>
            clique aqui para reenviar.
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmailPage
