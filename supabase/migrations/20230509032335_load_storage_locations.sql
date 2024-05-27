
-- 0002 - load storage locations --
-- Description: Create the storage location for select inventory item -- 

BEGIN;

DROP TABLE IF EXISTS storage_locations CASCADE;
CREATE TABLE IF NOT EXISTS storage_locations
(
    id              UUID PRIMARY KEY                  DEFAULT gen_random_uuid(),
    location        VARCHAR(100)             NOT NULL UNIQUE,
    created_by      UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    updated_by      UUID REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    sharable_groups UUID[]
);

-- prefil locations ---
INSERT INTO storage_locations (location)
VALUES ('Kitchen Pantry'),
       ('Master Bedroom Closet'),
       ('Garage'),
       ('Living Room Cabinet'),
       ('Bathroom Closet'),
       ('Dining Room Hutch'),
       ('Home Office Desk'),
       ('Basement Storage'),
       ('Kids'' Playroom'),
       ('Garage Workshop'),
       ('Guest Bedroom Closet'),
       ('Outdoor Shed'),
       ('Utility Closet'),
       ('Attic Storage'),
       ('Guest Bathroom Cabinet'),
       ('Children''s Bedroom Closet'),
       ('Outdoor Storage Box'),
       ('Home Gym Closet'),
       ('Patio Storage Bench'),
       ('Study Room Bookshelf'),
       ('Laundry Room Cabinet'),
       ('Home Theater Shelf'),
       ('Backyard Storage Shed'),
       ('Closet Under the Stairs'),
       ('Home Bar Cabinet'),
       ('Tool Shed'),
       ('Linen Closet'),
       ('Shoe Rack'),
       ('Home Library'),
       ('Tool Bench');

COMMENT ON TABLE storage_locations IS 'location of each storage item belonging to each event';

END;