begin;


-- Create a table for public profiles
set schema 'public';
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema public;
-- create table if not exists profiles
-- (
--     id         uuid references auth.users on delete cascade not null primary key,
--     updated_at timestamp with time zone,
--     username   text unique,
--     full_name  text,
--     avatar_url text,
--     about_us   text,

--     constraint username_length check (char_length(username) >= 3)
-- );
CREATE TABLE profiles
(
    id         UUID PRIMARY KEY         NOT NULL UNIQUE,
    username   TEXT,
    first_name TEXT,
    last_name  TEXT,
    user_role  TEXT                     NOT NULL DEFAULT '1204',
    created_on TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_by UUID,
    updated_on TIMESTAMP WITH TIME ZONE
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
create or replace function public.handle_new_user()
    returns trigger
    language plpgsql
    security definer
AS
$function$
begin
    insert into public.profiles (id, full_name, avatar_url)
    values (new.id, new.raw_user_meta_data ->> 'username', new.raw_user_meta_data ->> 'avatar_url');
    return new;
end;
$function$
;


alter table profiles
    enable row level security;

-- create trigger on_auth_user_created
--     after insert
--     on auth.users
--     for each row
-- execute function handle_new_user();

create policy "Public profiles are viewable by everyone."
    on "public"."profiles"
    as permissive
    for select
    to public
    using (true);


create policy "Users can insert their own profile."
    on "public"."profiles"
    as permissive
    for insert
    to public
    with check ((auth.uid() = id));


create policy "Users can update own profile."
    on "public"."profiles"
    as permissive
    for update
    to public
    using ((auth.uid() = id));

end;