import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface ChallengeRecord {
  id: string
  title: string
  community_challenge: boolean
}

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE'
  table: string
  record: ChallengeRecord | any // Use a more specific type for other tables
  old_record: ChallengeRecord | any | null
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function createNotificationForAllUsers(message: string, type: string) {
  // In a real-world scenario, you might want to select specific users
  // For now, we'll create a placeholder notification for a generic user ID
  // This is because we don't have a `users` table to query from within the function easily
  const { error } = await supabaseAdmin.from('scheduled_notifications').insert({
    user_id: '00000000-0000-0000-0000-000000000000', // Placeholder user ID
    notification_type: type,
    message: message,
    scheduled_at: new Date().toISOString(),
  })

  if (error) {
    console.error(
      `Error creating notification for type ${type}:`,
      error.message,
    )
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload: WebhookPayload = await req.json()

    // Example: A new challenge is created
    if (payload.table === 'challenges' && payload.type === 'INSERT') {
      const challenge = payload.record as ChallengeRecord
      const message = `Novo desafio disponível: ${challenge.title}`
      await createNotificationForAllUsers(message, 'new_challenge')
    }

    // Example: A new message in a support circle (hypothetical table 'community_messages')
    if (payload.table === 'community_messages' && payload.type === 'INSERT') {
      const messageRecord = payload.record
      // Logic to find users in that specific room and create notifications
      const message = `Nova mensagem no círculo de apoio.`
      // This would require more complex logic to target specific users
      await createNotificationForAllUsers(message, 'circle_message')
    }

    // You can add more triggers here, e.g., for app updates
    // if (payload.type === 'APP_UPDATE_TRIGGER') {
    //   const message = "Atualizamos o app com novas funcionalidades para você!";
    //   await createNotificationForAllUsers(message, 'app_update');
    // }

    return new Response(
      JSON.stringify({ message: 'Notifications processed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
