BEGIN;
SET ROLE = 'supabase_admin';
SET SCHEMA 'public';

DROP TYPE IF EXISTS type_subscribed_items_enum CASCADE;
CREATE TYPE type_subscribed_items_enum AS ENUM ('NEWSLETTER', 'FEATURES', 'UPDATES');

DROP TABLE IF EXISTS subscriber;
CREATE TABLE subscriber
(
    id  SERIAL PRIMARY KEY NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email_address TEXT UNIQUE NOT NULL,
    created_by UUID NOT NULL UNIQUE,
    subscribed_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    subscribed_items type_subscribed_items_enum[] DEFAULT '{NEWSLETTER, FEATURES, UPDATES}'
);

ALTER TABLE subscriber
    ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only users who subscribed can unsubscribe" ON subscriber FOR 
ALL USING (
    auth.uid() = created_by
);

END;