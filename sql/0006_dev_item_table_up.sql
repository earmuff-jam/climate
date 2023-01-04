

BEGIN;

SET SEARCH_PATH = 'climate';
SET ROLE = 'climate_admin';
SET SCHEMA 'climate';


INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('SUGAR', 'ITS JUST SUGAR', 3, (SELECT category.ID
                                       FROM category
                                       WHERE category_name ILIKE '%PANTRY%'
                                       LIMIT 1));

INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('TABLE SALT', 'KOSHAR SALT', 4, (SELECT category.ID
                                         FROM category
                                         WHERE category_name ILIKE '%PANTRY%'
                                         LIMIT 1));

INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('REGULAR SALT', 'RE-USED', 2, (SELECT category.ID
                                       FROM category
                                       WHERE category_name ILIKE '%PANTRY%'
                                       LIMIT 1));

INSERT INTO item(item_name, item_description, quantity, category_id)
VALUES ('TURMERIC  POWDER', 'NEED TO BE SHIPPED', 6, (SELECT category.ID
                                                      FROM category
                                                      WHERE category_name ILIKE '%PANTRY%'
                                                      LIMIT 1));


END;