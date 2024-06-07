

--- 0004 - load categories --- 
--- Description: load categories for a logged in user --- 

BEGIN;

DROP TABLE IF EXISTS category CASCADE ;
CREATE TABLE category
(
    id                          UUID PRIMARY KEY                                                        NOT NULL DEFAULT gen_random_uuid(),
    category_name               VARCHAR(100)                                                            NOT NULL,
    category_description        VARCHAR(500),
    is_deleteable               BOOLEAN                                                                          DEFAULT true,
    created_on                  TIMESTAMP WITH TIME ZONE                                                NOT NULL DEFAULT NOW(),
    created_by                  UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_on                  TIMESTAMP WITH TIME ZONE,
    updated_by                  UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    sharable_groups             UUID[]
);

ALTER TABLE category ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users can view their category list" ON category FOR SELECT USING (true);
CREATE POLICY "users can insert new values to their category list" ON category FOR INSERT WITH CHECK(auth.uid() = created_by);
CREATE POLICY "users can update their own category list" ON category FOR UPDATE USING(auth.uid() = created_by);
CREATE POLICY "users can delete their own categories" ON category FOR DELETE USING (auth.uid() = created_by);

END;
