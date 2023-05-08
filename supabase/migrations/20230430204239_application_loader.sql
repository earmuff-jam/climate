BEGIN;

DROP EXTENSION IF EXISTS "uuid-ossp";

-- REMOVE ALL SEQUENCES IN PROPERTIES RECORDS --
DO
$$
    DECLARE
        r RECORD;
    BEGIN
        SET SCHEMA 'properties';
        FOR r IN (SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'properties')
            LOOP
                EXECUTE 'DROP SEQUENCE IF EXISTS ' || quote_ident(r.sequence_name) || ' CASCADE ;';
            END LOOP;
    END
$$;

-- REMOVE ALL FUNCTIONS IN PROPERTIES RECORDS --
DO
$$
    DECLARE
        r RECORD;
    BEGIN
        FOR r IN (SELECT routine_name
                  FROM information_schema.routines
                  WHERE specific_schema = 'properties'
                    AND routine_type = 'FUNCTION')
            LOOP
                EXECUTE 'DROP FUNCTION IF EXISTS properties.' || quote_ident(r.routine_name) || ' CASCADE ;';
            END LOOP;
    END;
$$;

-- REMOVE ALL TABLES IN PROPERTIES RECORDS --
DO
$$
    DECLARE
        r RECORD;
    BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'properties')
            LOOP
                EXECUTE 'TRUNCATE TABLE properties.' || quote_ident(r.tablename) || ' CASCADE;';
                EXECUTE 'DROP TABLE properties.' || quote_ident(r.tablename) || ' CASCADE;';
            END LOOP;
    END
$$;



-- REMOVE ALL SEQUENCES IN PUBLIC RECORDS --
DO
$$
    DECLARE
        r RECORD;
    BEGIN
        SET SCHEMA 'public';
        FOR r IN (SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public')
            LOOP
                EXECUTE 'DROP SEQUENCE IF EXISTS public.' || quote_ident(r.sequence_name) || ' CASCADE ;';
            END LOOP;
    END
$$;

-- REMOVE ALL FUNCTIONS IN PUBLIC RECORDS --
DO
$$
    DECLARE
        r RECORD;
    BEGIN
        FOR r IN (SELECT routine_name
                  FROM information_schema.routines
                  WHERE specific_schema = 'public'
                    AND routine_type = 'FUNCTION')
            LOOP
                EXECUTE 'DROP FUNCTION IF EXISTS public.' || quote_ident(r.routine_name) || ' CASCADE ;';
            END LOOP;
    END;
$$;


-- REMOVE ALL TABLES IN PUBLIC RECORDS --
DO
$$
    DECLARE
        r RECORD;
    BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
            LOOP
                EXECUTE 'TRUNCATE TABLE public.' || quote_ident(r.tablename) || ' CASCADE;';
                EXECUTE 'DROP TABLE public.' || quote_ident(r.tablename) || ' CASCADE;';
            END LOOP;
    END
$$;

-- ROLES AND PERMISSIONS --
DO
$$
    BEGIN
        IF EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'public') THEN
            REVOKE ALL PRIVILEGES ON SCHEMA public FROM tenant;
        END IF;
        IF EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'properties') THEN
            REVOKE ALL PRIVILEGES ON SCHEMA properties FROM admin;
        END IF;
        IF EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'properties') THEN
            REVOKE ALL PRIVILEGES ON SCHEMA properties FROM manager;
        END IF;
    END
$$;

DROP ROLE IF EXISTS tenant;
DROP ROLE IF EXISTS admin;
DROP ROLE IF EXISTS manager;

CREATE ROLE tenant LOGIN;
CREATE ROLE admin LOGIN;
CREATE ROLE manager LOGIN;


-- SCHEMA GRANTS AND PERMISSIONS --
CREATE SCHEMA IF NOT EXISTS public;
CREATE SCHEMA IF NOT EXISTS properties;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin, manager, tenant;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA properties TO admin, manager;


grant usage on schema properties to postgres, anon, authenticated, service_role;
grant usage on schema extensions to postgres, anon, authenticated, service_role;
alter user supabase_admin SET search_path TO properties, extensions; -- don't include the "auth" schema

grant all privileges on all tables in schema properties to postgres, anon, authenticated, service_role, supabase_admin;
grant all privileges on all functions in schema properties to postgres, anon, authenticated, service_role, supabase_admin;
grant all privileges on all sequences in schema properties to postgres, anon, authenticated, service_role, supabase_admin;

alter default privileges in schema properties grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema properties grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema properties grant all on sequences to postgres, anon, authenticated, service_role;

alter default privileges for user supabase_admin in schema properties grant all on sequences to postgres, anon, authenticated, service_role;
alter default privileges for user supabase_admin in schema properties grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges for user supabase_admin in schema properties grant all on functions to postgres, anon, authenticated, service_role;

alter role anon set statement_timeout = '3s';
alter role authenticated set statement_timeout = '8s';

END;
