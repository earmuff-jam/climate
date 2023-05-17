BEGIN;
DROP TABLE IF EXISTS inspection;
CREATE TABLE IF NOT EXISTS inspection
(
    id               UUID PRIMARY KEY         NOT NULL DEFAULT uuid_generate_v4(),
    property_id      UUID                     NOT NULL REFERENCES public.properties (id) ON UPDATE CASCADE ON DELETE CASCADE,
    name             TEXT                     NOT NULL,
    inspection_date  TIMESTAMP WITH TIME ZONE NOT NULL,
    inspection_type  TEXT                     NOT NULL,
    general_comments TEXT,
    signature        TEXT                     NOT NULL,
    created_by       UUID                     NOT NULL REFERENCES public.profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_on       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by       UUID,
    updated_on       TIMESTAMP WITH TIME ZONE,
    sharable_groups  UUID[]
);

COMMENT ON TABLE inspection IS 'INSPECTION REPORT FOR EACH PROPERTY CONFIGURED BY OWNER';
DROP INDEX IF EXISTS inspection_idx;
CREATE INDEX IF NOT EXISTS inspection_idx ON inspection (id);
END;