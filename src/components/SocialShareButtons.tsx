import {
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'

interface SocialShareButtonsProps {
  url: string
  title: string
  className?: string
}

export const SocialShareButtons = ({
  url,
  title,
  className,
}: SocialShareButtonsProps) => {
  const { toast } = useToast()
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    toast({
      title: 'Link copiado!',
      description: 'O link está na sua área de transferência.',
    })
  }

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=Confira este link:%20${encodedUrl}`,
    },
  ]

  return (
    <div className={className}>
      <p className="text-sm font-semibold mb-2">Compartilhe:</p>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          {shareOptions.map((option) => (
            <Tooltip key={option.name}>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <option.icon className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Compartilhar no {option.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copiar link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
