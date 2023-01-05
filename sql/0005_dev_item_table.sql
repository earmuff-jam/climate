-- ITEM TABLE GOES HERE

BEGIN;
SET SEARCH_PATH = 'climate';
SET ROLE = 'climate_admin';

DROP TABLE IF EXISTS item;
CREATE TABLE item
(
    id               SERIAL PRIMARY KEY       NOT NULL,
    item_name        TEXT UNIQUE              NOT NULL,
    item_description TEXT,
    quantity         BIGINT                            DEFAULT 1,
    use_by_date      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '30' DAY),
    category_id      BIGINT REFERENCES category (id),
    created_on       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_by       TEXT                     NOT NULL DEFAULT CURRENT_USER
);

END;