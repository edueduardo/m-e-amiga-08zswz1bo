-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    content_url text,
    category text,
    created_at timestamp with time zone DEFAULT now()
);

-- Create challenges table
CREATE TABLE IF NOT EXISTS public.challenges (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    duration_days integer,
    start_date date,
    end_date date,
    category text,
    community_challenge boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);

-- Update user_preferences table
ALTER TABLE public.user_preferences
ADD COLUMN IF NOT EXISTS home_page_layout jsonb;

-- Update scheduled_notifications table
ALTER TABLE public.scheduled_notifications
ADD COLUMN IF NOT EXISTS is_read boolean DEFAULT false;

ALTER TABLE public.scheduled_notifications
ADD COLUMN IF NOT EXISTS message text;

-- Seed data for courses (only if table is empty)
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM public.courses LIMIT 1) THEN
      INSERT INTO public.courses (title, description, content_url, category) VALUES
      ('Mindfulness para Mães Ocupadas', 'Aprenda técnicas de mindfulness para encontrar calma em meio ao caos da maternidade.', '/app/courses/mindfulness-para-maes', 'mindfulness'),
      ('Comunicação Não-Violenta no Casamento', 'Transforme a comunicação com seu parceiro e fortaleça o relacionamento.', '/app/courses/comunicacao-nao-violenta', 'relationships'),
      ('Jornada do Autocuidado', 'Descubra como priorizar seu bem-estar sem culpa.', '/app/courses/jornada-do-autocuidado', 'self-care');
   END IF;
END $$;

-- Seed data for challenges (only if table is empty)
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM public.challenges LIMIT 1) THEN
      INSERT INTO public.challenges (title, description, duration_days, start_date, end_date, category, community_challenge) VALUES
      ('Semana da Gratidão', 'Anote três coisas pelas quais você é grata todos os dias.', 7, CURRENT_DATE, CURRENT_DATE + 7, 'wellness', false),
      ('Desafio do Detox Digital', 'Reduza o tempo de tela em 30 minutos por dia e reconecte-se consigo mesma.', 5, CURRENT_DATE, CURRENT_DATE + 5, 'mindset', false),
      ('Maratona de Cuidado Coletivo', 'Vamos juntas completar 100 atos de autocuidado esta semana!', 7, CURRENT_DATE, CURRENT_DATE + 7, 'wellness', true);
   END IF;
END $$;
