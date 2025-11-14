import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/hooks/useAuth'

const VerifyPhonePage = () => {
  const [otp, setOtp] = useState('')
  const { toast } = useToast()
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (otp.length === 6) {
      // Mock verification logic
      console.log('Verifying OTP:', otp)
      updateUser({ is_phone_verified: true })
      toast({
        title: 'Telefone verificado!',
        description: 'Seu número de telefone foi verificado com sucesso.',
      })
      navigate('/app/settings')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Verificar Telefone</CardTitle>
          <CardDescription>
            Digite o código de 6 dígitos que enviamos para o número{' '}
            {user?.phone_number}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              render={({ slots }) => (
                <InputOTPGroup className="gap-2">
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} />
                  ))}
                </InputOTPGroup>
              )}
            />
            <Button type="submit" className="w-full" disabled={otp.length < 6}>
              Verificar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyPhonePage
