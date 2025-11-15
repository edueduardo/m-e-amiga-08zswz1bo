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
  ThematicRoom,
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
  Baby,
  HeartCrack,
  Briefcase,
  User,
  Heart,
} from 'lucide-react'

// Helper for daily deterministic randomness
const getDaySeed = () => {
  const today = new Date()
  return (
    today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  )
}

// A simple seeded shuffle function
function seededShuffle<T>(array: T[], seed: number): T[] {
  let currentIndex = array.length,
    randomIndex
  const newArray = [...array]

  const random = () => {
    const x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }

  while (currentIndex !== 0) {
    randomIndex = Math.floor(random() * currentIndex)
    currentIndex--
    ;[newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ]
  }
  return newArray
}

export const testimonials: Testimonial[] = [
  {
    name: 'Ana P.',
    quote:
      'Finalmente um lugar seguro para falar o que sinto sem ser julgada. As respostas da Mãe Amiga aquecem meu coração.',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=female&seed=1',
  },
  {
    name: 'Laura B.',
    quote:
      'O "Cabeça de Homem" foi uma virada de chave. Pude ensaiar uma conversa difícil com meu marido e, quando fomos conversar de verdade, eu estava muito mais calma e confiante.',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=female&seed=4',
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
  {
    name: 'Fernanda R.',
    quote:
      'Usei o consultor masculino para entender melhor meu filho adolescente. Ajudou a diminuir as brigas e a gente se aproximou mais. Foi surpreendente.',
    avatarUrl: 'https://img.usecurling.com/ppl/medium?gender=female&seed=5',
  },
]

const today = new Date()

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
  const seed = getDaySeed()
  const index = seed % allInspirations.length
  return allInspirations[index]
}

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
  const seed = getDaySeed()
  const activeTopics = seededShuffle(allTopics, seed).slice(0, 3)
  const resources = allLibraryResources.filter((res) =>
    activeTopics.includes(res.topic),
  )
  return { resources: seededShuffle(resources, seed + 1), topics: activeTopics }
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
  const seed = getDaySeed()
  const index = seed % hooponoponoPractices.length
  return hooponoponoPractices[index]
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

export const getDailyFreeContent = (): {
  practice: HooponoponoPractice
  sounds: SoothingSound[]
} => {
  const seed = getDaySeed()
  const practice = hooponoponoPractices[seed % hooponoponoPractices.length]
  const sounds = seededShuffle(soothingSounds, seed).slice(0, 3)
  return { practice, sounds }
}

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
