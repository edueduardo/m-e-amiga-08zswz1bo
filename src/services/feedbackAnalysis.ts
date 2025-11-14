import { supabase } from '@/lib/supabase/client'

export const runFeedbackAnalysis = async () => {
  const { data, error } = await supabase.functions.invoke(
    'analyze-virtual-man-feedback',
    {
      method: 'POST',
    },
  )

  if (error) {
    console.error('Error running feedback analysis:', error)
    return { success: false, error }
  }

  return { success: true, data }
}
