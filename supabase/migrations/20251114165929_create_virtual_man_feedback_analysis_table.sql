CREATE TABLE public.virtual_man_feedback_analysis (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_date timestamp with time zone DEFAULT now() NOT NULL,
    positive_feedback_count integer NOT NULL DEFAULT 0,
    negative_feedback_count integer NOT NULL DEFAULT 0,
    common_positive_keywords jsonb,
    common_negative_keywords jsonb,
    improvement_suggestions text
);

ALTER TABLE public.virtual_man_feedback_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access"
ON public.virtual_man_feedback_analysis
FOR SELECT
USING (true);

