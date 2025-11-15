import { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/ui/use-toast'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

const VerifyPhoneNumberByEmailPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { confirmPhoneEmailVerification } = useAuth()
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>(
    'verifying',
  )

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      setStatus('error')
      toast({
        title: 'Token de verificação ausente',
        description: 'O link que você usou é inválido ou expirou.',
        variant: 'destructive',
      })
      return
    }

    const verifyToken = async () => {
      const success = await confirmPhoneEmailVerification(token)

      if (success) {
        setStatus('success')
        toast({
          title: 'Telefone verificado!',
          description: 'Seu número de telefone foi verificado com sucesso.',
        })
        setTimeout(() => navigate('/app/settings'), 3000)
      } else {
        setStatus('error')
        toast({
          title: 'Falha na verificação',
          description: 'O link que você usou é inválido ou expirou.',
          variant: 'destructive',
        })
      }
    }

    verifyToken()
  }, [searchParams, toast, confirmPhoneEmailVerification, navigate])

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <CardTitle className="text-2xl">Verificando...</CardTitle>
            <CardDescription>
              Estamos confirmando seu número de telefone. Por favor, aguarde.
            </CardDescription>
          </>
        )
      case 'success':
        return (
          <>
            <CheckCircle className="h-12 w-12 text-green-500" />
            <CardTitle className="text-2xl">Verificado com Sucesso!</CardTitle>
            <CardDescription>
              Seu número de telefone foi confirmado. Você será redirecionada em
              breve.
            </CardDescription>
            <Button asChild>
              <Link to="/app/settings">Ir para Configurações</Link>
            </Button>
          </>
        )
      case 'error':
        return (
          <>
            <XCircle className="h-12 w-12 text-destructive" />
            <CardTitle className="text-2xl">Ocorreu um Erro</CardTitle>
            <CardDescription>
              Não foi possível verificar seu número de telefone. O link pode ter
              expirado.
            </CardDescription>
            <Button asChild>
              <Link to="/app/settings">Voltar para Configurações</Link>
            </Button>
          </>
        )
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] py-12">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardContent className="flex flex-col items-center text-center space-y-4 pt-6">
            {renderContent()}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  )
}

export default VerifyPhoneNumberByEmailPage
