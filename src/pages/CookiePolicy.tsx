import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const CookiePolicyPage = () => {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <Button variant="ghost" asChild className="mb-8">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a página inicial
        </Link>
      </Button>
      <div className="prose dark:prose-invert max-w-none">
        <h1>Política de Cookies</h1>
        <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <h2>O que são cookies?</h2>
        <p>
          Cookies são pequenos arquivos de texto que os sites que você visita
          colocam no seu dispositivo. Eles são amplamente utilizados para fazer
          os sites funcionarem, ou funcionarem de forma mais eficiente, bem como
          para fornecer informações aos proprietários do site.
        </p>

        <h2>Como usamos os cookies?</h2>
        <p>
          No Mãe Amiga, usamos cookies para melhorar sua experiência em nosso
          site. Especificamente, usamos os seguintes tipos de cookies:
        </p>
        <ul>
          <li>
            <strong>Cookies Essenciais:</strong> Estes são estritamente
            necessários para fornecer os serviços disponíveis através do nosso
            site e para usar algumas de suas funcionalidades, como o acesso a
            áreas seguras. Como esses cookies são estritamente necessários para
            entregar o site, você não pode recusá-los sem impactar o
            funcionamento do nosso site.
          </li>
          <li>
            <strong>Cookies de Preferência:</strong> Estes cookies são usados
            para lembrar as suas preferências, como a sua decisão sobre o
            consentimento de cookies. Eles são essenciais para uma experiência
            personalizada.
          </li>
          <li>
            <strong>Cookies de Análise e Desempenho:</strong> Estes cookies
            coletam informações que são usadas de forma agregada para nos ajudar
            a entender como nosso site está sendo usado ou quão eficazes são
            nossas campanhas de marketing, ou para nos ajudar a personalizar
            nosso site para você. Usaremos estes cookies apenas se você nos der
            o seu consentimento.
          </li>
          <li>
            <strong>Cookies de Marketing:</strong> Estes cookies são usados para
            tornar as mensagens publicitárias mais relevantes para você. Eles
            executam funções como impedir que o mesmo anúncio reapareça
            continuamente, garantir que os anúncios sejam exibidos corretamente
            e, em alguns casos, selecionar anúncios baseados em seus interesses.
            Usaremos estes cookies apenas se você nos der o seu consentimento.
          </li>
        </ul>

        <h2>Sua escolha sobre cookies</h2>
        <p>
          Ao visitar nosso site pela primeira vez, você verá um banner de
          consentimento de cookies. Você tem a opção de "Aceitar Todos" ou
          "Recusar Todos".
        </p>
        <ul>
          <li>
            <strong>Aceitar Todos:</strong> Ao clicar neste botão, você concorda
            com o uso de todos os cookies descritos acima.
          </li>
          <li>
            <strong>Recusar Todos:</strong> Ao clicar neste botão, apenas os
            cookies essenciais e de preferência (para salvar sua escolha) serão
            utilizados. Nenhum cookie de análise ou marketing será ativado.
          </li>
        </ul>
        <p>
          Sua preferência será salva por um ano. Após esse período,
          solicitaremos seu consentimento novamente.
        </p>

        <h2>Como gerenciar cookies no seu navegador</h2>
        <p>
          Além das opções em nosso banner, você pode gerenciar e/ou excluir
          cookies como desejar. Para mais detalhes, consulte aboutcookies.org.
          Você pode excluir todos os cookies que já estão no seu computador e
          pode configurar a maioria dos navegadores para impedir que eles sejam
          colocados. Se você fizer isso, no entanto, talvez tenha que ajustar
          manualmente algumas preferências toda vez que visitar um site e alguns
          serviços e funcionalidades podem não funcionar.
        </p>

        <h2>Alterações na nossa Política de Cookies</h2>
        <p>
          Podemos atualizar esta Política de Cookies de tempos em tempos para
          refletir, por exemplo, alterações nos cookies que usamos ou por outras
          razões operacionais, legais ou regulatórias. Por favor, revisite esta
          Política de Cookies regularmente para se manter informado sobre o
          nosso uso de cookies e tecnologias relacionadas.
        </p>
      </div>
    </div>
  )
}

export default CookiePolicyPage
