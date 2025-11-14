import {
  Testimonial,
  CareRoutine,
  MicroCourse,
  VoiceEntry,
  WeeklySummary,
  SupportPost,
  MeditationAudio,
  Affirmation,
  PlannerTask,
  Challenge,
  LibraryResource,
  HooponoponoPractice,
  SoothingSound,
  GamificationBadge,
  CommunityChallenge,
} from '@/types'
import { format, subDays, addDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  BookHeart,
  MessageSquareHeart,
  Sparkles,
  Star,
  Trophy,
  Users2,
} from 'lucide-react'

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
]

const allMicroCourses: MicroCourse[] = [
  {
    id: '1',
    slug: 'comunicacao-gentil-no-casamento',
    title: 'Comunicação Gentil no Casamento',
    summary: 'Aprenda a expressar suas necessidades e sentimentos sem brigas.',
    isAiGenerated: true,
    lessons: [
      {
        id: '101',
        course_slug: 'comunicacao-gentil-no-casamento',
        lesson_number: 1,
        title: 'O que você realmente sente?',
        content_markdown:
          'Muitas vezes, a irritação é só a ponta do iceberg. Por baixo, pode haver tristeza, cansaço ou medo. Antes de iniciar uma conversa difícil, pergunte-se: "O que eu estou sentindo de verdade?".',
      },
      {
        id: '102',
        course_slug: 'comunicacao-gentil-no-casamento',
        lesson_number: 2,
        title: 'A Fórmula "Eu Sinto"',
        content_markdown:
          'Em vez de dizer "Você nunca me ajuda", tente "Eu me sinto sobrecarregada com as tarefas da casa". Falar sobre seus sentimentos é menos acusatório e abre espaço para o diálogo.',
      },
    ],
  },
]

const shuffleAndTake = <T>(arr: T[], count: number): T[] => {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count)
}

export const getDynamicMicroCourses = (): MicroCourse[] =>
  shuffleAndTake(allMicroCourses, 10)

export const microCourses: MicroCourse[] = getDynamicMicroCourses()

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
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    feedback: { rating: null },
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

export const anonymousAliases = [
  'Girassol Sereno',
  'Lua Crescente',
  'Estrela Guia',
  'Rio Calmo',
  'Borboleta Azul',
]

export const supportPosts: SupportPost[] = [
  {
    id: 'post-1',
    authorAlias: 'Girassol Sereno',
    title: 'Me sentindo culpada por querer um tempo só para mim',
    content:
      'Meninas, mais alguém se sente assim? Eu amo minha família mais que tudo, mas às vezes eu só queria sumir por umas duas horas, sem ter que dar satisfação. Só de pensar nisso já me sinto a pior mãe e esposa do mundo. Como vocês lidam com isso?',
    created_at: subDays(today, 1).toISOString(),
    replies: [
      {
        id: 'reply-1-1',
        postId: 'post-1',
        authorAlias: 'Brisa Suave',
        content:
          'Nossa, eu sinto EXATAMENTE a mesma coisa. Você não está sozinha! Meu terapeuta disse que isso é super normal e que precisamos desses "respiros" para sermos melhores para nós mesmas e para eles.',
        created_at: subDays(today, 1).toISOString(),
      },
    ],
  },
]

const allMeditations: MeditationAudio[] = [
  {
    id: 'med1',
    title: 'Respiração para Acalmar a Ansiedade',
    theme: 'relaxation',
    duration_seconds: 300,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
]

const allGuidedAudios: MeditationAudio[] = [
  {
    id: 'ga1',
    title: 'Visualização para uma Noite de Sono',
    theme: 'sleep',
    duration_seconds: 720,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  },
  {
    id: 'ga2',
    title: 'Hoʻoponopono para o Coração',
    theme: 'gratitude',
    duration_seconds: 600,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
  },
]

export const getDynamicMeditations = () => shuffleAndTake(allMeditations, 5)
export const getDynamicGuidedAudios = () => shuffleAndTake(allGuidedAudios, 5)

const allInspirations: Affirmation[] = [
  {
    id: 'aff1',
    text: 'Eu sou capaz de lidar com todos os desafios que surgirem hoje.',
    type: 'affirmation',
  },
  {
    id: 'hoop1',
    text: 'Sinto muito. Me perdoe. Te amo. Sou grata.',
    type: 'hooponopono',
  },
]

export const getDailyInspiration = (): Affirmation => {
  return allInspirations[Math.floor(Math.random() * allInspirations.length)]
}

export const plannerTasks: PlannerTask[] = [
  {
    id: 'task1',
    content: 'Tirar 10 minutos para ler um livro',
    status: 'todo',
    due_date: new Date().toISOString(),
  },
]

export const weeklyChallenges: Challenge[] = [
  {
    id: 'chal1',
    title: 'Semana da Gratidão',
    description: 'Anote três coisas pelas quais você é grata todos os dias.',
    theme: 'gratitude',
    steps: [
      { id: 's1', description: 'Dia 1', is_completed: true },
      { id: 's2', description: 'Dia 2', is_completed: false },
      { id: 's3', description: 'Dia 3', is_completed: false },
    ],
    personalized_tip:
      'Tente pensar em coisas pequenas e específicas, como o cheiro do café ou um abraço apertado.',
  },
  {
    id: 'chal3',
    title: 'Jornada Hoʻoponopono',
    description: 'Dedique 5 minutos do seu dia para a prática do Hoʻoponopono.',
    theme: 'hooponopono',
    steps: [
      { id: 'h1', description: 'Dia 1: Limpeza Geral', is_completed: false },
      { id: 'h2', description: 'Dia 2: Foco no Perdão', is_completed: false },
      { id: 'h3', description: 'Dia 3: Foco no Amor', is_completed: false },
    ],
    personalized_tip:
      'Encontre um lugar tranquilo, feche os olhos e repita as frases "Sinto muito, me perdoe, te amo, sou grata" focando em uma situação específica que te incomoda.',
  },
  {
    id: 'chal4',
    title: 'Comunicação Consciente',
    description:
      'Pratique a escuta ativa em uma conversa importante esta semana.',
    theme: 'communication',
    steps: [
      {
        id: 'c1',
        description: 'Escolha a conversa e a pessoa',
        is_completed: false,
      },
      {
        id: 'c2',
        description: 'Pratique ouvir sem interromper',
        is_completed: false,
      },
      {
        id: 'c3',
        description: 'Reflita sobre como se sentiu',
        is_completed: false,
      },
    ],
    personalized_tip:
      'O objetivo não é concordar, mas sim compreender o ponto de vista do outro. Tente repetir o que ouviu com suas palavras para confirmar o entendimento.',
  },
  {
    id: 'chal5',
    title: 'Hoʻoponopono para o Amor Próprio',
    description:
      'Direcione a prática do Hoʻoponopono para si mesma, cultivando a autoaceitação.',
    theme: 'self-love',
    steps: [
      {
        id: 'sl1',
        description: 'Olhe-se no espelho e diga "Sinto muito"',
        is_completed: false,
      },
      {
        id: 'sl2',
        description: 'Continue com "Por favor, me perdoe"',
        is_completed: false,
      },
      {
        id: 'sl3',
        description: 'Finalize com "Eu te amo" e "Sou grata"',
        is_completed: false,
      },
    ],
    personalized_tip:
      'Faça isso ao acordar. Perdoe-se por autojulgamentos e reconheça sua própria divindade e beleza. É um ato poderoso de reconciliação interna.',
  },
  {
    id: 'chal6',
    title: 'Hoʻoponopono para Relacionamentos',
    description:
      'Use o Hoʻoponopono para limpar memórias dolorosas em um relacionamento importante.',
    theme: 'relationships',
    steps: [
      {
        id: 'r1',
        description: 'Pense na pessoa e na situação',
        is_completed: false,
      },
      {
        id: 'r2',
        description: 'Repita as 4 frases focando no sentimento',
        is_completed: false,
      },
      {
        id: 'r3',
        description: 'Observe a mudança na sua percepção',
        is_completed: false,
      },
    ],
    personalized_tip:
      'Você não precisa falar com a pessoa. A limpeza acontece dentro de você, mudando a energia entre vocês e abrindo espaço para a harmonia.',
  },
]

const allLibraryResources: LibraryResource[] = [
  {
    id: 'res1',
    title: 'A exaustão em mulheres na sociedade do cansaço',
    description:
      'Um artigo profundo sobre a carga mental e a pressão por produtividade.',
    type: 'article',
    url: '#',
    cover_image_url:
      'https://img.usecurling.com/p/400/300?q=woman%20tired%20reading',
    topic: 'mental_health',
  },
]

const allTopics = [
  'mental_health',
  'relationships',
  'motherhood',
  'personal_development',
]

export const getDynamicLibraryResources = (): {
  resources: LibraryResource[]
  topics: string[]
} => {
  const activeTopics = shuffleAndTake(allTopics, 3)
  const resources = allLibraryResources.filter((res) =>
    activeTopics.includes(res.topic),
  )
  return { resources, topics: activeTopics }
}

export const { resources: libraryResources, topics: libraryTopics } =
  getDynamicLibraryResources()

export const hooponoponoPractices: HooponoponoPractice[] = [
  {
    id: 'hoop1',
    title: 'Limpando Memórias de Dor',
    phrase: 'Sinto muito. Me perdoe. Te amo. Sou grata.',
    explanation:
      "Esta é a prática central do Ho'oponopono. Ao repeti-la, você pede ao Divino para limpar as memórias dolorosas em você que se manifestam como problemas no mundo.",
    practice_tip:
      'Repita as quatro frases mentalmente, focando no sentimento ou situação que te incomoda. Não precisa sentir nada especial, apenas confie no processo de limpeza.',
    aidaStory: {
      attention:
        'Ana sentia um peso constante no peito, uma tristeza antiga que ela não sabia de onde vinha.',
      interest:
        'Ela ouviu falar de uma prática havaiana simples, quatro frases que prometiam limpeza e paz.',
      desire:
        'Imaginou como seria acordar um dia sem aquele aperto, sentindo-se leve e livre daquele fardo invisível.',
      action:
        'Então, em silêncio, ela começou a repetir para si mesma: "Sinto muito, me perdoe, te amo, sou grata", entregando sua dor.',
    },
  },
  {
    id: 'hoop2',
    title: 'Assumindo 100% de Responsabilidade',
    phrase:
      'Divindade, limpe em mim o que está contribuindo para este problema.',
    explanation:
      "O Ho'oponopono nos ensina que somos 100% responsáveis por tudo em nossa realidade. Esta frase é uma forma de entregar o problema para a Divindade, pedindo que a causa dentro de você seja curada.",
    practice_tip:
      'Quando se deparar com um conflito ou uma situação difícil, repita esta frase. É um ato de humildade e entrega, liberando a necessidade de controlar o resultado.',
    aidaStory: {
      attention:
        'Toda vez que seu chefe a criticava, Laura sentia uma raiva imensa, arruinando seu dia.',
      interest:
        "Ela aprendeu que, segundo o Ho'oponopono, a reação dela era uma memória interna, não culpa do chefe.",
      desire:
        'Laura desejou profundamente não ser mais refém daquela raiva, querendo sentir paz mesmo diante da crítica.',
      action:
        'Antes da próxima reunião, ela fechou os olhos e pediu: "Divindade, limpe em mim o que está contribuindo para este problema."',
    },
  },
  {
    id: 'hoop3',
    title: 'Hoʻoponopono para Abundância',
    phrase: 'Eu abençoo o dinheiro com amor. Sou grata pela abundância.',
    explanation:
      'Esta prática ajuda a limpar crenças limitantes sobre dinheiro e prosperidade, abrindo espaço para que a abundância flua em sua vida.',
    practice_tip:
      'Ao pagar uma conta ou receber dinheiro, repita esta frase. Mude sua relação com o dinheiro de medo ou escassez para uma de gratidão e amor.',
    aidaStory: {
      attention:
        'Clara sempre se preocupava com as contas no final do mês, sentindo um nó no estômago.',
      interest:
        'Ela descobriu que o Hoʻoponopono poderia ser usado para curar sua relação com o dinheiro.',
      desire:
        'Ela sonhava em sentir paz e segurança financeira, vendo o dinheiro como um fluxo de energia e não como uma fonte de estresse.',
      action:
        'Ao pagar o aluguel, em vez de sentir pesar, ela mentalizou: "Eu abençoo este dinheiro com amor. Sou grata pela abundância que me permite ter um lar."',
    },
  },
  {
    id: 'hoop4',
    title: 'Hoʻoponopono para Saúde',
    phrase:
      'Meu corpo, sinto muito. Por favor, me perdoe. Eu te amo. Sou grata.',
    explanation:
      'Direcione as quatro frases para o seu corpo, pedindo perdão por negligência, julgamentos ou maus hábitos, e expressando amor e gratidão por sua saúde.',
    practice_tip:
      'Coloque as mãos sobre uma parte do seu corpo que precise de cura ou atenção e repita as frases com sinceridade. Agradeça seu corpo por tudo que ele faz por você.',
    aidaStory: {
      attention:
        'Joana vivia com uma dor crônica nas costas que a limitava e frustrava diariamente.',
      interest:
        'Ela leu que poderia "conversar" com seu corpo usando o Hoʻoponopono para promover a cura.',
      desire:
        'Ela desejava mais do que tudo um dia sem dor, sentindo-se em harmonia e paz com seu próprio corpo.',
      action:
        'Deitada na cama, ela colocou as mãos sobre as costas e sussurrou: "Minhas costas, sinto muito por toda a tensão que coloquei em vocês. Por favor, me perdoem. Eu amo vocês. Sou grata por me sustentarem."',
    },
  },
]

export const getDailyHooponopono = (): HooponoponoPractice => {
  // Returns the first practice consistently as per the requirement to remove time-based updates.
  return hooponoponoPractices[0]
}

export const getRandomHooponopono = (): HooponoponoPractice => {
  return hooponoponoPractices[
    Math.floor(Math.random() * hooponoponoPractices.length)
  ]
}

export const soothingSounds: SoothingSound[] = [
  {
    id: 'sound1',
    name: 'Ondas Suaves da Praia',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    duration_seconds: 180,
  },
  {
    id: 'sound2',
    name: 'Chuva Leve na Floresta',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3',
    duration_seconds: 240,
  },
  {
    id: 'sound3',
    name: 'Som Branco (White Noise)',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration_seconds: 300,
  },
  {
    id: 'sound4',
    name: 'Canto dos Pássaros',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration_seconds: 210,
  },
  {
    id: 'sound5',
    name: 'Música Clássica Calma',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration_seconds: 420,
  },
  {
    id: 'sound6',
    name: 'Lareira Crepitante',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    duration_seconds: 360,
  },
  {
    id: 'sound7',
    name: 'Tigelas Tibetanas',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    duration_seconds: 600,
  },
  {
    id: 'sound8',
    name: 'Melodia de Piano Relaxante',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    duration_seconds: 280,
  },
]

export const gamificationBadges: (GamificationBadge & {
  pointsThreshold: number
})[] = [
  {
    id: 'badge1',
    name: 'Primeiro Passo',
    description: 'Você iniciou sua jornada de autocuidado. Parabéns!',
    icon: Star,
    pointsThreshold: 10,
  },
  {
    id: 'badge2',
    name: 'Coração Aberto',
    description: 'Completou seu primeiro desabafo no Diário de Voz.',
    icon: MessageSquareHeart,
    pointsThreshold: 50,
  },
  {
    id: 'badge3',
    name: 'Mente Sábia',
    description: 'Concluiu seu primeiro minicurso.',
    icon: BookHeart,
    pointsThreshold: 100,
  },
  {
    id: 'badge4',
    name: 'Guerreira do Desafio',
    description: 'Completou seu primeiro desafio semanal.',
    icon: Trophy,
    pointsThreshold: 150,
  },
  {
    id: 'badge5',
    name: 'Paz Interior',
    description: 'Escreveu 5 vezes no Diário Hoʻoponopono.',
    icon: Sparkles,
    pointsThreshold: 250,
  },
  {
    id: 'badge6',
    name: 'Elo de Apoio',
    description: 'Participou de um Desafio da Comunidade.',
    icon: Users2,
    pointsThreshold: 350,
  },
]

export const communityChallenges: CommunityChallenge[] = [
  {
    id: 'cc1',
    title: 'Maratona de Gratidão Coletiva',
    description:
      'Vamos juntas registrar 1.000 momentos de gratidão esta semana! Cada vez que você usar o Diário Hoʻoponopono com foco em gratidão, você contribui.',
    goal: 1000,
    currentProgress: 452,
    unit: 'momentos',
    rewardPoints: 100,
    endDate: addDays(today, 5).toISOString(),
  },
  {
    id: 'cc2',
    title: 'Onda de Cuidado',
    description:
      'Complete 500 trilhas de autocuidado "Cuidar de Mim" como comunidade para desbloquear uma meditação exclusiva para todas!',
    goal: 500,
    currentProgress: 123,
    unit: 'trilhas',
    rewardPoints: 150,
    endDate: addDays(today, 10).toISOString(),
  },
]
