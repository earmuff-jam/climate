

--- 0004 - load user settings --- 
--- Description: load user settings for a logged in user --- 

BEGIN;

DROP TABLE IF EXISTS user_settings CASCADE ;
CREATE TABLE user_settings
(
    id                          uuid references auth.users ON DELETE CASCADE ON UPDATE CASCADE NOT NULL PRIMARY KEY,
    notify_bookmarked_items     BOOLEAN,
    notify_due_items            BOOLEAN,
    notify_settings_privacy     BOOLEAN,
    display_mode                BOOLEAN,
    created_on                  TIMESTAMP WITH TIME ZONE                                       NOT NULL,
    updated_by                  UUID,
    updated_on                  TIMESTAMP WITH TIME ZONE
);

END;

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can view their profile settings" ON user_settings FOR SELECT USING (true);
CREATE POLICY "users can insert new values to their profile settings" ON user_settings FOR INSERT WITH CHECK(auth.uid() = id);
CREATE POLICY "users can update their own profile settings" ON user_settings FOR UPDATE USING(auth.uid() = id);
