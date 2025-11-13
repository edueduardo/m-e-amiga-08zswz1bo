import {
  Testimonial,
  CareRoutine,
  MicroCourse,
  VoiceEntry,
  WeeklySummary,
} from '@/types'
import { format, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const testimonials: Testimonial[] = [
  {
    name: 'Ana P.',
    quote:
      'Finalmente um lugar seguro para falar o que sinto sem ser julgada. As respostas da Mãe Amiga aquecem meu coração.',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=female&seed=1',
  },
  {
    name: 'Juliana M.',
    quote:
      'Eu estava me sentindo tão sozinha. Agora, tenho um ombro amigo a qualquer hora do dia. Fez toda a diferença na minha semana.',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=female&seed=2',
  },
  {
    name: 'Carla S.',
    quote:
      'É incrível como um conselho simples e carinhoso pode mudar sua perspectiva. Recomendo para todas as mulheres que se sentem sobrecarregadas.',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=female&seed=3',
  },
]

export const careRoutines: CareRoutine[] = [
  {
    id: '1',
    title: 'Respiração para Acalmar',
    description:
      'Uma pausa de 3 minutos para reconectar com seu corpo e acalmar a mente ansiosa.',
    estimated_minutes: 3,
    steps: [
      'Sente-se confortavelmente com a coluna ereta.',
      'Feche os olhos e coloque uma mão sobre o peito e outra sobre a barriga.',
      'Inspire lentamente pelo nariz contando até 4, sentindo sua barriga expandir.',
      'Segure o ar por 2 segundos.',
      'Expire lentamente pela boca contando até 6, sentindo sua barriga contrair.',
      'Repita por 10 ciclos ou até se sentir mais calma.',
    ],
  },
  {
    id: '2',
    title: 'Chá Aconchegante',
    description:
      'Um ritual de 5 minutos para trazer conforto e calor para o seu dia.',
    estimated_minutes: 5,
    steps: [
      'Escolha um chá que você ame (camomila, erva-doce, etc.).',
      'Prepare a água e a xícara com intenção e calma.',
      'Enquanto o chá infunde, observe o vapor e sinta o aroma.',
      'Segure a xícara quente com as duas mãos.',
      'Beba em pequenos goles, prestando atenção total ao sabor e à sensação de calor.',
      'Agradeça a si mesma por este momento.',
    ],
  },
  {
    id: '3',
    title: 'Escrita Terapêutica',
    description:
      'Tire 10 minutos para colocar no papel tudo o que está pesando, sem filtros.',
    estimated_minutes: 10,
    steps: [
      'Pegue um caderno e uma caneta.',
      'Marque 10 minutos no seu celular.',
      'Escreva continuamente tudo o que vier à sua mente, sem se preocupar com a gramática ou a coerência.',
      'Não julgue seus pensamentos, apenas deixe-os fluir para o papel.',
      'Ao final, leia o que escreveu (se quiser) e depois rasgue ou guarde o papel.',
      'Sinta a leveza de ter tirado esse peso de dentro de você.',
    ],
  },
]

export const microCourses: MicroCourse[] = [
  {
    id: '1',
    slug: 'comunicacao-gentil-no-casamento',
    title: 'Comunicação Gentil no Casamento',
    summary: 'Aprenda a expressar suas necessidades e sentimentos sem brigas.',
    lessons: [
      {
        id: '101',
        course_slug: 'comunicacao-gentil-no-casamento',
        lesson_number: 1,
        title: 'Lição 1: O que você realmente sente?',
        content_markdown:
          '### Antes de falar, entenda.\nMuitas vezes, a irritação é só a ponta do iceberg. Por baixo, pode haver tristeza, cansaço ou medo. Antes de iniciar uma conversa difícil, pergunte-se: "O que eu estou sentindo de verdade?".\n\n> **Fala pronta:** "Amor, podemos conversar? Eu não estou brava, estou me sentindo um pouco sobrecarregada e queria compartilhar com você."',
      },
      {
        id: '102',
        course_slug: 'comunicacao-gentil-no-casamento',
        lesson_number: 2,
        title: 'Lição 2: Trocando "Você" por "Eu"',
        content_markdown:
          '### Fale sobre você, não sobre o outro.\nAcusar com "Você nunca me ajuda" fecha qualquer diálogo. Tente falar sobre como as ações do outro te afetam. Use a primeira pessoa.\n\n> **Fala pronta:** "Eu me sinto muito cansada quando vejo a louça na pia depois de um dia longo. Significaria muito para mim se pudéssemos dividir essa tarefa."',
      },
    ],
  },
  {
    id: '2',
    slug: 'resgatando-o-autocuidado',
    title: 'Resgatando o Autocuidado',
    summary:
      'Pequenos passos para voltar a se colocar como prioridade na sua vida.',
    lessons: [
      {
        id: '201',
        course_slug: 'resgatando-o-autocuidado',
        lesson_number: 1,
        title: 'Lição 1: 5 minutos que salvam',
        content_markdown:
          '### Você não precisa de uma hora.\nAutocuidado não é um dia no spa. Comece com 5 minutos. Apenas 5 minutos por dia que sejam SÓ SEUS. Pode ser para tomar um café em silêncio, ouvir uma música, ou simplesmente não fazer nada.\n\n> **Fala pronta (para si mesma):** "Eu mereço estes 5 minutos. O mundo não vai acabar se eu parar um pouquinho para respirar."',
      },
    ],
  },
]

const today = new Date()
export const voiceEntries: VoiceEntry[] = [
  {
    id: '1',
    created_at: subDays(today, 1).toISOString(),
    transcript:
      'Hoje foi um dia tão pesado. As crianças, o trabalho, a casa... Sinto que não vou dar conta de tudo e acabei chorando escondido no banheiro. Estou tão cansada.',
    mood_label: 'cansada',
    mother_reply:
      'Minha querida, imagino o quanto você deve estar exausta. Você se doa tanto para todos. Lembre-se que para cuidar dos outros, você precisa primeiro cuidar de si mesma. Será que hoje você não consegue delegar uma pequena tarefa ou tirar 15 minutinhos só para você, sem culpa? Você merece esse descanso.',
  },
  {
    id: '2',
    created_at: subDays(today, 3).toISOString(),
    transcript:
      'Estou tão preocupada com as contas. Fico pensando nisso a noite toda e não consigo dormir direito. Essa ansiedade está me consumindo.',
    mood_label: 'ansiosa',
    mother_reply:
      'Filha, respira fundo. Sinto sua angústia daqui. Tente focar no agora. O que você pode controlar neste exato momento? Talvez uma caminhada curta ou ouvir uma música que te acalme possa ajudar a clarear a mente. Um passo de cada vez, querida.',
  },
  {
    id: '3',
    created_at: subDays(today, 5).toISOString(),
    transcript:
      'Hoje meu chefe me deu os parabéns por um projeto. Fiquei tão feliz, senti que meu esforço foi reconhecido!',
    mood_label: 'feliz',
    mother_reply:
      'Que alegria ler isso, filha! Fico com o coração quentinho em saber que você está feliz. Aproveite cada segundo desse sentimento. Guarde essa sensação boa no coração para os dias que não forem tão fáceis. Celebre suas conquistas, por menores que pareçam!',
  },
]

export const weeklySummary: WeeklySummary = {
  id: '1',
  start_date: format(subDays(today, 7), 'dd/MM', { locale: ptBR }),
  end_date: format(today, 'dd/MM', { locale: ptBR }),
  mood_overview: {
    cansada: 40,
    ansiosa: 30,
    feliz: 20,
    neutra: 10,
  },
  summary_text:
    'Filha, olhando para a sua semana, percebi que a emoção que mais apareceu foi a de se sentir **cansada**. Parece que foram dias de muito desgaste, não é? Seu corpo e sua mente estão pedindo um pouco de calma. Não se esqueça de que descansar não é um luxo, é uma necessidade. Lembre-se sempre: estou aqui para você, orgulhosa de cada passo seu. Com amor, Mãe Amiga.',
}
