--
-- current version 1.0
BEGIN;
DROP TYPE IF EXISTS item_cat_type CASCADE;
CREATE TYPE item_cat_type AS enum (
    'BUSINESS',
    'HOUSEHOLD',
    'JUNK'
);
DROP TABLE IF EXISTS category_tag;
CREATE TABLE category_tag (
    id serial PRIMARY KEY NOT NULL,
    tag_name varchar(20) UNIQUE NOT NULL,
    tag_description varchar(50) NOT NULL,
    tag_color item_urgency_color DEFAULT 'INFO',
    container_location_id integer REFERENCES item_category (id), -- tags for containers only reference item_category
    created_on timestamp with time zone DEFAULT now()
);
DROP TABLE IF EXISTS item_tag;
CREATE TABLE item_tag (
    id serial PRIMARY KEY NOT NULL,
    tag_name varchar(20) UNIQUE NOT NULL,
    tag_description varchar(30) NOT NULL,
    tag_color item_urgency_color DEFAULT 'INFO',
    item_id integer REFERENCES item_details (id), -- tags for item only reference item_details
    created_on timestamp with time zone DEFAULT now()
);
DROP TABLE IF EXISTS item_category CASCADE;
CREATE TABLE item_category (
    id serial PRIMARY KEY NOT NULL,
    cat_type item_cat_type NOT NULL,
    cat_name varchar(50) NOT NULL UNIQUE,
    cat_description varchar(60),
    created_on timestamp with time zone DEFAULT now()
);
DROP TABLE IF EXISTS item_details CASCADE;
CREATE TABLE item_details (
    id serial PRIMARY KEY NOT NULL,
    item_location_id integer REFERENCES item_category (id),
    item_name varchar(50) NOT NULL UNIQUE,
    item_description varchar(60),
    is_sharable boolean DEFAULT FALSE,
    created_on timestamp with time zone DEFAULT now()
);
DROP TABLE IF EXISTS item_details_description CASCADE;
CREATE TABLE item_details_description (
    id serial PRIMARY KEY NOT NULL,
    item_id integer REFERENCES item_details (id) UNIQUE,
    quantity integer DEFAULT 1,
    viewed_count integer DEFAULT 0,
    color varchar(10),
    make varchar(40),
    model varchar(40),
    notes varchar(40)
);
-- indexes
CREATE INDEX idx_item_category_cat_name ON item_category (cat_name);
CREATE INDEX idx_item_details_item_name ON item_details (item_name);
END;
