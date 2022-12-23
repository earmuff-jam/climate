-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  first_name text,
  last_name text,
  age int,
  gender text,
  username text unique,
  primary_address_street text,
  primary_address_zip text,
  primary_address_city text,
  primary_address_country text,
  updated_at timestamp with time zone,
  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table
  profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles for
select
  using (true);

create policy "Users can insert their own profile." on profiles for
insert
  with check (auth.uid() = id);

create policy "Users can update own profile." on profiles for
update
  using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user() returns trigger as $$ begin
insert into
  public.profiles (id)
values
  (
    new.id
  );

return new;

end;

$$ language plpgsql security definer;

create trigger on_auth_user_created
after
insert
  on auth.users for each row execute procedure public.handle_new_user();