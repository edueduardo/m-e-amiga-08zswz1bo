-- Create gamification_profiles table
CREATE TABLE IF NOT EXISTS public.gamification_profiles (
    user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    points integer NOT NULL DEFAULT 0,
    level integer NOT NULL DEFAULT 1,
    unlocked_badges text[] NOT NULL DEFAULT '{}'
);
ALTER TABLE public.gamification_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own gamification profile" ON public.gamification_profiles FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Function to create a gamification profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user_gamification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.gamification_profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

-- Trigger to call the function when a new user is created
DROP TRIGGER IF EXISTS on_auth_user_created_gamification ON auth.users;
CREATE TRIGGER on_auth_user_created_gamification
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_gamification();


-- Create growth_garden_goals table
CREATE TYPE public.garden_related_feature AS ENUM ('journal', 'challenge', 'course');
CREATE TABLE IF NOT EXISTS public.growth_garden_goals (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title text NOT NULL,
    related_feature public.garden_related_feature NOT NULL,
    target_count integer NOT NULL,
    current_count integer NOT NULL DEFAULT 0
);
ALTER TABLE public.growth_garden_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own garden goals" ON public.growth_garden_goals FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create growth_garden_elements table
CREATE TYPE public.garden_element_status AS ENUM ('seed', 'seedling', 'flower');
CREATE TABLE IF NOT EXISTS public.growth_garden_elements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    goal_id uuid NOT NULL REFERENCES public.growth_garden_goals(id) ON DELETE CASCADE,
    status public.garden_element_status NOT NULL DEFAULT 'seed',
    position jsonb NOT NULL
);
ALTER TABLE public.growth_garden_elements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own garden elements" ON public.growth_garden_elements FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create self_care_history table
CREATE TABLE IF NOT EXISTS public.self_care_history (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date timestamp with time zone NOT NULL,
    answers jsonb NOT NULL,
    plan jsonb NOT NULL
);
ALTER TABLE public.self_care_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own self care history" ON public.self_care_history FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
