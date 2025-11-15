CREATE TABLE IF NOT EXISTS public.cbt_progress (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_slug text NOT NULL,
    lesson_id text NOT NULL,
    completed_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT unique_user_lesson UNIQUE (user_id, course_slug, lesson_id)
);

ALTER TABLE public.cbt_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own progress"
ON public.cbt_progress
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$ LANGUAGE plpgsql;

CREATE TRIGGER set_cbt_progress_timestamp
BEFORE UPDATE ON public.cbt_progress
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

