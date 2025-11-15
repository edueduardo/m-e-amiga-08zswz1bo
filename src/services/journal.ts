import { supabase } from '@/lib/supabase/client'
import { HooponoponoJournalEntry } from '@/types'

export const getJournalEntries = async (
  userId: string,
): Promise<HooponoponoJournalEntry[]> => {
  if (!userId) return []
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching journal entries:', error)
    return []
  }
  return data as HooponoponoJournalEntry[]
}

export const addJournalEntry = async (
  userId: string,
  entry: Omit<HooponoponoJournalEntry, 'id' | 'date'>,
): Promise<HooponoponoJournalEntry | null> => {
  const { data, error } = await supabase
    .from('journal_entries')
    .insert({ ...entry, user_id: userId, date: new Date().toISOString() })
    .select()
    .single()

  if (error) {
    console.error('Error adding journal entry:', error)
    return null
  }
  return data as HooponoponoJournalEntry
}
