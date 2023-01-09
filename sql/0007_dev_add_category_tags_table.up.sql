BEGIN;
SET ROLE = 'supabase_admin';
SET SCHEMA 'public';

DROP TYPE IF EXISTS type_subscribed_items_enum CASCADE;
CREATE TYPE type_subscribed_items_enum AS ENUM ('NEWSLETTER', 'FEATURES', 'UPDATES');

DROP TABLE IF EXISTS category_tag;
CREATE TABLE category_tag
(
    id              SERIAL PRIMARY KEY       NOT NULL,
    tag_name        TEXT                     NOT NULL,
    tag_description TEXT,
    created_by      UUID                     NOT NULL UNIQUE,
    created_on      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    sharable_groups UUID[],
    category_id     BIGINT REFERENCES category (id)
);

ALTER TABLE category_tag
    ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only users who created category can edit category tags" ON category_tag
    USING (
    auth.uid() = category_tag.created_by
    );
CREATE POLICY "Only users within the groups can view the category tags" ON category_tag FOR
    SELECT USING (
    auth.uid() = ANY (category_tag.sharable_groups)
    );

END;