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
    ],
  },
  {
    id: '2',
    slug: 'resgatando-o-autocuidado',
    title: 'Resgatando o Autocuidado',
    summary:
      'Pequenos passos para voltar a se colocar como prioridade na sua vida.',
    isAiGenerated: true,
    lessons: [
      {
        id: '201',
        course_slug: 'resgatando-o-autocuidado',
        lesson_number: 1,
        title: '5 minutos que salvam',
        content_markdown:
          'Autocuidado não é um dia no spa. Comece com 5 minutos. Apenas 5 minutos por dia que sejam SÓ SEUS. Pode ser para tomar um café em silêncio, ouvir uma música, ou simplesmente não fazer nada.',
      },
    ],
  },
  {
    id: '3',
    slug: 'lidando-com-a-culpa-materna',
    title: 'Lidando com a Culpa Materna',
    summary: 'Entenda e acolha a culpa para viver uma maternidade mais leve.',
    isAiGenerated: true,
    lessons: [],
  },
  {
    id: '4',
    slug: 'estabelecendo-limites-saudaveis',
    title: 'Estabelecendo Limites Saudáveis',
    summary: 'Aprenda a dizer "não" sem culpa e a proteger sua energia.',
    isAiGenerated: true,
    lessons: [],
  },
  {
    id: '5',
    slug: 'reconectando-se-com-seu-parceiro',
    title: 'Reconectando-se com seu Parceiro',
    summary:
      'Dicas para reacender a intimidade e a parceria no relacionamento.',
    isAiGenerated: true,
    lessons: [],
  },
  {
    id: '6',
    slug: 'gerenciamento-do-estresse-diario',
    title: 'Gerenciamento do Estresse Diário',
    summary: 'Técnicas simples para encontrar calma no meio do caos.',
    isAiGenerated: true,
    lessons: [],
  },
  {
    id: '7',
    slug: 'organizando-a-rotina-da-casa',
    title: 'Organizando a Rotina da Casa',
    summary: 'Como criar um sistema que funcione para você e sua família.',
    isAiGenerated: true,
    lessons: [],
  },
  {
    id: '8',
    slug: 'cultivando-a-autoestima',
    title: 'Cultivando a Autoestima',
    summary: 'Práticas para se enxergar com mais amor e gentileza.',
    isAiGenerated: true,
    lessons: [],
  },
  {
    id: '9',
    slug: 'financas-para-mulheres',
    title: 'Finanças para Mulheres',
    summary: 'Assuma o controle da sua vida financeira com confiança.',
    isAiGenerated: true,
    lessons: [],
  },
  {
    id: '10',
    slug: 'encontrando-prazer-nas-pequenas-coisas',
    title: 'Encontrando Prazer nas Pequenas Coisas',
    summary: 'Um convite para redescobrir a alegria nos detalhes do dia a dia.',
    isAiGenerated: true,
    lessons: [],
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
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    feedback: { rating: null },
  },
  {
    id: '2',
    created_at: subDays(today, 3).toISOString(),
    transcript:
      'Estou tão preocupada com as contas. Fico pensando nisso a noite toda e não consigo dormir direito. Essa ansiedade está me consumindo.',
    mood_label: 'ansiosa',
    mother_reply:
      'Filha, respira fundo. Sinto sua angústia daqui. Tente focar no agora. O que você pode controlar neste exato momento? Talvez uma caminhada curta ou ouvir uma música que te acalme possa ajudar a clarear a mente. Um passo de cada vez, querida.',
    feedback: { rating: 'helpful', comment: 'Gostei do conselho prático.' },
  },
  {
    id: '3',
    created_at: subDays(today, 5).toISOString(),
    transcript:
      'Hoje meu chefe me deu os parabéns por um projeto. Fiquei tão feliz, senti que meu esforço foi reconhecido!',
    mood_label: 'feliz',
    mother_reply:
      'Que alegria ler isso, filha! Fico com o coração quentinho em saber que você está feliz. Aproveite cada segundo desse sentimento. Guarde essa sensação boa no coração para os dias que não forem tão fáceis. Celebre suas conquistas, por menores que pareçam!',
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
  'Orquídea Rara',
  'Pérola do Mar',
  'Brisa Suave',
  'Aurora Boreal',
  'Colibri Veloz',
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
      {
        id: 'reply-1-2',
        postId: 'post-1',
        authorAlias: 'Lua Crescente',
        content:
          'Super normal! Eu comecei a "agendar" meu tempo sozinha. Uma vez por semana, saio para caminhar por 40 minutos. No começo foi difícil, mas agora todo mundo em casa já se acostumou e respeita. Tenta começar com pouco tempo!',
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'post-2',
    authorAlias: 'Estrela Guia',
    title: 'Como conversar com o marido sobre a divisão de tarefas?',
    content:
      'Eu trabalho fora, cuido da casa, das crianças... e meu marido parece que não enxerga. Ele ajuda quando eu peço, mas eu queria que ele tivesse mais iniciativa. Já tentei conversar, mas vira briga. Alguma dica de como abordar isso sem parecer que estou reclamando?',
    created_at: subDays(today, 2).toISOString(),
    replies: [],
  },
]

// New Data for Well-being Features

const allMeditations: MeditationAudio[] = [
  {
    id: 'med1',
    title: 'Respiração para Acalmar a Ansiedade',
    theme: 'relaxation',
    duration_seconds: 300,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 'med2',
    title: 'Foco Pleno para o Trabalho',
    theme: 'focus',
    duration_seconds: 180,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: 'med3',
    title: 'Relaxamento Profundo para Dormir',
    theme: 'sleep',
    duration_seconds: 600,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: 'med4',
    title: 'Meditação da Gratidão',
    theme: 'gratitude',
    duration_seconds: 240,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: 'med5',
    title: 'Fortalecendo a Autoestima',
    theme: 'self-esteem',
    duration_seconds: 360,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
  {
    id: 'med6',
    title: 'Pausa de 5 Minutos',
    theme: 'relaxation',
    duration_seconds: 300,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  },
  {
    id: 'med7',
    title: 'Concentração para Tarefas',
    theme: 'focus',
    duration_seconds: 420,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
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
    title: 'Jornada do Amor Próprio',
    theme: 'self-esteem',
    duration_seconds: 900,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
  },
  {
    id: 'ga3',
    title: 'Lidando com a Sobrecarga',
    theme: 'relaxation',
    duration_seconds: 600,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
  },
  {
    id: 'ga4',
    title: 'Encontrando a Calma Interior',
    theme: 'relaxation',
    duration_seconds: 540,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
  },
  {
    id: 'ga5',
    title: 'O Poder da Gratidão',
    theme: 'gratitude',
    duration_seconds: 480,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
  },
  {
    id: 'ga6',
    title: 'Preparação para um Dia Produtivo',
    theme: 'focus',
    duration_seconds: 400,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
  },
  {
    id: 'ga7',
    title: 'Desconectando para Dormir',
    theme: 'sleep',
    duration_seconds: 800,
    audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
  },
]

const shuffleAndTake = <T>(arr: T[], count: number): T[] => {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count)
}

export const getDynamicMeditations = () => shuffleAndTake(allMeditations, 5)
export const getDynamicGuidedAudios = () => shuffleAndTake(allGuidedAudios, 5)

const allAffirmations: Affirmation[] = [
  {
    id: 'aff1',
    text: 'Eu sou capaz de lidar com todos os desafios que surgirem hoje.',
    mood_target: 'confidence',
  },
  {
    id: 'aff2',
    text: 'Eu permito que a calma preencha minha mente e meu corpo.',
    mood_target: 'anxiety',
  },
  {
    id: 'aff3',
    text: 'Está tudo bem não ser perfeita. Eu sou suficiente como sou.',
    mood_target: 'stress',
  },
  {
    id: 'aff4',
    text: 'Eu escolho focar no que posso controlar e liberar o resto.',
    mood_target: 'general',
  },
  {
    id: 'aff5',
    text: 'Meu valor não é medido pela minha produtividade.',
    mood_target: 'stress',
  },
  {
    id: 'aff6',
    text: 'Eu sou digna de amor, descanso e felicidade.',
    mood_target: 'sadness',
  },
]

export const getDailyAffirmation = (): Affirmation => {
  return allAffirmations[Math.floor(Math.random() * allAffirmations.length)]
}

export const plannerTasks: PlannerTask[] = [
  {
    id: 'task1',
    content: 'Tirar 10 minutos para ler um livro',
    status: 'todo',
  },
  {
    id: 'task2',
    content: 'Agendar consulta médica',
    status: 'in-progress',
  },
  {
    id: 'task3',
    content: 'Fazer uma caminhada de 20 minutos',
    status: 'done',
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
      { id: 's2', description: 'Dia 2', is_completed: true },
      { id: 's3', description: 'Dia 3', is_completed: false },
      { id: 's4', description: 'Dia 4', is_completed: false },
      { id: 's5', description: 'Dia 5', is_completed: false },
      { id: 's6', description: 'Dia 6', is_completed: false },
      { id: 's7', description: 'Dia 7', is_completed: false },
    ],
    personalized_tip:
      'Tente pensar em coisas pequenas e específicas, como o cheiro do café ou um abraço apertado.',
  },
  {
    id: 'chal2',
    title: 'Comunicação Positiva',
    description: 'Faça um elogio sincero ao seu parceiro todos os dias.',
    theme: 'communication',
    steps: [
      { id: 's1', description: 'Dia 1', is_completed: false },
      { id: 's2', description: 'Dia 2', is_completed: false },
      { id: 's3', description: 'Dia 3', is_completed: false },
      { id: 's4', description: 'Dia 4', is_completed: false },
      { id: 's5', description: 'Dia 5', is_completed: false },
    ],
    personalized_tip:
      'Observe algo que ele faz bem e que muitas vezes passa despercebido. O reconhecimento fortalece a conexão.',
  },
]

export const libraryResources: LibraryResource[] = [
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
  {
    id: 'res2',
    title: 'Comunicação Não-Violenta na Prática',
    description:
      'Um vídeo curto com dicas práticas para melhorar o diálogo no relacionamento.',
    type: 'video',
    url: '#',
    cover_image_url:
      'https://img.usecurling.com/p/400/300?q=couple%20talking%20calmly',
    topic: 'relationships',
  },
  {
    id: 'res3',
    title: 'A Maternidade e o Luto da Mulher que Fui',
    description:
      'Recomendação de livro que aborda as transformações da identidade após a chegada dos filhos.',
    type: 'book',
    url: '#',
    cover_image_url:
      'https://img.usecurling.com/p/400/300?q=thoughtful%20mother',
    topic: 'motherhood',
  },
  {
    id: 'res4',
    title: 'O Poder do Hábito',
    description:
      'Como pequenas mudanças na rotina podem transformar sua vida. Recomendação de livro.',
    type: 'book',
    url: '#',
    cover_image_url:
      'https://img.usecurling.com/p/400/300?q=journal%20and%20pen',
    topic: 'personal_development',
  },
]
