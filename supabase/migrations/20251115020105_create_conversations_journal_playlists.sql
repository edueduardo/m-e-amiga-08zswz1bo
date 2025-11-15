-- Create conversations table
CREATE TABLE IF NOT EXISTS public.conversations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    transcript text NOT NULL,
    mood_label text NOT NULL,
    mother_reply text NOT NULL,
    audio_url text,
    feedback jsonb,
    professional_help_suggestion text
);
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own conversations" ON public.conversations FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create journal_entries table
CREATE TABLE IF NOT EXISTS public.journal_entries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date timestamp with time zone NOT NULL,
    prompt text NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own journal entries" ON public.journal_entries FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create playlists table
CREATE TABLE IF NOT EXISTS public.playlists (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    track_ids text[] NOT NULL DEFAULT '{}',
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own playlists" ON public.playlists FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

