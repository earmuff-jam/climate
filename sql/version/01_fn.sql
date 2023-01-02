BEGIN;
-- function to count total category items
CREATE OR REPLACE FUNCTION fn_total_category_count ()
    RETURNS integer
    AS $$
DECLARE
    total_category_count integer;
BEGIN
    SELECT DISTINCT
        count(*) INTO total_category_count
    FROM
        item_category;
    RETURN total_category_count;
    END;
$$
LANGUAGE plpgsql;
-- function to count total number of items based on location id
CREATE OR REPLACE FUNCTION fn_total_item_details_item_location_id (param integer)
    RETURNS integer
    AS $$
DECLARE
    total_item_count_by_location_id integer;
BEGIN
    SELECT DISTINCT
        count(*) INTO total_item_count_by_location_id
    FROM
        item_details
    WHERE
        item_location_id = param;
    RETURN total_item_count_by_location_id;
END;
$$
LANGUAGE plpgsql;
-- function to retrieve all item_details by item category
CREATE OR REPLACE FUNCTION item_details_by_category (category_name text)
    RETURNS TABLE (
        category_type text,
        category_name text,
        category_description text,
        category_updated_on timestamp with time zone,
        item_location_id text,
        item_name text,
        item_descrption text,
        sharable boolean,
        updated_on timestamp with time zone
    )
    AS $body$
    SELECT
        ic.cat_type,
        ic.cat_name,
        ic.cat_description,
        ic.created_on,
        id.item_location_id,
        id.item_name,
        id.item_description,
        id.is_sharable,
        id.created_on
    FROM
        item_category ic
    LEFT JOIN item_details id ON ic.id = id.item_location_id
WHERE
    cat_name = $1;
$body$
LANGUAGE sql;
END;
