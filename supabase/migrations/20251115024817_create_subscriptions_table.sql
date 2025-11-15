-- Create subscription status enum
CREATE TYPE public.subscription_status AS ENUM ('active', 'inactive', 'trialing', 'past_due');

-- Create user_subscriptions table
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    status public.subscription_status NOT NULL DEFAULT 'inactive',
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for user_subscriptions
CREATE POLICY "Users can view their own subscription"
ON public.user_subscriptions
FOR SELECT
USING (auth.uid() = user_id);

-- Function to create a subscription entry for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_subscriptions (user_id, status)
  VALUES (NEW.id, 'inactive');
  RETURN NEW;
END;
$$;

-- Trigger to call the function when a new user is created
CREATE TRIGGER on_auth_user_created_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_subscription();

-- Trigger to update 'updated_at' timestamp
CREATE TRIGGER set_subscription_timestamp
BEFORE UPDATE ON public.user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();
