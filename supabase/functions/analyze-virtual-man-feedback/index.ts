import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

// Simple stop words list for Portuguese
const stopWords = new Set([
  'de',
  'a',
  'o',
  'que',
  'e',
  'do',
  'da',
  'em',
  'um',
  'para',
  'é',
  'com',
  'não',
  'uma',
  'os',
  'no',
  'se',
  'na',
  'por',
  'mais',
  'as',
  'dos',
  'como',
  'mas',
  'foi',
  'ao',
  'ele',
  'das',
  'tem',
  'à',
  'seu',
  'sua',
  'ou',
  'ser',
  'quando',
  'muito',
  'há',
  'nos',
  'já',
  'está',
  'eu',
  'também',
  'só',
  'pelo',
  'pela',
  'até',
  'isso',
  'ela',
  'entre',
  'era',
  'depois',
  'sem',
  'mesmo',
  'aos',
  'ter',
  'seus',
  'quem',
  'nas',
  'me',
  'esse',
  'eles',
  'estão',
  'você',
  'tinha',
  'foram',
  'essa',
  'num',
  'nem',
  'suas',
  'meu',
  'às',
  'minha',
  'numa',
  'pelos',
  'elas',
  'havia',
  'seja',
  'qual',
  'será',
  'nós',
  'tenho',
  'lhe',
  'deles',
  'essas',
  'esses',
  'pelas',
  'este',
  'fosse',
  'dele',
  'tu',
  'te',
  'vocês',
  'vos',
  'lhes',
  'meus',
  'minhas',
  'teu',
  'tua',
  'teus',
  'tuas',
  'nosso',
  'nossa',
  'nossos',
  'nossas',
  'dela',
  'delas',
  'esta',
  'estes',
  'estas',
  'aquele',
  'aquela',
  'aqueles',
  'aquelas',
  'isto',
  'aquilo',
  'estou',
  'está',
  'estamos',
  'estão',
  'estive',
  'esteve',
  'estivemos',
  'estiveram',
  'estava',
  'estávamos',
  'estavam',
  'estivera',
  'estivéramos',
  'esteja',
  'estejamos',
  'estejam',
  'estivesse',
  'estivéssemos',
  'estivessem',
  'estiver',
  'estivermos',
  'estiverem',
  'hei',
  'há',
  'havemos',
  'hão',
  'houve',
  'houvemos',
  'houveram',
  'houvera',
  'houvéramos',
  'haja',
  'hajamos',
  'hajam',
  'houvesse',
  'houvéssemos',
  'houvessem',
  'houver',
  'houvermos',
  'houverem',
  'houverei',
  'houverá',
  'houveremos',
  'houverão',
  'houveria',
  'houveríamos',
  'houveriam',
  'sou',
  'somos',
  'são',
  'era',
  'éramos',
  'eram',
  'fui',
  'foi',
  'fomos',
  'foram',
  'fora',
  'fôramos',
  'seja',
  'sejamos',
  'sejam',
  'fosse',
  'fôssemos',
  'fossem',
  'for',
  'formos',
  'forem',
  'serei',
  'será',
  'seremos',
  'serão',
  'seria',
  'seríamos',
  'seriam',
  'tenho',
  'tem',
  'temos',
  'tém',
  'tinha',
  'tínhamos',
  'tinham',
  'tive',
  'teve',
  'tivemos',
  'tiveram',
  'tivera',
  'tivéramos',
  'tenha',
  'tenhamos',
  'tenham',
  'tivesse',
  'tivéssemos',
  'tivessem',
  'tiver',
  'tivermos',
  'tiverem',
  'terei',
  'terá',
  'teremos',
  'terão',
  'teria',
  'teríamos',
  'teriam',
])

function extractKeywords(
  text: string,
  wordCount: number = 10,
): { [key: string]: number } {
  if (!text) return {}
  const words = text
    .toLowerCase()
    .replace(/[.,!?;:()"]/g, '')
    .split(/\s+/)
  const wordFrequencies: { [key: string]: number } = {}

  for (const word of words) {
    if (word.length > 2 && !stopWords.has(word)) {
      wordFrequencies[word] = (wordFrequencies[word] || 0) + 1
    }
  }

  const sortedKeywords = Object.entries(wordFrequencies)
    .sort(([, a], [, b]) => b - a)
    .slice(0, wordCount)

  return Object.fromEntries(sortedKeywords)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Fetch all interactions
    const { data: interactions, error: fetchError } = await supabaseAdmin
      .from('virtual_man_interactions')
      .select('feedback_rating, feedback_comment')

    if (fetchError) {
      throw fetchError
    }

    // 2. Analyze feedback
    let positive_feedback_count = 0
    let negative_feedback_count = 0
    let positiveComments = ''
    let negativeComments = ''

    for (const interaction of interactions) {
      if (interaction.feedback_rating === 'helpful') {
        positive_feedback_count++
        if (interaction.feedback_comment) {
          positiveComments += interaction.feedback_comment + ' '
        }
      } else if (interaction.feedback_rating === 'not_helpful') {
        negative_feedback_count++
        if (interaction.feedback_comment) {
          negativeComments += interaction.feedback_comment + ' '
        }
      }
    }

    // 3. Extract keywords
    const common_positive_keywords = extractKeywords(positiveComments)
    const common_negative_keywords = extractKeywords(negativeComments)

    // 4. (Optional) Generate AI-based improvement suggestions
    const improvement_suggestions =
      'Análise de IA para sugestões de melhoria ainda não implementada. Focar em reduzir palavras-chave negativas e aumentar as positivas.'

    // 5. Save analysis to the database
    const { error: insertError } = await supabaseAdmin
      .from('virtual_man_feedback_analysis')
      .insert({
        positive_feedback_count,
        negative_feedback_count,
        common_positive_keywords,
        common_negative_keywords,
        improvement_suggestions,
      })

    if (insertError) {
      throw insertError
    }

    return new Response(
      JSON.stringify({ message: 'Feedback analysis completed successfully.' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
