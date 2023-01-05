
-- Create a table for public profiles
CREATE TABLE profiles (
  id uuid REFERENCES auth.users NOT NULL PRIMARY KEY,
  first_name text,
  last_name text,
  age int,
  gender text,
  username text UNIQUE,
  primary_address_street text,
  primary_address_zip text,
  primary_address_city text,
  primary_address_country text,
  updated_at timestamp with time zone,
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT
    USING (TRUE);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT
    WITH CHECK (auth.uid () = id);

CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE
    USING (auth.uid () = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
CREATE FUNCTION public.handle_new_user ()
  RETURNS TRIGGER
  AS $$
BEGIN
  INSERT INTO public.profiles (id)
    VALUES (NEW.id);
  RETURN new;
END;
$$
LANGUAGE plpgsql
SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user ();



-- SELECT CURRENT_USER;
-- select u.usename,
--        (select string_agg(d.datname, ',' order by d.datname) 
--         from pg_database d 
--         where has_database_privilege(u.usename, d.datname, 'CONNECT')) as allowed_databases
-- from pg_user u
-- order by u.usename;