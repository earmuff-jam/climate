
-- 0003 load inventories details ---
--- Description: inventory item details ---

BEGIN;

-- TABLE INVENTORIES --
DROP TABLE IF EXISTS inventories CASCADE;
CREATE TABLE IF NOT EXISTS inventories
(
    id                    UUID PRIMARY KEY                                                                  NOT NULL DEFAULT gen_random_uuid(),
    name                  VARCHAR(100)                                                                      NOT NULL,
    description           VARCHAR(500),
    price                 DECIMAL(10, 4)                                                                             DEFAULT 0.00,
    barcode               VARCHAR(100),
    sku                   VARCHAR(100),
    quantity              INT                                                                                        DEFAULT 1,
    bought_at             VARCHAR(500),
    location              VARCHAR(500),
    storage_location_id   UUID REFERENCES storage_locations (id) ON UPDATE CASCADE ON DELETE CASCADE,
    is_bookmarked         BOOLEAN                                                                          NOT NULL DEFAULT false,
    is_returnable         BOOLEAN                                                                          NOT NULL DEFAULT false,
    return_location       VARCHAR(200),
    return_datetime       TIMESTAMP WITH TIME ZONE                                                             NULL,
    max_weight            VARCHAR(10) , -- weight distribution is in kg
    min_weight            VARCHAR(10) , -- weight distribution is in kg
    max_height            VARCHAR(10) , -- height distribution is in inches
    min_height            VARCHAR(10) , -- height distribution is in inches
    created_on            TIMESTAMP WITH TIME ZONE                                                         NOT NULL DEFAULT NOW(),
    created_by            UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_on            TIMESTAMP WITH TIME ZONE                                                         NOT NULL DEFAULT NOW(),
    updated_by            UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    sharable_groups       UUID[]
);
COMMENT
    ON TABLE inventories IS 'table is used to for performing actions on inventories';
COMMENT
    ON COLUMN inventories.created_by IS 'the creator of the inventory item.';

DROP INDEX IF EXISTS inventories_id_idx;
CREATE INDEX IF NOT EXISTS inventories_id_idx ON inventories (id);

END;
