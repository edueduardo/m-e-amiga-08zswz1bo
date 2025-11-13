// TODO: Replace these mock functions with actual AI API calls (e.g., OpenAI).

/**
 * Mocks mood detection based on keywords in the transcript.
 * @param transcript The user's text entry.
 * @returns A mood label string.
 */
export const analyzeMoodFromText = async (
  transcript: string,
): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay
  const lowerCaseTranscript = transcript.toLowerCase()
  if (
    lowerCaseTranscript.includes('triste') ||
    lowerCaseTranscript.includes('chorando')
  )
    return 'triste'
  if (
    lowerCaseTranscript.includes('ansiosa') ||
    lowerCaseTranscript.includes('preocupada')
  )
    return 'ansiosa'
  if (
    lowerCaseTranscript.includes('cansada') ||
    lowerCaseTranscript.includes('exausta')
  )
    return 'cansada'
  if (
    lowerCaseTranscript.includes('irritada') ||
    lowerCaseTranscript.includes('brava')
  )
    return 'irritada'
  if (
    lowerCaseTranscript.includes('feliz') ||
    lowerCaseTranscript.includes('contente')
  )
    return 'feliz'
  return 'neutra'
}

/**
 * Mocks generating a caring, practical response based on the detected mood.
 * @param _transcript The user's text entry (unused in mock).
 * @param mood The detected mood.
 * @returns A compassionate response string.
 */
export const generateMotherReply = async (
  _transcript: string,
  mood: string,
): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate AI processing time
  switch (mood) {
    case 'triste':
      return 'Oh, minha filha, sinto muito que você esteja se sentindo assim. Lembre-se que é normal ter dias difíceis. Permita-se sentir, chore se precisar. Que tal tomar um chá quentinho e se enrolar na sua coberta favorita por alguns minutos? Estou aqui com você em pensamento.'
    case 'ansiosa':
      return 'Filha, respira fundo. Sinto sua angústia daqui. Tente focar no agora. O que você pode controlar neste exato momento? Talvez uma caminhada curta ou ouvir uma música que te acalme possa ajudar a clarear a mente. Um passo de cada vez, querida.'
    case 'cansada':
      return 'Minha querida, imagino o quanto você deve estar exausta. Você se doa tanto para todos. Lembre-se que para cuidar dos outros, você precisa primeiro cuidar de si mesma. Será que hoje você não consegue delegar uma pequena tarefa ou tirar 15 minutinhos só para você, sem culpa? Você merece esse descanso.'
    case 'irritada':
      return 'Entendo sua irritação, filha. Às vezes, as coisas nos tiram do sério mesmo. É importante colocar essa energia para fora de uma forma que não te machuque. Que tal escrever tudo o que está sentindo ou dar uma volta para espairecer? Depois, com a cabeça mais fria, tudo parece diferente.'
    case 'feliz':
      return 'Que alegria ler isso, filha! Fico com o coração quentinho em saber que você está feliz. Aproveite cada segundo desse sentimento. Guarde essa sensação boa no coração para os dias que não forem tão fáceis. Celebre suas conquistas, por menores que pareçam!'
    default:
      return 'Oi, filha. Obrigada por compartilhar isso comigo. Mesmo nos dias que parecem comuns, é importante a gente se ouvir e entender o que se passa aí dentro. Continue se observando com carinho. Estou sempre aqui para te ouvir.'
  }
}

/**
 * Mocks creating a compassionate weekly summary based on mood percentages.
 * @param moodStats A record of mood counts for the week.
 * @returns A summary string in a caring tone.
 */
export const generateWeeklyMotherSummary = async (
  moodStats: Record<string, number>,
): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate AI processing

  const dominantMood = Object.keys(moodStats).reduce(
    (a, b) => (moodStats[a] > moodStats[b] ? a : b),
    'neutra',
  )

  let summary = `Filha, olhando para a sua semana, percebi que a emoção que mais apareceu foi a de se sentir **${dominantMood}**. `

  switch (dominantMood) {
    case 'triste':
      summary +=
        'Parece que foram dias mais pesados e emotivos. Quero que saiba que sua força não está em não cair, mas em sempre se levantar. Seja gentil com você nesse processo.'
      break
    case 'ansiosa':
      summary +=
        'Notei uma agitação e preocupação nos seus dias. Lembre-se de ser paciente com seu coração e sua mente. Pequenas pausas para respirar podem fazer uma grande diferença.'
      break
    case 'cansada':
      summary +=
        'Foi uma semana de muito desgaste, não é? Seu corpo e sua mente estão pedindo um pouco de calma. Não se esqueça de que descansar não é um luxo, é uma necessidade.'
      break
    case 'irritada':
      summary +=
        'Percebi que o estresse e a irritação estiveram presentes. É um sinal de que seus limites podem ter sido ultrapassados. Tente observar o que tem tirado sua paz.'
      break
    case 'feliz':
      summary +=
        'Que delícia ver que a felicidade marcou sua semana! Que essa luz continue brilhando e que você guarde essa energia boa para iluminar os próximos dias.'
      break
    default:
      summary +=
        'Foi uma semana de emoções mais equilibradas. Isso é ótimo, mostra que você está encontrando seu ritmo. Continue se cuidando e se ouvindo.'
      break
  }

  return (
    summary +
    ' Lembre-se sempre: estou aqui para você, orgulhosa de cada passo seu. Com amor, Mãe Amiga.'
  )
}
