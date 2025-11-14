import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Mail } from 'lucide-react'

export const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      console.log('Newsletter subscription for:', email)
      toast({
        title: 'Inscrição recebida!',
        description:
          'Obrigada por se inscrever! Enviamos um e-mail de confirmação para você.',
      })
      setEmail('')
    }
  }

  return (
    <div className="w-full max-w-md">
      <h3 className="font-semibold text-lg mb-2">Receba nosso carinho</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Inscreva-se para receber dicas, inspirações e novidades diretamente no
        seu e-mail.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-grow">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Seu melhor e-mail"
            className="pl-9"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Inscrever</Button>
      </form>
    </div>
  )
}
