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

export const getFeedbackAnalysisResults = async () => {
  const { data, error } = await supabase
    .from('virtual_man_feedback_analysis')
    .select('*')
    .order('analysis_date', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error('Error fetching feedback analysis results:', error)
    return null
  }

  return data
}


