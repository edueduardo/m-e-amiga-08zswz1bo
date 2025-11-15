-- 1. Expanded Growth Garden: Add columns to store element type and customization.
ALTER TABLE public.growth_garden_elements ADD COLUMN IF NOT EXISTS element_type TEXT DEFAULT 'flower';
ALTER TABLE public.growth_garden_elements ADD COLUMN IF NOT EXISTS customization_options JSONB;

-- 2. Advanced Challenges: Add columns to support user-created challenges.
ALTER TABLE public.challenges ADD COLUMN IF NOT EXISTS creator_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;
ALTER TABLE public.challenges ADD COLUMN IF NOT EXISTS visibility_status TEXT DEFAULT 'private';

-- 3. Enriched Music and Meditations: Create a new table for music tracks.
CREATE TABLE IF NOT EXISTS public.music_tracks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    artist text,
    audio_url text NOT NULL,
    category text,
    is_user_uploaded boolean DEFAULT false,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.music_tracks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own music tracks" ON public.music_tracks FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view non-personal tracks" ON public.music_tracks FOR SELECT USING (is_user_uploaded = false);

-- 4. Deeper Self-Knowledge: Enhance insights and add reflection exercises.
ALTER TABLE public.pattern_insights ADD COLUMN IF NOT EXISTS analysis_data JSONB;
CREATE TABLE IF NOT EXISTS public.reflection_exercises (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    content text NOT NULL,
    insight_id uuid REFERENCES public.pattern_insights(id) ON DELETE SET NULL,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status text DEFAULT 'pending',
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.reflection_exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own reflection exercises" ON public.reflection_exercises FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 5. Real-time Support Circle: Create tables for real-time chat.
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id uuid NOT NULL REFERENCES public.support_rooms(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all chat messages" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Users can insert their own chat messages" ON public.chat_messages FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.private_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    read_status boolean DEFAULT false,
    privacy_settings jsonb
);
ALTER TABLE public.private_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own private messages" ON public.private_messages FOR ALL USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- 6. Enhanced Ho'oponopono Journal: Add support for media attachments.
ALTER TABLE public.journal_entries ADD COLUMN IF NOT EXISTS media_attachments JSONB;
