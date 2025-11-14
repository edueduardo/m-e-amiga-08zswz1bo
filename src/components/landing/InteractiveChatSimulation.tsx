import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, User, Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

const chatSimulationPairs = [
  {
    question:
      'Sinto que faço tudo em casa. Por que vocês não notam quando estou sobrecarregada?',
    answer:
      'Muitas vezes somos ensinados a focar nas próprias tarefas e não percebemos sinais sutis. Isso não significa falta de carinho, mas uma dificuldade em notar sobrecarga. Falar abertamente sobre suas necessidades ajuda a gente a entender melhor.',
    profile: 'marido',
  },
  {
    question:
      'Meu companheiro não fala sobre sentimentos. Como posso fazer ele se abrir?',
    answer:
      'Alguns homens foram criados para guardar emoções. Mostre interesse genuíno sem exigir respostas imediatas. Perguntas como ‘o que você acha?’ em vez de ‘como você se sente?’ podem facilitar.',
    profile: 'marido',
  },
  {
    question:
      'Quero retomar meus hobbies, mas sinto culpa. Por que ele não entende essa necessidade?',
    answer:
      'Muitos homens valorizam a individualidade e podem não perceber essa culpa. Se você explicar que ter tempo para si mesma te faz mais feliz e disposta, ele tende a apoiar mais.',
    profile: 'marido',
  },
  {
    question: 'Meu pai critica minhas escolhas como mãe. É normal?',
    answer:
      'Pais de gerações anteriores têm visões diferentes. A intenção pode ser ajudar, mesmo que pareça crítica. Ouvir e explicar por que você escolhe agir de outro modo pode reduzir conflitos.',
    profile: 'pai',
  },
  {
    question: 'Meu filho adolescente me ignora. Ele me odeia?',
    answer:
      'Na adolescência, queremos privacidade e autonomia, não é pessoal. Procure estabelecer momentos para conversar e escutar mais do que falar. Ele provavelmente ainda precisa de você, só não demonstra.',
    profile: 'filho',
  },
  {
    question: 'Por que muitos homens evitam conversar sobre o relacionamento?',
    answer:
      'Tememos discutir algo que não sabemos resolver. Tente abordar o tema com foco em soluções e reforçando o que funciona bem, não só os problemas.',
    profile: 'marido',
  },
  {
    question:
      'Estou cansada de ser a responsável pelo planejamento da família. Como dividir melhor?',
    answer:
      'Às vezes nem percebemos tudo o que envolve planejar. Fazer listas conjuntas de tarefas e usar aplicativos compartilhados ajuda a distribuir responsabilidades de forma visível.',
    profile: 'marido',
  },
  {
    question: 'Meu parceiro diz que me ama, mas não ajuda em casa. Por quê?',
    answer:
      'Ele pode expressar amor de outras formas. Conversar sobre o que te faz sentir amada (apoio nas tarefas, tempo juntos, etc.) pode alinhar expectativas.',
    profile: 'marido',
  },
  {
    question: 'Meu avô acha que eu deveria ficar mais em casa. Como lidar?',
    answer:
      'Ele cresceu em outra época. Explicar que trabalhar ou sair te faz realizada e que isso não diminui o tempo com a família pode ajudar a quebrar essa crença.',
    profile: 'avô',
  },
  {
    question: 'Por que homens comentam sobre como me visto?',
    answer:
      'Alguns homens têm a impressão de que estão protegendo você ou manifestando atração. Defina claramente se esses comentários são bem‑vindos ou não e deixe claro que você veste o que te faz bem.',
    profile: 'marido',
  },
  {
    question:
      'Quando peço ajuda, ele fica na defensiva. O que estou fazendo errado?',
    answer:
      'Talvez a forma como a solicitação é feita soe como crítica. Tente trocar ‘você nunca faz isso’ por ‘poderia me ajudar agora?’ Isso diminui a defensividade.',
    profile: 'marido',
  },
  {
    question: 'Ele prefere sair com os amigos do que comigo. Por quê?',
    answer:
      'Equilíbrio social é importante para ambos. Conversar sobre reservar um tempo só para vocês e, ao mesmo tempo, incentivar as amizades dele, mostra confiança e parceria.',
    profile: 'marido',
  },
  {
    question: 'Por que ele não percebe que estou triste, mesmo quando choro?',
    answer:
      'Muitos de nós não fomos ensinados a lidar com as emoções dos outros e ficamos sem saber o que fazer. Às vezes, o silêncio é medo de piorar a situação. Dizer ‘eu só preciso de um abraço’ pode ser o guia que ele precisa.',
    profile: 'marido',
  },
  {
    question:
      'Ele nunca elogia minha aparência. Será que não me acha mais atraente?',
    answer:
      'Com o tempo, alguns homens se tornam menos vocais sobre elogios, mas o sentimento continua. Ele pode demonstrar atração de outras formas. Uma conversa leve sobre como você gosta de ser elogiada pode reacender essa chama.',
    profile: 'marido',
  },
  {
    question:
      'Meu pai sempre compara meu casamento com o dele. Como faço para ele parar?',
    answer:
      'Para a geração dele, a comparação é uma forma de compartilhar experiência. Tente dizer com carinho: ‘Pai, eu sei que você quer o melhor para mim. Agradeço seus conselhos, mas nossos tempos são diferentes e estamos construindo nossa própria história.’',
    profile: 'pai',
  },
  {
    question: 'Por que ele fica tão irritado quando eu mexo no celular dele?',
    answer:
      'Para muitos, o celular é um espaço privado, quase como um diário. A irritação pode vir da sensação de invasão de privacidade, mesmo que não haja nada a esconder. É uma questão de confiança e respeito ao espaço individual.',
    profile: 'marido',
  },
  {
    question: 'Meu filho não me conta mais sobre a vida dele. O que eu faço?',
    answer:
      'É uma fase de buscar independência. Tente criar oportunidades para conversas casuais, sem parecer um interrogatório. Durante um lanche, ou no carro. Mostrar que você está ali para ouvir, sem julgar, é o mais importante.',
    profile: 'filho',
  },
  {
    question:
      'Ele gasta dinheiro com coisas que eu acho supérfluas. Como abordar isso sem brigar?',
    answer:
      'Homens e mulheres muitas vezes têm prioridades de gastos diferentes. Sugira uma conversa sobre metas financeiras em comum. Falar sobre sonhos (uma viagem, a casa nova) torna o planejamento financeiro um projeto do casal, não uma crítica.',
    profile: 'marido',
  },
  {
    question:
      'Por que ele não toma a iniciativa para planejarmos nosso futuro?',
    answer:
      'Às vezes, o medo de falhar ou a pressão de ser o ‘provedor’ nos paralisa. Iniciar a conversa de forma colaborativa, como ‘Onde você se vê em 5 anos?’, pode ser menos intimidador do que ‘Precisamos planejar nosso futuro’.',
    profile: 'marido',
  },
  {
    question:
      'Sinto que ele não me escuta de verdade, só espera a vez dele de falar.',
    answer:
      'Fomos condicionados a ‘resolver problemas’. Enquanto você fala, ele já está pensando na solução, e não em validar seu sentimento. Dizer ‘eu não preciso de uma solução agora, só preciso que você me escute’ pode mudar a dinâmica.',
    profile: 'marido',
  },
  {
    question:
      'Meu sogro faz piadas que me deixam desconfortável. Devo falar algo?',
    answer:
      'Gerações mais velhas podem ter um humor diferente. O ideal é que seu parceiro converse com ele. Se não for possível, uma resposta educada mas firme como ‘Não me sinto confortável com essa brincadeira’ costuma ser eficaz.',
    profile: 'pai',
  },
  {
    question: 'Por que ele se fecha depois de um dia estressante de trabalho?',
    answer:
      'Muitos homens processam o estresse se isolando. É como entrar em uma ‘caverna’ para recarregar. Dê a ele um tempo e espaço. Depois, quando ele parecer mais relaxado, pergunte se ele quer conversar sobre o dia.',
    profile: 'marido',
  },
  {
    question: 'Ele não demonstra ciúmes. Será que ele não se importa?',
    answer:
      'Para muitos, confiança é a maior prova de amor. A ausência de ciúmes pode significar que ele confia plenamente em você e no relacionamento. Se isso te incomoda, converse sobre suas necessidades de se sentir desejada.',
    profile: 'marido',
  },
  {
    question: 'Como peço mais romantismo sem parecer carente?',
    answer:
      'Seja específica e positiva. Em vez de ‘você não é romântico’, tente ‘eu adoraria se saíssemos para jantar uma vez por mês, só nós dois’. Elogiar as pequenas atitudes românticas que ele já tem também incentiva.',
    profile: 'marido',
  },
  {
    question:
      'Meu filho adolescente só quer saber de jogos. Devo me preocupar?',
    answer:
      'Jogos são o principal meio de socialização para muitos adolescentes hoje. É o ‘clube’ da nossa geração. Tente se interessar pelo jogo dele, perguntar como funciona. Isso cria conexão. O importante é equilibrar com outras atividades.',
    profile: 'filho',
  },
  {
    question: 'Por que ele não gosta de discutir a relação (DR)?',
    answer:
      'A sigla ‘DR’ já vem carregada de uma conotação negativa, de conflito. Tente chamar de ‘alinhamento’ ou ‘conversa sobre nós’. Começar com pontos positivos e focar em um assunto por vez torna a conversa menos assustadora.',
    profile: 'marido',
  },
  {
    question:
      'Ele não percebe que o lixo precisa ser levado para fora. Preciso sempre pedir?',
    answer:
      'Isso é o que chamam de ‘carga mental’. Muitas vezes, não fomos treinados para gerenciar a casa, apenas para executar tarefas quando solicitados. Criar um quadro de responsabilidades visível pode ajudar a dividir essa carga de gerenciamento.',
    profile: 'marido',
  },
  {
    question:
      'Por que ele fica tão bravo quando eu choro durante uma discussão?',
    answer:
      'O choro pode ser interpretado por alguns como o fim da conversa racional, e isso gera frustração por não saber como continuar ou ‘consertar’ a situação. Ele pode se sentir impotente. Tente dizer: ‘Estou chorando porque estou frustrada, mas quero continuar a conversa.’',
    profile: 'marido',
  },
  {
    question: 'Meu pai nunca diz ‘eu te amo’. Será que ele não me ama?',
    answer:
      'Muitos homens da geração dele demonstram amor através de atos de serviço: consertar algo em casa, garantir que você está segura, trabalhar duro pela família. As ações são as palavras de amor dele. Observe os atos.',
    profile: 'pai',
  },
  {
    question: 'Como fazer com que ele participe mais da educação dos filhos?',
    answer:
      'Dê a ele tarefas específicas e confie que ele fará do jeito dele, mesmo que seja diferente do seu. Elogie o esforço e a iniciativa. Quando o homem se sente competente e importante na criação dos filhos, ele tende a se envolver mais.',
    profile: 'marido',
  },
]

export const InteractiveChatSimulation = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % chatSimulationPairs.length)
  }

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + chatSimulationPairs.length) %
        chatSimulationPairs.length,
    )
  }

  const currentPair = chatSimulationPairs[currentIndex]

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardContent className="p-4 space-y-4">
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-secondary/30 rounded-lg">
          <div
            className={cn(
              'flex items-start gap-3 justify-end animate-fade-in-up',
            )}
          >
            <div
              className={cn('p-3 rounded-lg max-w-md bg-background shadow-sm')}
            >
              <p className="text-sm">{currentPair.question}</p>
            </div>
            <User className="h-8 w-8 text-muted-foreground flex-shrink-0" />
          </div>

          <div
            className={cn(
              'flex items-start gap-3 justify-start animate-fade-in-up',
            )}
            style={{ animationDelay: '300ms' }}
          >
            <Bot className="h-8 w-8 text-primary flex-shrink-0" />
            <div
              className={cn('p-3 rounded-lg max-w-md bg-primary/10 shadow-sm')}
            >
              <p className="text-sm font-semibold text-primary mb-1">
                Homem ({currentPair.profile})
              </p>
              <p className="text-sm">{currentPair.answer}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <Button variant="outline" size="icon" onClick={handlePrev}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {chatSimulationPairs.length}
          </span>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
