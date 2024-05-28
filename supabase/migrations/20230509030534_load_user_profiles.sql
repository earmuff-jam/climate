
-- 0001 -- load user profile details ---
--- loads the user profile details for any logged in user --- 


BEGIN;

DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a table for public profiles
-- 9043 :: ADMIN,  7543 :: USER, 1204 :: MAINTENANCE
DROP TYPE IF EXISTS df_role_value CASCADE;
CREATE TYPE df_role_value AS ENUM ('9043', '7543', '1204');

DROP TABLE IF EXISTS profiles CASCADE ;
create table profiles
(
    id         uuid references auth.users ON DELETE CASCADE ON UPDATE CASCADE NOT NULL PRIMARY KEY,
    username   TEXT UNIQUE,
    first_name TEXT,
    last_name  TEXT,
    user_role  TEXT                                                           NOT NULL DEFAULT '7543',
    bio        TEXT,
    created_on TIMESTAMP WITH TIME ZONE                                       NOT NULL,
    updated_by UUID,
    updated_on TIMESTAMP WITH TIME ZONE
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY; 

CREATE POLICY "public profiles are visible by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "users can update their own profile details" ON profiles FOR INSERT WITH CHECK(auth.uid() = id);
CREATE POLICY "users can perform updates on their own profile" ON profiles FOR UPDATE USING(auth.uid() = id);


-- trigger to update notifications details
CREATE OR REPLACE FUNCTION public.handle_new_user_settings()
    RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO public.user_settings (id, notify_bookmarked_items, notify_due_items, notify_settings_privacy, display_mode, created_on)
    VALUES (NEW.id, false, false, false, false, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_settings_applied_trigger ON auth.users;
CREATE TRIGGER on_auth_user_settings_applied_trigger
    AFTER INSERT ON auth.users FOR EACH ROW
    EXECUTE PROCEDURE public.handle_new_user_settings();

END;

-- trigger to update the profile settings --
CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS 
$$
BEGIN
    INSERT INTO public.profiles (id, created_on) 
    VALUES (NEW.id, now()); 
    RETURN NEW;
END; 
$$ LANGUAGE plpgsql SECURiTY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_trigger ON auth.users; 
CREATE TRIGGER on_auth_user_created_trigger 
    AFTER INSERT ON auth.users FOR EACH ROW 
    EXECUTE PROCEDURE public.handle_new_user();

END;