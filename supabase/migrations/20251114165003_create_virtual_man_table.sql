CREATE TABLE public.virtual_man_interactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    profile_selected text NOT NULL,
    user_query text NOT NULL,
    ai_response jsonb NOT NULL,
    feedback_rating text, -- 'helpful' | 'not_helpful'
    feedback_comment text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.virtual_man_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own virtual man interactions"
ON public.virtual_man_interactions
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

