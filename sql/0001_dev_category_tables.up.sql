BEGIN;

SET ROLE = 'supabase_admin';
SET SEARCH_PATH = 'postgres';
SET SCHEMA 'public';

DROP TYPE IF EXISTS type_category_enum CASCADE;
CREATE TYPE type_category_enum AS ENUM ('BUSINESS', 'PERSONAL');

DROP TABLE IF EXISTS category;
CREATE TABLE category
(
    id                   SERIAL PRIMARY KEY       NOT NULL,
    category_type        type_category_enum       NOT NULL DEFAULT 'PERSONAL',
    category_name        TEXT UNIQUE              NOT NULL,
    category_description TEXT,
    created_on           TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_by           TEXT                     NOT NULL,
    sharable_groups      UUID[]
);

ALTER TABLE category
    ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authorized users can only manipulate categories" ON category FOR ALL USING (auth.uid() = ANY (category.sharable_groups));

END;
