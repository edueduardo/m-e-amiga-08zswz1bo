import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

interface Course {
  id: string
  content_url: string
}

interface CourseContent {
  modules: { lessons: { id: string }[] }[]
}

const generateCertificateSVG = (
  userName: string,
  completionDate: string,
  uniqueId: string,
): string => {
  return `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fff8f9"/>
      <rect x="20" y="20" width="760" height="560" fill="none" stroke="#e11d48" stroke-width="10"/>
      <text x="50%" y="120" font-family="serif" font-size="40" text-anchor="middle" fill="#333">Certificado de Conclusão</text>
      <text x="50%" y="180" font-family="sans-serif" font-size="20" text-anchor="middle" fill="#555">Este certificado é concedido a</text>
      <text x="50%" y="250" font-family="serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#e11d48">${userName}</text>
      <text x="50%" y="320" font-family="sans-serif" font-size="20" text-anchor="middle" fill="#555">por ter concluído com sucesso todos os cursos disponíveis na plataforma</text>
      <text x="50%" y="380" font-family="serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#333">Mãe Amiga</text>
      <text x="50%" y="450" font-family="sans-serif" font-size="16" text-anchor="middle" fill="#555">Concluído em: ${completionDate}</text>
      <text x="50%" y="550" font-family="monospace" font-size="12" text-anchor="middle" fill="#777">ID: ${uniqueId}</text>
    </svg>
  `
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { user_id } = await req.json()
    if (!user_id) throw new Error('user_id is required')

    // 1. Check if certificate already exists
    const { data: existingCert, error: certCheckError } = await supabaseAdmin
      .from('user_certificates')
      .select('id')
      .eq('user_id', user_id)
      .eq('certificate_type', 'all_courses_completion')
      .maybeSingle()

    if (certCheckError) throw certCheckError
    if (existingCert) {
      return new Response(
        JSON.stringify({ message: 'Certificate already exists.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // 2. Get total number of lessons in the platform
    const { data: courses, error: coursesError } = await supabaseAdmin
      .from('courses')
      .select('id, content_url')
    if (coursesError) throw coursesError

    let totalLessons = 0
    for (const course of courses as Course[]) {
      if (course.content_url) {
        const res = await fetch(course.content_url)
        if (res.ok) {
          const content: CourseContent = await res.json()
          content.modules.forEach((module) => {
            totalLessons += module.lessons.length
          })
        }
      }
    }

    if (totalLessons === 0) {
      return new Response(
        JSON.stringify({ message: 'No lessons found in platform.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // 3. Get user's completed lessons count
    const { count: completedCount, error: countError } = await supabaseAdmin
      .from('cbt_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user_id)

    if (countError) throw countError

    // 4. Compare and proceed if all are completed
    if (completedCount < totalLessons) {
      return new Response(
        JSON.stringify({ message: 'Not all lessons completed.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // 5. Generate certificate
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('full_name')
      .eq('id', user_id)
      .single()
    if (profileError) throw profileError

    const completionDate = new Date()
    const uniqueId = `${user_id.substring(0, 8)}-${completionDate.getTime()}`
    const svgContent = generateCertificateSVG(
      profile.full_name || 'Usuária Dedicada',
      completionDate.toLocaleDateString('pt-BR'),
      uniqueId,
    )

    // 6. Upload to storage
    const filePath = `${user_id}/${uniqueId}.svg`
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('certificates')
      .upload(filePath, svgContent, {
        contentType: 'image/svg+xml',
        upsert: true,
      })

    if (uploadError) throw uploadError

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from('certificates').getPublicUrl(filePath)

    // 7. Insert into user_certificates table
    const { error: insertCertError } = await supabaseAdmin
      .from('user_certificates')
      .insert({
        user_id,
        certificate_url: publicUrl,
        completion_date: completionDate.toISOString(),
        unique_certificate_id: uniqueId,
        certificate_type: 'all_courses_completion',
      })
    if (insertCertError) throw insertCertError

    // 8. Create notification
    const { error: notificationError } = await supabaseAdmin
      .from('scheduled_notifications')
      .insert({
        user_id,
        notification_type: 'generic',
        message:
          'Parabéns! Você concluiu todos os cursos e ganhou um novo certificado.',
        scheduled_at: new Date().toISOString(),
      })
    if (notificationError)
      console.error('Failed to create notification:', notificationError)

    return new Response(
      JSON.stringify({ message: 'Certificate generated successfully.' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
