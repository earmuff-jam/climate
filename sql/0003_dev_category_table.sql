-- CATEGORY TABLE GOES HERE

BEGIN;
SET ROLE = 'postgres';
SET SEARCH_PATH = 'climate';
SET ROLE = 'climate_admin';
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
    created_by           TEXT                     NOT NULL DEFAULT CURRENT_USER
);

-- TO LET climate_user do the CRUD
-- GRANT SELECT, INSERT, UPDATE, DELETE ON category TO climate_user;

END;
