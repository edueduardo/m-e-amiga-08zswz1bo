-- Add a slug column to the courses table for user-friendly URLs
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Populate the slug for existing courses based on their titles
UPDATE public.courses
SET slug = 'mindfulness-para-maes'
WHERE title = 'Mindfulness para Mães Ocupadas';

UPDATE public.courses
SET slug = 'comunicacao-nao-violenta'
WHERE title = 'Comunicação Não-Violenta no Casamento';

UPDATE public.courses
SET slug = 'jornada-do-autocuidado'
WHERE title = 'Jornada do Autocuidado';

-- Update the content_url to point to the structured JSON content in a public Supabase Storage bucket.
-- In a real scenario, these JSON files would be uploaded to the 'course-content' bucket.
UPDATE public.courses
SET content_url = 'https://ywykirladrwpypyibofu.supabase.co/storage/v1/object/public/course-content/mindfulness-para-maes.json'
WHERE slug = 'mindfulness-para-maes';

UPDATE public.courses
SET content_url = 'https://ywykirladrwpypyibofu.supabase.co/storage/v1/object/public/course-content/comunicacao-nao-violenta.json'
WHERE slug = 'comunicacao-nao-violenta';

UPDATE public.courses
SET content_url = 'https://ywykirladrwpypyibofu.supabase.co/storage/v1/object/public/course-content/jornada-do-autocuidado.json'
WHERE slug = 'jornada-do-autocuidado';

