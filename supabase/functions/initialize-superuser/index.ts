import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// IMPORTANT: This function is destructive and should only be run once for initialization.
// It deletes all existing users and creates a single superuser.
// Ensure you have the correct environment variables set in your Supabase project.

const SUPERUSER_EMAIL = 'etailoffice@gmail.com'
const SUPERUSER_PASSWORD = 'Edu@rd@1972'

Deno.serve(async (req) => {
  // This is a one-time administrative script.
  // It should be invoked securely (e.g., via Supabase CLI, dashboard, or a protected webhook).
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // 1. List all existing users
    const {
      data: { users },
      error: listError,
    } = await supabaseAdmin.auth.admin.listUsers()
    if (listError) throw listError

    // 2. Delete all existing users
    if (users.length > 0) {
      const deletePromises = users.map((user) =>
        supabaseAdmin.auth.admin.deleteUser(user.id),
      )
      await Promise.all(deletePromises)
      console.log(`Deleted ${users.length} user(s).`)
    } else {
      console.log('No existing users to delete.')
    }

    // 3. Create the new superuser
    const {
      data: { user: newSuperuser },
      error: createError,
    } = await supabaseAdmin.auth.admin.createUser({
      email: SUPERUSER_EMAIL,
      password: SUPERUSER_PASSWORD,
      email_confirm: true, // Auto-confirm email for the superuser
      user_metadata: { full_name: 'Super Admin' },
    })
    if (createError) throw createError
    if (!newSuperuser) throw new Error('Superuser creation failed.')
    console.log(`Created superuser with email: ${SUPERUSER_EMAIL}`)

    // The `handle_new_user` trigger will automatically create a profile.
    // We wait briefly to ensure the trigger has fired before we update the profile.
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 4. Update the new user's profile to set the role to 'superuser'
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ role: 'superuser' })
      .eq('id', newSuperuser.id)

    if (updateError) {
      console.error(
        `Failed to update role for superuser: ${updateError.message}`,
      )
      return new Response(
        JSON.stringify({
          message: `Superuser created, but failed to set role. Please set it manually. Error: ${updateError.message}`,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 207, // Multi-Status
        },
      )
    }
    console.log(`Successfully set role for superuser.`)

    return new Response(
      JSON.stringify({
        message:
          'Initialization complete. All users deleted and superuser created.',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Initialization error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
