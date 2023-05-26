BEGIN;
-- ISSUE TABLE --
DROP TABLE IF EXISTS issue;
CREATE TABLE IF NOT EXISTS issue
(
    id              UUID PRIMARY KEY         NOT NULL DEFAULT uuid_generate_v4(),
    inspection_id   UUID                     NOT NULL REFERENCES public.inspection (id) ON UPDATE CASCADE ON DELETE CASCADE,
    details         TEXT                     NOT NULL,
    description     TEXT,
    created_by      UUID                     NOT NULL REFERENCES public.profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_on      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by      UUID,
    updated_on      TIMESTAMP WITH TIME ZONE,
    sharable_groups UUID[]
);

COMMENT ON TABLE issue IS 'ISSUE DETAILS FOR EACH INSPECTION REPORT';
DROP INDEX IF EXISTS issue_id_idx;
CREATE INDEX IF NOT EXISTS issue_id_idx ON issue (id);

-- INSPECTION LOG TABLE --
DROP TABLE IF EXISTS maintenance_log;
CREATE TABLE IF NOT EXISTS maintenance_log
(
    id              UUID PRIMARY KEY         NOT NULL DEFAULT uuid_generate_v4(),
    inspection_id   UUID                     NOT NULL REFERENCES public.inspection (id) ON UPDATE CASCADE ON DELETE CASCADE,
    details         TEXT                     NOT NULL,
    description     TEXT,
    created_by      UUID                     NOT NULL REFERENCES public.profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_on      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by      UUID,
    updated_on      TIMESTAMP WITH TIME ZONE,
    sharable_groups UUID[]
);

COMMENT ON TABLE maintenance_log IS 'MAINTENANCE LOG FOR EACH INSPECTION REPORT';
DROP INDEX IF EXISTS maintenance_id_idx;
CREATE INDEX IF NOT EXISTS maintenance_id_idx ON issue (id);

-- WORK ORDER TABLE --
DROP TABLE IF EXISTS work_order;
CREATE TABLE IF NOT EXISTS work_order
(
    id              UUID PRIMARY KEY         NOT NULL DEFAULT uuid_generate_v4(),
    inspection_id   UUID                     NOT NULL REFERENCES public.inspection (id) ON UPDATE CASCADE ON DELETE CASCADE,
    details         TEXT                     NOT NULL,
    description     TEXT,
    created_by      UUID                     NOT NULL REFERENCES public.profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_on      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by      UUID,
    updated_on      TIMESTAMP WITH TIME ZONE,
    sharable_groups UUID[]
);

COMMENT ON TABLE work_order IS 'MAINTENANCE LOG FOR EACH INSPECTION REPORT';
DROP INDEX IF EXISTS work_order_id_idx;
CREATE INDEX IF NOT EXISTS work_order_id_idx ON issue (id);

END;