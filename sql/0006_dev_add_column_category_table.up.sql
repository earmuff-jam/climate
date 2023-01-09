
BEGIN;

SET ROLE = 'supabase_admin';
SET SEARCH_PATH = 'postgres';
SET SCHEMA 'public';

-- adds a default status of false for containing sharable items
ALTER TABLE category ADD COLUMN contains_sharable_items BOOLEAN DEFAULT false;

END;