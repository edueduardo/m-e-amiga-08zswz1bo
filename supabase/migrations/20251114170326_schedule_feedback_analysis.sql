-- This migration schedules the 'analyze-virtual-man-feedback' edge function to run weekly.
-- It uses pg_cron, a standard Supabase extension.
-- The schedule is set for every Sunday at midnight UTC ('0 0 * * 0').

-- IMPORTANT: The Authorization header bearer token below is a placeholder.
-- In a real Supabase project, you would replace 'SERVICE_ROLE_KEY_PLACEHOLDER'
-- with the actual service_role_key, preferably sourced from a secure vault or environment variable
-- that the cron job execution environment has access to.

SELECT cron.schedule(
  'weekly-feedback-analysis',
  '0 0 * * 0',
  $$
    SELECT net.http_post(
      url:='https://ywykirladrwpypyibofu.supabase.co/functions/v1/analyze-virtual-man-feedback',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer SERVICE_ROLE_KEY_PLACEHOLDER"}'::jsonb,
      body:='{}'::jsonb
    )
  $$
);
