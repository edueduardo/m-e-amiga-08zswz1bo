import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useInstallPrompt } from '@/hooks/useInstallPrompt'
import { Share, Download, ArrowDownToLine } from 'lucide-react'

interface InstallAppDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const InstallAppDialog = ({
  open,
  onOpenChange,
}: InstallAppDialogProps) => {
  const { prompt, triggerInstall, userAgent } = useInstallPrompt()

  const renderContent = () => {
    if (userAgent === 'ios') {
      return (
        <div className="text-center space-y-4">
          <p>Para instalar o aplicativo no seu iPhone ou iPad:</p>
          <ol className="text-left list-decimal list-inside space-y-2">
            <li>
              Toque no ícone de <strong>Compartilhar</strong>{' '}
              <Share className="inline-block h-4 w-4" /> na barra de ferramentas
              do Safari.
            </li>
            <li>
              Role para baixo e selecione{' '}
              <strong>"Adicionar à Tela de Início"</strong>.
            </li>
            <li>
              Toque em <strong>"Adicionar"</strong> no canto superior direito.
            </li>
          </ol>
          <p className="text-sm text-muted-foreground pt-4">
            Você também pode baixar nosso aplicativo na App Store.
          </p>
          <Button asChild className="w-full">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ir para a App Store
            </a>
          </Button>
        </div>
      )
    }

    if (userAgent === 'android') {
      return (
        <div className="text-center space-y-4">
          <p>
            Você pode adicionar o Mãe Amiga à sua tela inicial para um acesso
            rápido ou baixar pela Google Play.
          </p>
          <Button
            onClick={triggerInstall}
            disabled={!prompt}
            className="w-full"
          >
            <ArrowDownToLine className="mr-2 h-4 w-4" /> Adicionar à Tela de
            Início
          </Button>
          <p className="text-sm text-muted-foreground">ou</p>
          <Button asChild className="w-full">
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Baixar na Google Play
            </a>
          </Button>
        </div>
      )
    }

    // Desktop
    if (prompt) {
      return (
        <div className="text-center space-y-4">
          <p>
            Instale o aplicativo Mãe Amiga no seu computador para uma
            experiência mais integrada e acesso rápido.
          </p>
          <Button onClick={triggerInstall} className="w-full">
            <Download className="mr-2 h-4 w-4" /> Instalar Aplicativo
          </Button>
        </div>
      )
    }

    return (
      <div className="text-center space-y-4">
        <p>
          Parece que seu navegador não suporta a instalação direta. Você pode
          usar o aplicativo diretamente no navegador.
        </p>
        <p className="text-sm text-muted-foreground">
          Para uma melhor experiência, recomendamos usar o Google Chrome ou
          Microsoft Edge.
        </p>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Baixar Mãe Amiga
          </DialogTitle>
          <DialogDescription className="text-center">
            Tenha acesso rápido e fácil ao seu espaço de acolhimento.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">{renderContent()}</div>
      </DialogContent>
    </Dialog>
  )
}
