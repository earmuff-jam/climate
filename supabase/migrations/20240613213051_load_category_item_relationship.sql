

--- 0007 - load category item relationship ---
--- Description: load category, item relationship ---

BEGIN;


DROP TABLE IF EXISTS category_item CASCADE ;
CREATE TABLE category_item
(
    id                          UUID PRIMARY KEY                                                        NOT NULL DEFAULT gen_random_uuid(),
    category_id                 UUID REFERENCES category (id) ON UPDATE CASCADE ON DELETE CASCADE       NOT NULL,
    category_name               VARCHAR(500)                                                            NOT NULL,
    item_id                     UUID REFERENCES inventories (id) ON UPDATE CASCADE ON DELETE CASCADE    NOT NULL,
    associated_color            VARCHAR(50),
    comments                    VARCHAR(500),
    created_on                  TIMESTAMP WITH TIME ZONE,
    created_by                  UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_on                  TIMESTAMP WITH TIME ZONE,
    updated_by                  UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    sharable_groups             UUID[]
);

COMMENT
    ON TABLE category_item IS 'table is used to for performing actions on a select category_item';
COMMENT
    ON COLUMN category_item.created_by IS 'the creator of the category_item table';


DROP INDEX IF EXISTS category_item_idx;
DROP INDEX IF EXISTS category_item_category_id_item_id_idx;
CREATE INDEX IF NOT EXISTS category_item_idx ON category_item (id);
CREATE INDEX IF NOT EXISTS category_item_category_id_item_id_idx 
ON category_item (category_id, item_id);

--- RLS POLICY FOR MAINTENANCE TABLE ---
ALTER TABLE category_item ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can view their category_item table" ON category_item FOR SELECT USING (true);
CREATE POLICY "users can insert new values to their category_item table" ON category_item FOR INSERT WITH CHECK(auth.uid() = created_by);
CREATE POLICY "users can update their own category_item table" ON category_item FOR UPDATE USING(auth.uid() = updated_by);
CREATE POLICY "users can delete their own categories" ON category_item FOR DELETE USING (auth.uid() = created_by);

END;
