import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Send, Loader2 } from 'lucide-react'
import { VirtualManProfile } from '@/types'

interface InteractionInterfaceProps {
  profile: VirtualManProfile
  onSubmit: (query: string) => void
  isLoading: boolean
}

export const InteractionInterface = ({
  profile,
  onSubmit,
  isLoading,
}: InteractionInterfaceProps) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSubmit(query)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>2. Descreva a Situação</CardTitle>
        <CardDescription>
          Conte em detalhes a situação que você quer entender sob a perspectiva
          de um "{profile}".
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: 'Quando eu peço ajuda nas tarefas de casa, ele fica irritado e diz que eu estou reclamando. O que pode estar acontecendo?'"
            rows={5}
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Consultar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
