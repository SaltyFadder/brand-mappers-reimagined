-- Function to get user ID by email (for admin management)
CREATE OR REPLACE FUNCTION public.get_user_by_email(email_input TEXT)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM auth.users WHERE email = email_input LIMIT 1
$$;

-- Grant execute to authenticated users (admins will use this)
GRANT EXECUTE ON FUNCTION public.get_user_by_email(TEXT) TO authenticated;