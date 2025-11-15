import { supabase } from '@/lib/supabase/client'
import { Course, CourseContent } from '@/types'

export const getCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase.from('courses').select('*')

  if (error) {
    console.error('Error fetching courses:', error)
    return []
  }
  return data as Course[]
}

const mockCourseContent: Record<string, CourseContent> = {
  'mindfulness-para-maes': {
    modules: [
      {
        id: 'm1',
        title: 'Módulo 1: Introdução ao Mindfulness',
        lessons: [
          {
            id: 'l1-1',
            title: 'O que é Mindfulness e por que é para você?',
            type: 'text',
            content:
              'Mindfulness, ou atenção plena, é a prática de estar presente no momento, de forma intencional e sem julgamento. Para mães, que vivem em um turbilhão de tarefas e emoções, essa prática pode ser uma âncora. Não se trata de esvaziar a mente, mas de observar seus pensamentos e sentimentos sem se deixar levar por eles. É um convite para respirar em meio ao caos.',
            durationMinutes: 5,
          },
          {
            id: 'l1-2',
            title: 'Vídeo: A Respiração como Âncora',
            type: 'video',
            videoUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
            durationMinutes: 10,
          },
          {
            id: 'l1-3',
            title: 'Seu Guia de Prática',
            type: 'download',
            content:
              'Baixe nosso guia em PDF com exercícios simples de respiração para começar a praticar hoje mesmo.',
            downloadUrl: '#',
            durationMinutes: 2,
          },
        ],
      },
      {
        id: 'm2',
        title: 'Módulo 2: Práticas no Dia a Dia',
        lessons: [
          {
            id: 'l2-1',
            title: 'Mindful Eating: Comendo com Atenção Plena',
            type: 'text',
            content:
              'Transforme a hora da refeição em um momento de paz. Sinta a textura, o cheiro e o sabor de cada alimento. Mesmo que por apenas 5 minutos, essa prática pode reduzir a ansiedade e melhorar sua relação com a comida.',
            durationMinutes: 7,
          },
          {
            id: 'l2-2',
            title: 'Mindful Walking: Caminhando com Presença',
            type: 'text',
            content:
              'Ao caminhar, preste atenção em cada passo, no contato dos seus pés com o chão, no movimento do seu corpo. Isso pode ser feito levando o lixo para fora ou buscando as crianças na escola.',
            durationMinutes: 8,
          },
        ],
      },
    ],
  },
  'comunicacao-nao-violenta': {
    modules: [
      {
        id: 'm1-cnv',
        title: 'Módulo 1: Os 4 Componentes da CNV',
        lessons: [
          {
            id: 'l1-1-cnv',
            title: 'Observação, Sentimento, Necessidade e Pedido',
            type: 'text',
            content:
              'A Comunicação Não-Violenta (CNV) se baseia em 4 pilares: 1. **Observação** sem julgamento. 2. Identificação e expressão de **Sentimentos**. 3. Reconhecimento das **Necessidades** por trás dos sentimentos. 4. Formulação de um **Pedido** claro e positivo.',
            durationMinutes: 10,
          },
        ],
      },
    ],
  },
  'jornada-do-autocuidado': {
    modules: [
      {
        id: 'm1-auto',
        title: 'Módulo 1: O que é Autocuidado de Verdade?',
        lessons: [
          {
            id: 'l1-1-auto',
            title: 'Além da máscara facial',
            type: 'text',
            content:
              'Autocuidado não é apenas sobre rituais de beleza. É sobre colocar limites, dizer não, descansar sem culpa e nutrir seu corpo e sua mente. Vamos explorar o que o autocuidado significa para VOCÊ.',
            durationMinutes: 8,
          },
        ],
      },
    ],
  },
}

export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(`Error fetching course with slug ${slug}:`, error)
    return null
  }

  return data as Course | null
}

export const getCourseContent = async (
  contentUrl: string,
): Promise<CourseContent | null> => {
  const slug = contentUrl.split('/').pop()?.replace('.json', '')
  if (slug && mockCourseContent[slug]) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockCourseContent[slug]
  }
  return null
}
