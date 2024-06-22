

--- 0008 - load maintenance item relationship ---
--- Description: load maintenance, item relationship ---

BEGIN;

-- 1:: ok, 2:: needs_attention, 3:: overflow, 4:: creator_override
DROP TYPE IF EXISTS df_maintenance_item_status CASCADE;
CREATE TYPE df_maintenance_item_status AS ENUM ('1', '2', '3', '4');

DROP TABLE IF EXISTS maintenance_item CASCADE ;
CREATE TABLE maintenance_item
(
    id                          UUID PRIMARY KEY                                                            NOT NULL DEFAULT gen_random_uuid(),
    maintenance_id              UUID REFERENCES maintenance_plan (id) ON UPDATE CASCADE ON DELETE CASCADE   NOT NULL,
    maintenance_plan_name       VARCHAR(500)                                                                NOT NULL,
    item_id                     UUID REFERENCES inventories (id) ON UPDATE CASCADE ON DELETE CASCADE        NOT NULL,
    overflow                    BOOLEAN                                                                              DEFAULT false,
    associated_color            VARCHAR(50),
    comments                    VARCHAR(500),
    status                      df_maintenance_item_status                                                  NOT NULL DEFAULT '2',
    created_on                  TIMESTAMP WITH TIME ZONE,
    created_by                  UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_on                  TIMESTAMP WITH TIME ZONE,
    updated_by                  UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    sharable_groups             UUID[]
);

COMMENT
    ON TABLE maintenance_item IS 'table is used to for performing actions on a select maintenance_item';
COMMENT
    ON COLUMN maintenance_item.created_by IS 'the creator of the maintenance_item table';
COMMENT
    ON COLUMN maintenance_item.overflow IS 'the selection to determine if the selected item needs attention or not. Overflowed items need attention. Default value is false';
COMMENT
    ON COLUMN maintenance_item.status IS 'the status of the selected item. if maintenance limit is crossed, items are marked as needs override. creator can override it';

DROP INDEX IF EXISTS maintenance_item_idx;
DROP INDEX IF EXISTS maintenance_item_maintenance_id_item_id_idx;
CREATE INDEX IF NOT EXISTS maintenance_item_idx ON maintenance_item (id);
CREATE INDEX IF NOT EXISTS maintenance_item_maintenance_id_item_id_idx ON maintenance_item (maintenance_id, item_id);

--- RLS POLICY FOR MAINTENANCE TABLE ---
ALTER TABLE maintenance_item ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can view their maintenance item table" ON maintenance_item FOR SELECT USING (true);
CREATE POLICY "users can insert new values to their maintenance item table" ON maintenance_item FOR INSERT WITH CHECK(auth.uid() = created_by);
CREATE POLICY "users can update their own maintenance item table" ON maintenance_item FOR UPDATE USING(auth.uid() = updated_by);
CREATE POLICY "users can delete their own categories" ON maintenance_item FOR DELETE USING (auth.uid() = created_by);

END;
