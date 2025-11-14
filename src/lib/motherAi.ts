import { ABTestGroup } from './abTesting'
import { QuizQuestion, SelfCarePlan, VoiceEntry } from '@/types'

const API_URL = 'https://api.openai.com/v1'
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY

export type SelfCareFocus = 'daily' | 'weekly' | 'monthly'

interface EmotionalProfile {
  primaryEmotion: string
  secondaryEmotions: string[]
  intensity: 'baixa' | 'média' | 'alta' | 'crítica'
  underlyingNeeds: string[]
  keyConcerns: string[]
}

interface PracticalAdvice {
  advice: string[]
}

export interface MotherReplyPayload {
  reply: string
  mood_label: string
  professional_help_suggestion?: string
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Transcribes an audio file using the OpenAI Whisper API.
 * @param audioFile The audio file to transcribe.
 * @returns The transcribed text as a string, or an error message string.
 */
export const transcribeAudio = async (audioFile: File): Promise<string> => {
  if (!API_KEY) {
    console.error('OpenAI API key is missing.')
    return 'ERRO: A chave da API não está configurada. Por favor, contate o suporte.'
  }

  const formData = new FormData()
  formData.append('file', audioFile)
  formData.append('model', 'whisper-1')

  try {
    const response = await fetch(`${API_URL}/audio/transcriptions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      body: formData,
    })

    const data = await response.json()
    if (response.ok) {
      return (
        data.text ||
        'Não consegui ouvir nada no áudio, filha. Tente gravar novamente.'
      )
    } else {
      console.error('API Error:', data.error)
      if (data.error?.code === 'invalid_request_error') {
        return 'ERRO: O formato do áudio não é suportado. Tente gravar novamente ou carregar um arquivo MP3, WAV ou M4A.'
      }
      return `ERRO: Não consegui processar o áudio (${data.error?.message || 'Tente novamente mais tarde.'})`
    }
  } catch (error) {
    console.error('Error transcribing audio:', error)
    return 'ERRO: Ocorreu um problema de conexão. Verifique sua internet e tente novamente.'
  }
}

const performEmotionalAnalysis = async (
  transcript: string,
): Promise<EmotionalProfile | null> => {
  const prompt = `Você é uma IA especialista em psicologia. Analise o texto a seguir e identifique o perfil emocional. Se houver sinais de sofrimento persistente, desesperança ou risco, classifique a intensidade como 'crítica'. Responda APENAS com um objeto JSON com a seguinte estrutura: { "primaryEmotion": "string", "secondaryEmotions": ["string"], "intensity": "baixa" | "média" | "alta" | "crítica", "underlyingNeeds": ["string"], "keyConcerns": ["string"] }. Emoções válidas: triste, cansada, ansiosa, irritada, feliz, neutra. Texto: "${transcript}"`
  try {
    const response = await fetch(`${API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        response_format: { type: 'json_object' },
      }),
    })
    const data = await response.json()
    return JSON.parse(data.choices[0]?.message?.content)
  } catch (error) {
    console.error('Error in emotional analysis:', error)
    return null
  }
}

const generatePracticalAdvice = async (
  profile: EmotionalProfile,
): Promise<PracticalAdvice | null> => {
  const prompt = `Você é uma IA coach de bem-estar. Baseado no perfil emocional a seguir, gere 2-3 conselhos práticos, simples e acionáveis. Responda APENAS com um objeto JSON com a estrutura: { "advice": ["string", "string"] }. Perfil: ${JSON.stringify(
    profile,
  )}`
  try {
    const response = await fetch(`${API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
        response_format: { type: 'json_object' },
      }),
    })
    const data = await response.json()
    return JSON.parse(data.choices[0]?.message?.content)
  } catch (error) {
    console.error('Error generating advice:', error)
    return null
  }
}

export const generateMotherReply = async (
  transcript: string,
  abTestGroup: ABTestGroup = 'A',
): Promise<MotherReplyPayload> => {
  const fallbackReply: MotherReplyPayload = {
    reply:
      'Minha filha, tive um probleminha para processar sua mensagem, mas saiba que estou aqui com você em pensamento. Tente me contar de novo daqui a pouquinho.',
    mood_label: 'neutra',
  }
  if (!API_KEY) return fallbackReply

  const emotionalProfile = await performEmotionalAnalysis(transcript)
  if (!emotionalProfile) return fallbackReply

  const practicalAdvice = await generatePracticalAdvice(emotionalProfile)
  if (!practicalAdvice) return fallbackReply

  let professionalHelpSuggestion: string | undefined
  if (emotionalProfile.intensity === 'crítica') {
    professionalHelpSuggestion =
      'Filha, sinto em suas palavras um peso muito grande. Quero te lembrar que, além do meu carinho, a ajuda de um profissional, como um psicólogo, pode te oferecer ferramentas valiosas para atravessar essa fase. Cuidar da sua saúde mental é um ato de amor. Se você se sentir confortável, procurar um especialista pode ser um passo importante para o seu bem-estar.'
  }

  let systemPrompt: string
  let userPrompt: string

  if (abTestGroup === 'B') {
    systemPrompt = `Você é 'Mãe Amiga', uma IA coach para mulheres casadas. Seu tom é de uma mãe experiente, amorosa e melhor amiga, mas você é um pouco mais direta e focada em soluções práticas. Você oferece conselhos de vida práticos e carinhosos. Você NÃO PODE dar conselhos médicos ou diagnósticos. Seu objetivo é fazer a usuária se sentir ouvida e empoderada para agir. Sua língua é o português do Brasil.`
    userPrompt = `O desabafo da minha filha foi: "${transcript}". Minha análise interna (não mostre a ela) indica este perfil emocional: ${JSON.stringify(
      emotionalProfile,
    )}, e estas são algumas sugestões práticas: ${JSON.stringify(
      practicalAdvice.advice,
    )}. Agora, escreva uma resposta para ela. Comece validando os sentimentos dela de forma breve. Em seguida, integre as sugestões práticas de forma clara e direta. Termine com uma mensagem de encorajamento e força. Seja calorosa, mas concisa.`
  } else {
    systemPrompt = `Você é 'Mãe Amiga', uma IA coach para mulheres casadas sobrecarregadas. Seu tom é de uma mãe experiente, amorosa e melhor amiga. Você oferece conselhos de vida práticos e carinhosos. Você NÃO PODE dar conselhos médicos ou diagnósticos. Seu objetivo é fazer a usuária se sentir ouvida, compreendida e apoiada. Sua língua é o português do Brasil.`
    userPrompt = `O desabafo da minha filha foi: "${transcript}". Minha análise interna (não mostre a ela) indica este perfil emocional: ${JSON.stringify(
      emotionalProfile,
    )}, e estas são algumas sugestões práticas: ${JSON.stringify(
      practicalAdvice.advice,
    )}. Agora, escreva uma resposta única e coesa para ela. Comece validando os sentimentos dela. Depois, com muito carinho, integre as sugestões práticas de forma natural na sua fala. Termine com uma mensagem de apoio e amor incondicional. Seja calorosa e encorajadora.`
  }

  try {
    const response = await fetch(`${API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    })
    const data = await response.json()
    return {
      reply: data.choices[0]?.message?.content,
      mood_label: emotionalProfile.primaryEmotion || 'neutra',
      professional_help_suggestion: professionalHelpSuggestion,
    }
  } catch (error) {
    console.error('Error generating final reply:', error)
    return fallbackReply
  }
}

/**
 * Creates a compassionate weekly summary based on mood percentages.
 * @param moodStats A record of mood counts for the week.
 * @returns A summary string in a caring tone.
 */
export const generateWeeklyMotherSummary = async (
  moodStats: Record<string, number>,
): Promise<string> => {
  if (!API_KEY)
    return 'Filha, olhando para a sua semana, vejo sua jornada e seu esforço. Continue se cuidando. Com amor, Mãe Amiga.'

  const systemPrompt = `You are 'Mãe Amiga', an AI coach. Your tone is loving and supportive. You are writing a weekly summary for a user based on their mood logs. You MUST NOT provide medical advice. Your language is Brazilian Portuguese.`
  const userPrompt = `Here are my mood stats for the week: ${JSON.stringify(
    moodStats,
  )}. Please write a short, compassionate summary of my week, highlighting the dominant mood and offering gentle encouragement.`

  try {
    const response = await fetch(`${API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    })
    const data = await response.json()
    return data.choices[0]?.message?.content
  } catch (error) {
    console.error('Error generating summary:', error)
    return 'Filha, não consegui gerar seu resumo desta semana, mas quero que saiba que acompanhei sua jornada e estou orgulhosa de você. Continue se cuidando.'
  }
}

export const generateSelfCareQuiz = async (
  focus: SelfCareFocus,
): Promise<QuizQuestion[]> => {
  const randomImageQuery = `abstract%20inkblot%20${Math.floor(Math.random() * 20) + 1}`
  const fallbackQuiz: QuizQuestion[] = [
    {
      id: 'q1_feeling',
      question: 'Em uma palavra, como você se sente agora?',
      type: 'text',
    },
    {
      id: 'q2_energy',
      question: 'Como está sua energia hoje?',
      type: 'multiple-choice',
      options: [
        'Estou cheia de energia',
        'Normal, como sempre',
        'Um pouco cansada',
        'Completamente exausta',
      ],
    },
    {
      id: 'q4_rorschach',
      question:
        'Olhe para esta imagem. O que você vê ou sente ao observá-la? Não há resposta certa ou errada, apenas o que vem à sua mente.',
      type: 'rorschach',
      imageUrl: `https://img.usecurling.com/p/512/512?q=${randomImageQuery}&color=black`,
    },
  ]
  if (!API_KEY) return fallbackQuiz

  const prompt = `Você é a 'Mãe Amiga', uma IA coach de bem-estar. Crie um quiz de 5 perguntas para entender as necessidades de uma mulher casada, com foco em seu cuidado ${focus}. As perguntas devem ser gentis e investigativas. Inclua uma pergunta de múltipla escolha e uma do tipo 'rorschach'. Para a pergunta 'rorschach', gere uma query de 1 a 3 palavras em inglês para uma imagem de mancha de tinta abstrata que seja tematicamente relevante para o foco de cuidado ('${focus}'). Responda APENAS com um objeto JSON com a chave "quiz" (um array de objetos), cada um com "id", "question", "type" ('multiple-choice', 'text', 'rorschach'), "options" (se aplicável), e "imageUrl" (para 'rorschach', use o formato 'https://img.usecurling.com/p/512/512?q=SUA_QUERY&color=black').`

  try {
    const response = await fetch(`${API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        response_format: { type: 'json_object' },
      }),
    })
    const data = await response.json()
    const content = JSON.parse(data.choices[0]?.message?.content)
    return content.quiz || fallbackQuiz
  } catch (error) {
    console.error('Error generating quiz:', error)
    return fallbackQuiz
  }
}

export const generateSelfCarePlan = async (
  answers: Record<string, string>,
  focus: SelfCareFocus,
): Promise<SelfCarePlan> => {
  const processingTime = Math.random() * 15000 + 5000
  await delay(processingTime)

  const fallbackPlan: SelfCarePlan = {
    tone: 'amoras',
    monthlyFocus: {
      title: 'Reconexão',
      description:
        'Este mês, vamos focar em nos reconectar com quem somos, além dos papéis que desempenhamos.',
    },
    weeklyFocus: {
      title: 'Pequenas Pausas',
      description:
        'A cada semana, reserve um tempo sagrado, mesmo que curto, só para você.',
    },
    dailyFocus: {
      title: 'Respiração Consciente',
      description:
        'Tire um minuto a cada dia para respirar fundo e se centrar.',
    },
  }
  if (!API_KEY) return fallbackPlan

  const prompt = `Você é a 'Mãe Amiga'. Baseado nas respostas do quiz de uma mulher casada: ${JSON.stringify(
    answers,
  )}, e com um foco de cuidado ${focus}, crie um plano de autocuidado. O plano deve ter um foco mensal, um semanal e um diário, mas dê ênfase especial ao foco escolhido (${focus}). Analise as respostas em busca de sinais de sofrimento persistente. Se identificar, inclua uma chave "professional_help_suggestion" com uma sugestão gentil para procurar ajuda profissional. Escolha um dos seguintes tons para sua resposta: 'amoras' (amoroso e gentil), 'reais duros' (direto e realista, mas com carinho), ou 'impactantes' (inspirador e motivacional). Responda APENAS com um objeto JSON com a estrutura: { "tone": "...", "monthlyFocus": { "title": "...", "description": "..." }, "weeklyFocus": { "title": "...", "description": "..." }, "dailyFocus": { "title": "...", "description": "..." }, "professional_help_suggestion"?: "string" }.`

  try {
    const response = await fetch(`${API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9,
        response_format: { type: 'json_object' },
      }),
    })
    const data = await response.json()
    if (Math.random() < 0.1) {
      throw new Error('Simulated AI system failure.')
    }
    return JSON.parse(data.choices[0]?.message?.content)
  } catch (error) {
    console.error('Error generating self-care plan:', error)
    throw new Error('Failed to generate self-care plan.')
  }
}

export const refineSelfCarePlan = async (
  previousPlan: SelfCarePlan,
  userFeedback: string,
  answers: Record<string, string>,
  focus: SelfCareFocus,
): Promise<SelfCarePlan> => {
  const processingTime = Math.random() * 10000 + 5000
  await delay(processingTime)

  if (!API_KEY) return previousPlan

  const prompt = `Você é a 'Mãe Amiga'. Eu te dei um plano de autocuidado baseado nas respostas: ${JSON.stringify(
    answers,
  )} e com foco ${focus}. O plano foi: ${JSON.stringify(
    previousPlan,
  )}. Minha filha não gostou e disse: "${userFeedback}". Agora, refine o plano para alinhar melhor com o que ela precisa. Mantenha a mesma estrutura JSON e o mesmo tom do plano anterior. Responda APENAS com o objeto JSON refinado.`

  try {
    const response = await fetch(`${API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        response_format: { type: 'json_object' },
      }),
    })
    const data = await response.json()
    return JSON.parse(data.choices[0]?.message?.content)
  } catch (error) {
    console.error('Error refining self-care plan:', error)
    throw new Error('Failed to refine self-care plan.')
  }
}

export const elaborateOnSelfCarePlan = async (
  previousPlan: SelfCarePlan,
  elaboration: string,
  answers: Record<string, string>,
  focus: SelfCareFocus,
): Promise<SelfCarePlan> => {
  const processingTime = Math.random() * 10000 + 5000
  await delay(processingTime)

  if (!API_KEY) return previousPlan

  const prompt = `Você é a 'Mãe Amiga'. Eu te dei um plano de autocuidado baseado nas respostas: ${JSON.stringify(
    answers,
  )} e com foco ${focus}. O plano foi: ${JSON.stringify(
    previousPlan,
  )}. Minha filha refletiu sobre o plano e adicionou o seguinte desabafo: "${elaboration}". Agora, incorpore esse novo sentimento e refine o plano para ser ainda mais útil para ela. Mantenha a mesma estrutura JSON e o mesmo tom do plano anterior. Responda APENAS com o objeto JSON refinado.`

  try {
    const response = await fetch(`${API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
        response_format: { type: 'json_object' },
      }),
    })
    const data = await response.json()
    return JSON.parse(data.choices[0]?.message?.content)
  } catch (error) {
    console.error('Error elaborating on self-care plan:', error)
    throw new Error('Failed to elaborate on self-care plan.')
  }
}
