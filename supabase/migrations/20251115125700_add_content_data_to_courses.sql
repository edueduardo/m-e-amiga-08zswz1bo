ALTER TABLE public.courses
ADD COLUMN IF NOT EXISTS content_data JSONB;
