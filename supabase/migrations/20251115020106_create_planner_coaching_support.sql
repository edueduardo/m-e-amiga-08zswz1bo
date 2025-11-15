-- Create planner_tasks table
CREATE TYPE public.planner_task_status AS ENUM ('todo', 'in-progress', 'done');
CREATE TABLE IF NOT EXISTS public.planner_tasks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content text NOT NULL,
    status public.planner_task_status DEFAULT 'todo' NOT NULL,
    due_date timestamp with time zone
);
ALTER TABLE public.planner_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own planner tasks" ON public.planner_tasks FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create coaching_sessions table
CREATE TYPE public.coaching_session_status AS ENUM ('active', 'completed', 'paused');
CREATE TABLE IF NOT EXISTS public.coaching_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title text NOT NULL,
    status public.coaching_session_status DEFAULT 'active' NOT NULL,
    started_at timestamp with time zone NOT NULL,
    messages jsonb NOT NULL DEFAULT '[]'::jsonb
);
ALTER TABLE public.coaching_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own coaching sessions" ON public.coaching_sessions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create support_rooms table
CREATE TABLE IF NOT EXISTS public.support_rooms (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    description text NOT NULL,
    icon_name text NOT NULL
);
ALTER TABLE public.support_rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Support rooms are publicly viewable" ON public.support_rooms FOR SELECT USING (true);
-- Seed support rooms
INSERT INTO public.support_rooms (name, description, icon_name) VALUES
('Maternidade', 'Para os desafios e alegrias da jornada de ser mãe.', 'Baby'),
('Relacionamentos', 'Um espaço para falar sobre a vida a dois, ou a sós.', 'HeartCrack'),
('Carreira e Propósito', 'Equilibrando pratinhos: vida profissional e pessoal.', 'Briefcase'),
('Autoconhecimento', 'Jornadas de redescoberta e crescimento pessoal.', 'User'),
('Autocuidado e Bem-estar', 'Dicas, práticas e apoio para cuidar de si mesma.', 'Heart')
ON CONFLICT (name) DO NOTHING;


-- Create support_posts table
CREATE TABLE IF NOT EXISTS public.support_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id uuid NOT NULL REFERENCES public.support_rooms(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    author_alias text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.support_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all posts" ON public.support_posts FOR SELECT USING (true);
CREATE POLICY "Users can manage their own posts" ON public.support_posts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);


-- Create support_replies table
CREATE TABLE IF NOT EXISTS public.support_replies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid NOT NULL REFERENCES public.support_posts(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    author_alias text NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.support_replies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all replies" ON public.support_replies FOR SELECT USING (true);
CREATE POLICY "Users can manage their own replies" ON public.support_replies FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

