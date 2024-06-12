

--- 0004 - load maintenance plans --- 
--- Description: load maintenance plans  --- 

BEGIN;

-- 1:: day, 2:: week, 3:: biweek, 4:: month, 5:: quater, 6:: semi-annual, 7:: annual
DROP TYPE IF EXISTS df_maintenance_plan_type CASCADE;
CREATE TYPE df_maintenance_plan_type AS ENUM ('1', '2', '3', '4', '5', '6', '7');

DROP TABLE IF EXISTS maintenance_plan CASCADE ;
CREATE TABLE maintenance_plan
(
    id                          UUID PRIMARY KEY                                                        NOT NULL DEFAULT gen_random_uuid(),
    plan                        VARCHAR(100)                                                            NOT NULL,
    type                        df_maintenance_plan_type,
    description                 VARCHAR(500),
    created_on                  TIMESTAMP WITH TIME ZONE                                                NOT NULL DEFAULT NOW(),
    created_by                  UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_on                  TIMESTAMP WITH TIME ZONE,
    updated_by                  UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    sharable_groups             UUID[]
);

COMMENT
    ON TABLE maintenance_plan IS 'table is used to for performing actions on a select maintenance plan';
COMMENT
    ON COLUMN maintenance_plan.created_by IS 'the creator of the maintenance plan item.';
COMMENT
    ON COLUMN maintenance_plan.type IS 'the type of maintenance plan - day, week, biweek, month, quater, semi-annual, annual';


DROP INDEX IF EXISTS maintenance_plan_idx;
CREATE INDEX IF NOT EXISTS maintenance_plan_idx ON maintenance_plan (id);

--- RLS POLICY FOR MAINTENANCE TABLE ---
ALTER TABLE maintenance_plan ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can view their maintenance plan" ON maintenance_plan FOR SELECT USING (true);
CREATE POLICY "users can insert new values to their maintenance plan" ON maintenance_plan FOR INSERT WITH CHECK(auth.uid() = created_by);
CREATE POLICY "users can update their own maintenance plan" ON maintenance_plan FOR UPDATE USING(auth.uid() = updated_by);
CREATE POLICY "users can delete their own categories" ON maintenance_plan FOR DELETE USING (auth.uid() = created_by);

END;
