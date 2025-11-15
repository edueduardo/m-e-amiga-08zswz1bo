CREATE OR REPLACE FUNCTION public.handle_lesson_completion()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  user_id_to_check uuid;
BEGIN
  user_id_to_check := NEW.user_id;

  -- Asynchronously invoke the edge function.
  -- The edge function will handle the logic of checking if all courses are complete.
  -- NOTE: In a production environment, the service role key should be managed as a secret.
  -- This follows the pattern established in other migrations for this project.
  PERFORM net.http_post(
    url:='https://ywykirladrwpypyibofu.supabase.co/functions/v1/generate-all-courses-certificate',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer SERVICE_ROLE_KEY_PLACEHOLDER"}'::jsonb,
    body:=jsonb_build_object('user_id', user_id_to_check)
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_lesson_completed ON public.cbt_progress;

CREATE TRIGGER on_lesson_completed
  AFTER INSERT ON public.cbt_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_lesson_completion();
