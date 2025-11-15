import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getCertificates, Certificate } from '@/services/certificates'
import { CertificateCard } from '@/components/app/CertificateCard'
import { Loader2, Award } from 'lucide-react'

const CertificatesPage = () => {
  const { user } = useAuth()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!user) return
      setIsLoading(true)
      const data = await getCertificates(user.id)
      setCertificates(data)
      setIsLoading(false)
    }
    fetchCertificates()
  }, [user])

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Award className="h-16 w-16 mx-auto text-primary animate-float" />
        <h1 className="text-3xl font-bold tracking-tight mt-4">
          Meus Certificados
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Aqui estão os reconhecimentos da sua jornada de aprendizado e
          crescimento.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : certificates.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 border-2 border-dashed rounded-lg max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold">Nenhum certificado ainda</h3>
          <p className="mt-2 text-muted-foreground">
            Continue sua jornada de aprendizado nos cursos para ganhar seu
            primeiro certificado. Você está no caminho certo!
          </p>
        </div>
      )}
    </div>
  )
}

export default CertificatesPage
