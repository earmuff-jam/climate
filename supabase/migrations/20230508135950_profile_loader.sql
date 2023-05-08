BEGIN;
SET SCHEMA 'public';
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public;

-- PROFILES TABLES --
DROP -- DROP ROLES ENUM USED --
    TYPE IF EXISTS df_role_value CASCADE;
CREATE -- 9043 :: ADMIN,  7543 :: PROPERTY_OWNER, 1204 :: TENANT
    TYPE df_role_value AS ENUM ('9043', '7543', '1204');

DROP TABLE IF EXISTS profiles;
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

END;