-- sample data seed.sh
-- current version 1.0
BEGIN;
INSERT INTO item_category (cat_type, cat_name, cat_description)
    VALUES ('BUSINESS', 'screws', 'bolts and screw container');
INSERT INTO item_category (cat_type, cat_name, cat_description)
    VALUES ('BUSINESS', 'blades', 'all handsaw blades goes here');
INSERT INTO item_category (cat_type, cat_name, cat_description)
    VALUES ('HOUSEHOLD', 'pantry', 'gifted items');
INSERT INTO item_category (cat_type, cat_name, cat_description)
    VALUES ('HOUSEHOLD', 'kitchen sink', 'towels are thrown here for some reason');
INSERT INTO item_category (cat_type, cat_name, cat_description)
    VALUES ('JUNK', 'ex-stuff', 'trash day - thrusday');
INSERT INTO item_category (cat_type, cat_name, cat_description)
    VALUES ('HOUSEHOLD', 'gift wrapping bar', 'gift wrapping paper');
INSERT INTO item_category (cat_type, cat_name, cat_description)
    VALUES ('HOUSEHOLD', 'dog toys', 'dog toys for tiku');
INSERT INTO item_category (cat_type, cat_name, cat_description)
    VALUES ('HOUSEHOLD', 'christmas decor', 'all decorations for christmas');
INSERT INTO item_category (cat_type, cat_name, cat_description)
    VALUES ('HOUSEHOLD', 'dining table', 'driving table decorations');
INSERT INTO item_category (cat_type, cat_name, cat_description)
    VALUES ('HOUSEHOLD', 'island drawer 1', 'zip lock bags and sandwitch bags');
INSERT INTO item_category (cat_type, cat_name, cat_description)
    VALUES ('HOUSEHOLD', 'island drawer 2', 'junk drawer storage');
INSERT INTO item_category (cat_type, cat_name, cat_description)
    VALUES ('HOUSEHOLD', 'island drawer 3', 'empty containers');
INSERT INTO item_category (cat_type, cat_name, cat_description)
    VALUES ('HOUSEHOLD', 'island drawer 4', 'junk drawer');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%screws%'), '12inch bolt', 'for ceiling');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%screws%'), '1/2 inch bolt', 'for ceiling');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%screws%'), '6in bolt', 'plyboard');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%screws%'), '8in bolt', 'plyboard');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%screws%'), '6 1/2in bolt', 'plyboard');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%blades%'), '12inch blade', 'for ceiling');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%blades%'), '1/2 inch blade', 'for ceiling');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%blades%'), '6in blade', 'plyboard');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%blades%'), '8in blade', 'plyboard');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%blades%'), '6 1/2in blade', 'plyboard');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%pantry%'), '12inch apple pie kit', 'only for cooking');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%pantry%'), '1/2 inch apple pie kit', 'only for cooking');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%pantry%'), '6in apple pie kit', 'microwave can be used');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%pantry%'), '8in apple pie kit', 'microwave can be used');
INSERT INTO item_details (item_location_id, item_name, item_description)
    VALUES ((
            SELECT
                id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%pantry%'), '6 1/2in apple pie kit', 'microwave can be used');
INSERT INTO item_details_description (item_id, color, make, model, notes)
    VALUES ((
            SELECT
                id
            FROM
                item_details
            WHERE
                item_name ILIKE '%12inch bolt%'), 'silver', 'nut cracker co', '1922 olden golden', 'a bit rusted');
INSERT INTO item_details_description (item_id, color, make, model, notes)
    VALUES ((
            SELECT
                id
            FROM
                item_details
            WHERE
                item_name ILIKE '%1/2 inch bolt%'), 'silver', 'nut cracker co', '1922 olden golden', 'a bit rusted');
INSERT INTO item_details_description (item_id, color, make, model, notes)
    VALUES ((
            SELECT
                id
            FROM
                item_details
            WHERE
                item_name ILIKE '%6in bolt%'), 'silver', 'nut cracker co', '1922 olden golden', 'not rusted');
INSERT INTO item_details_description (item_id, color, make, model, notes)
    VALUES ((
            SELECT
                id
            FROM
                item_details
            WHERE
                item_name ILIKE '%1/2 inch apple pie kit%'), 'silver', 'nut cracker co', '1922 olden golden', '');
INSERT INTO item_details_description (item_id, color, make, model, notes)
    VALUES ((
            SELECT
                id
            FROM
                item_details
            WHERE
                item_name ILIKE '%6 1/2in apple pie kit%'), 'silver', 'nut cracker co', '1922 olden golden', '');
INSERT INTO category_tag (tag_name, tag_description, container_location_id, created_on)
    VALUES ('electric', 'electric screws', ( SELECT DISTINCT
                item_category.id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%screw%'), now());
INSERT INTO category_tag (tag_name, tag_description, container_location_id, created_on)
    VALUES ('concrete', ' 10 inch concrete screws', ( SELECT DISTINCT
                item_category.id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%screw%'), now());
INSERT INTO category_tag (tag_name, tag_description, container_location_id, created_on)
    VALUES ('alcohol', 'electric screws', ( SELECT DISTINCT
                item_category.id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%pantry%'), now());
INSERT INTO category_tag (tag_name, tag_description, container_location_id, created_on)
    VALUES ('wine', ' 10 inch concrete screws', ( SELECT DISTINCT
                item_category.id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%pantry%'), now());
INSERT INTO category_tag (tag_name, tag_description, container_location_id, created_on)
    VALUES ('electric', 'electric screws', ( SELECT DISTINCT
                item_category.id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%screw%'), now());
INSERT INTO category_tag (tag_name, tag_description, container_location_id, created_on)
    VALUES ('concrete', ' 10 inch concrete screws', ( SELECT DISTINCT
                item_category.id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%screw%'), now());
INSERT INTO category_tag (tag_name, tag_description, container_location_id, created_on)
    VALUES ('alcohol', 'electric screws', ( SELECT DISTINCT
                item_category.id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%pantry%'), now());
INSERT INTO category_tag (tag_name, tag_description, container_location_id, created_on)
    VALUES ('wine', ' 10 inch concrete screws', ( SELECT DISTINCT
                item_category.id
            FROM
                item_category
            WHERE
                cat_name ILIKE '%pantry%'), now());
END;
