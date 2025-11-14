ALTER TABLE public.profiles
ADD COLUMN role TEXT NOT NULL DEFAULT 'user';
