import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useConversations } from '@/contexts/ConversationsContext'
import { generateReportContent, downloadReport } from '@/lib/reportGenerator'
import { Loader2 } from 'lucide-react'
import { PasswordStrength } from './PasswordStrength'

interface GenerateReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const GenerateReportDialog = ({
  open,
  onOpenChange,
}: GenerateReportDialogProps) => {
  const { entries } = useConversations()
  const { toast } = useToast()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateReport = async () => {
    if (entries.length === 0) {
      toast({
        title: 'Nenhum dado para relatar',
        description:
          'Você ainda não tem nenhuma conversa para gerar um relatório.',
      })
      onOpenChange(false)
      return
    }

    if (!password || password !== confirmPassword) {
      toast({
        title: 'Senhas não coincidem',
        description: 'Por favor, verifique se as senhas são iguais.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    toast({
      title: 'Gerando relatório...',
      description: 'Isso pode levar alguns segundos.',
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      const reportContent = generateReportContent(entries)
      downloadReport(reportContent, password)

      toast({
        title: 'Relatório gerado com sucesso!',
        description: 'O download do seu relatório foi iniciado.',
      })
    } catch (error) {
      toast({
        title: 'Erro ao gerar relatório',
        description: 'Ocorreu um problema. Por favor, tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
      setPassword('')
      setConfirmPassword('')
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerar Relatório de Dados</DialogTitle>
          <DialogDescription>
            Crie um relatório seguro em PDF com todas as suas conversas. Escolha
            uma senha para proteger seu arquivo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Senha para o relatório</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <PasswordStrength password={password} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirmar Senha</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button onClick={handleGenerateReport} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Gerar e Baixar Relatório
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
