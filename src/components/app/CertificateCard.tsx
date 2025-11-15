import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Download, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Certificate } from '@/services/certificates'

interface CertificateCardProps {
  certificate: Certificate
}

export const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const certificateTitles: Record<string, string> = {
    all_courses_completion: 'Certificado de Conclusão de Todos os Cursos',
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <Award className="h-10 w-10 text-primary flex-shrink-0" />
          <div>
            <CardTitle>
              {certificateTitles[certificate.certificate_type] ||
                'Certificado de Conclusão'}
            </CardTitle>
            <CardDescription>
              Concluído em{' '}
              {format(
                new Date(certificate.completion_date),
                "dd 'de' MMMM 'de' yyyy",
                { locale: ptBR },
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          ID do Certificado: {certificate.unique_certificate_id}
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button asChild>
          <a
            href={certificate.certificate_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-4 w-4" /> Ver Certificado
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a
            href={certificate.certificate_url}
            download={`certificado-${certificate.unique_certificate_id}.svg`}
          >
            <Download className="mr-2 h-4 w-4" /> Baixar
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
