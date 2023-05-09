BEGIN;
-- CREATE SCHEMA PUBLIC --
DROP SCHEMA IF EXISTS public;
CREATE SCHEMA IF NOT EXISTS public;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public;

-- CREATE A TABLE PROFILES --
-- 9043 :: ADMIN,  7543 :: PROPERTY_OWNER, 1204 :: TENANT
DROP TYPE IF EXISTS df_role_value CASCADE;
CREATE TYPE df_role_value AS ENUM ('9043', '7543', '1204');

DROP TABLE IF EXISTS public.profiles;
CREATE TABLE public.profiles
(
    id         UUID PRIMARY KEY         NOT NULL REFERENCES auth.users (id) ON UPDATE CASCADE ON DELETE CASCADE,
    username   TEXT UNIQUE,
    first_name TEXT,
    last_name  TEXT,
    user_role  TEXT                     NOT NULL DEFAULT '1204',
    created_on TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_by UUID,
    updated_on TIMESTAMP WITH TIME ZONE
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table public.profiles
    enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
    for select using (true);

create policy "Users can insert their own profile." on public.profiles
    for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
    for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.

-- TRIGGERS AND FUNCTIONS --

CREATE FUNCTION public.handle_new_user() RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO public.profiles(id, created_on)
    VALUES (new.id, now());
    RETURN NEW;
END;

$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT
    ON auth.users
    FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();
END;
