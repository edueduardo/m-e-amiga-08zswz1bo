-- Drop the existing policy on virtual_man_interactions to replace it with role-based policies
DROP POLICY "Users can manage their own virtual man interactions" ON public.virtual_man_interactions;

-- Create a new policy for regular users to manage their own interactions
CREATE POLICY "Users can manage their own virtual man interactions"
ON public.virtual_man_interactions
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create a new policy for superusers to have full access to all interactions
CREATE POLICY "Superusers have full access to virtual man interactions"
ON public.virtual_man_interactions
FOR ALL
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'superuser');
