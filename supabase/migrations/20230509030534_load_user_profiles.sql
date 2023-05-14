-- Create a table for public profiles
-- 9043 :: ADMIN,  7543 :: PROPERTY_OWNER, 1204 :: TENANT
DROP TYPE IF EXISTS df_role_value CASCADE;
CREATE TYPE df_role_value AS ENUM ('9043', '7543', '1204');

create table profiles
(
    id         uuid references auth.users ON DELETE CASCADE ON UPDATE CASCADE NOT NULL PRIMARY KEY,
    username   TEXT UNIQUE,
    first_name TEXT,
    last_name  TEXT,
    user_role  TEXT                                                           NOT NULL DEFAULT '1204',
    created_on TIMESTAMP WITH TIME ZONE                                       NOT NULL,
    updated_by UUID,
    updated_on TIMESTAMP WITH TIME ZONE
);

alter table profiles
    enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
    for select using (true);

create policy "Users can insert their own profile." on profiles
    for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
    for update using (auth.uid() = id);

create function public.handle_new_user()
    returns trigger as
$$
begin
    insert into public.profiles (id, created_on)
    values (new.id, now());
    return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
    after insert
    on auth.users
    for each row
execute procedure public.handle_new_user();