import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const TermsOfUsePage = () => {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <Button variant="ghost" asChild className="mb-8">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a página inicial
        </Link>
      </Button>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Termos de Uso</h1>
        <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar e usar o serviço Mãe Amiga ("Serviço"), você concorda em
          cumprir e estar vinculado a estes Termos de Uso. Se você não concorda
          com estes termos, não use o Serviço.
        </p>

        <h2>2. Descrição do Serviço</h2>
        <p>
          Mãe Amiga é uma plataforma de software como serviço (SaaS) que fornece
          apoio emocional e conselhos de vida através de uma inteligência
          artificial. O Serviço não substitui terapia, aconselhamento médico ou
          psicológico profissional.
        </p>

        <h2>3. Uso do Serviço</h2>
        <p>
          Você concorda em usar o Serviço apenas para fins legais e de acordo
          com estes Termos. Você é responsável por manter a confidencialidade de
          sua conta e senha.
        </p>

        <h2>4. Isenção de Responsabilidade Médica</h2>
        <p>
          O Serviço não fornece aconselhamento médico. As informações e
          conselhos fornecidos pela IA são para fins de apoio emocional e
          informativos apenas. Em caso de emergência de saúde mental ou se você
          estiver em crise, entre em contato com um profissional de saúde ou
          serviços de emergência imediatamente.
        </p>

        <h2>5. Privacidade</h2>
        <p>
          Sua privacidade é importante para nós. Nossa Política de Privacidade,
          que é incorporada a estes Termos de Uso por referência, explica como
          coletamos, usamos e protegemos suas informações pessoais.
        </p>

        <h2>6. Modificações nos Termos</h2>
        <p>
          Reservamo-nos o direito de modificar estes Termos a qualquer momento.
          Notificaremos você sobre quaisquer alterações, publicando os novos
          Termos no site. Você é aconselhado a revisar estes Termos
          periodicamente para quaisquer alterações.
        </p>

        <h2>7. Contato</h2>
        <p>
          Se você tiver alguma dúvida sobre estes Termos, entre em contato
          conosco através da nossa página de <Link to="/contact">Contato</Link>.
        </p>
      </div>
    </div>
  )
}

export default TermsOfUsePage
