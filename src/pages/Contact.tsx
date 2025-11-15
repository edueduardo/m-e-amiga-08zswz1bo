import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

const ContactPage = () => {
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Mensagem Enviada!',
      description:
        'Obrigada pelo seu contato. Responderemos o mais breve possível.',
    })
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Button variant="ghost" asChild className="mb-8">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a página inicial
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Fale Conosco</CardTitle>
          <CardDescription>
            Tem alguma dúvida, sugestão ou precisa de ajuda? Preencha o
            formulário abaixo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Seu Nome</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu E-mail</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Sua Mensagem</Label>
              <Textarea id="message" name="message" rows={6} required />
            </div>
            <Button type="submit" className="w-full">
              Enviar Mensagem
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactPage
