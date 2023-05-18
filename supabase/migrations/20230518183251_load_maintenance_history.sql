BEGIN;
DROP TABLE IF EXISTS inspection_history;
CREATE TABLE IF NOT EXISTS inspection_history
(
    id               UUID PRIMARY KEY         NOT NULL DEFAULT uuid_generate_v4(),
    inspection_id    UUID REFERENCES inspection (id) ON UPDATE CASCADE ON DELETE CASCADE,
    property_id      UUID REFERENCES properties (id) ON UPDATE CASCADE ON DELETE CASCADE,
    inspection_date  TIMESTAMP WITH TIME ZONE NOT NULL,
    inspection_type  TEXT                     NOT NULL,
    general_comments TEXT,
    signature        TEXT                     NOT NULL,
    created_by       UUID                     NOT NULL REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_on       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    sharable_groups  UUID[]
);

COMMENT ON TABLE inspection_history IS 'INSPECTION HISTORY FOR EACH PROPERTY';
COMMENT ON COLUMN inspection_history.created_by IS 'CREATED BY IS THE USER WHO CREATED THE INSPECTION';

DROP INDEX IF EXISTS inspection_history_id_idx;
CREATE INDEX IF NOT EXISTS inspection_history_id_idx ON inspection_history (id);

DROP FUNCTION IF EXISTS auto_create_inspection_history() CASCADE;
CREATE
    OR
    REPLACE FUNCTION auto_create_inspection_history() RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO inspection_history(inspection_id, property_id, inspection_date,
                                   inspection_type, general_comments, signature, created_by, created_on,
                                   sharable_groups)
    VALUES (new.id, new.property_id, new.inspection_date, new.inspection_type, new.general_comments, new.signature,
            new.created_by, new.created_on,
            ARRAY [new.created_by:: UUID]);
    RETURN new;
END;

$$
    LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS create_new_history_automatically_trigger ON inspection;
CREATE TRIGGER create_new_history_automatically_trigger
    AFTER UPDATE OR INSERT
    ON inspection
    FOR EACH ROW
EXECUTE FUNCTION auto_create_inspection_history();
END;
