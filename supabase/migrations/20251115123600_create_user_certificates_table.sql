CREATE TABLE IF NOT EXISTS public.user_certificates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    certificate_url text NOT NULL,
    completion_date timestamp with time zone DEFAULT now() NOT NULL,
    unique_certificate_id text NOT NULL UNIQUE,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    certificate_type text NOT NULL
);

ALTER TABLE public.user_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own certificates"
ON public.user_certificates
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Allow service_role to insert certificates"
ON public.user_certificates
FOR INSERT
WITH CHECK (true);

