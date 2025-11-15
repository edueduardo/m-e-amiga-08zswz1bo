-- Create team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    role text NOT NULL,
    qualifications text,
    bio text,
    photo_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Add sample team members (only if table is empty)
DO $$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM public.team_members LIMIT 1) THEN
      INSERT INTO public.team_members (name, role, qualifications, bio, photo_url) VALUES
      ('Dra. Sofia Almeida', 'Psicóloga Chefe', 'PhD em Psicologia Clínica, Especialista em Terapia Cognitivo-Comportamental', 'Dra. Sofia é a mente por trás da abordagem empática da Mãe Amiga, garantindo que todas as interações sejam baseadas em princípios psicológicos sólidos e acolhedores.', 'https://img.usecurling.com/ppl/medium?gender=female&seed=10'),
      ('Pedro Costa', 'Engenheiro de IA', 'Mestre em Inteligência Artificial, Especialista em Processamento de Linguagem Natural', 'Pedro lidera a equipe técnica que dá vida à Mãe Amiga, focando em criar uma IA que não apenas entende palavras, mas também sentimentos.', 'https://img.usecurling.com/ppl/medium?gender=male&seed=11'),
      ('Mariana Lima', 'Especialista em Experiência do Usuário', 'Designer de Interação com foco em Saúde Mental', 'Mariana se dedica a tornar a plataforma um espaço seguro, intuitivo e verdadeiramente acolhedor para todas as mulheres.', 'https://img.usecurling.com/ppl/medium?gender=female&seed=12');
   END IF;
END $$;

-- Add relationship_status to user_preferences table
ALTER TABLE public.user_preferences
ADD COLUMN IF NOT EXISTS relationship_status text;

-- Add notification_preferences to user_preferences table
ALTER TABLE public.user_preferences
ADD COLUMN IF NOT EXISTS notification_preferences jsonb DEFAULT '{"new_challenges": true, "circle_messages": true, "app_updates": true}'::jsonb;

-- Add preferred_interaction_times to user_preferences table
ALTER TABLE public.user_preferences
ADD COLUMN IF NOT EXISTS preferred_interaction_times jsonb DEFAULT '{"morning": true, "afternoon": true, "evening": true}'::jsonb;

-- Create custom_reminders table
CREATE TABLE IF NOT EXISTS public.custom_reminders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    message text NOT NULL,
    cron_schedule text NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES auth.users(id)
        ON DELETE CASCADE
);

-- Enable RLS for custom_reminders
ALTER TABLE public.custom_reminders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for custom_reminders
DROP POLICY IF EXISTS "Users can manage their own reminders" ON public.custom_reminders;
CREATE POLICY "Users can manage their own reminders"
ON public.custom_reminders
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
