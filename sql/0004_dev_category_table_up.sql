BEGIN;

SET SEARCH_PATH = 'climate';
SET ROLE = 'climate_admin';
SET SCHEMA 'climate';

INSERT INTO category (category_name, category_description)
    VALUES ('PANTRY', 'LOCATION TO STORE COOKING ITEMS');
INSERT INTO category (category_name, category_description)
    VALUES ('GARAGE', 'LOCATION TO STORE COOKING ITEMS');
INSERT INTO category (category_name, category_description)
    VALUES ('KITCHEN CABINET', 'LOCATION TO STORE THE KITCHEN STUFFS');
INSERT INTO category (category_name, category_description)
    VALUES ('BEDROOM CABINET', 'LOCATION TO STORE BEDROOM STUFFS');
INSERT INTO category (category_name, category_description)
    VALUES ('LIVING ROOM CABINET 1', 'LOCATION TO STORE ROOM CABINET STUFFS');
INSERT INTO category (category_name, category_description)
    VALUES ('LIVING ROOM CABINET 2', 'LOCATION TO STORE ROOM CABINET STUFFS');
INSERT INTO category (category_name, category_description)
    VALUES ('LIVING ROOM CABINET 3', 'LOCATION TO STORE ROOM CABINET STUFFS');
INSERT INTO category (category_name, category_description)
    VALUES ('LIVING ROOM CABINET 4', 'LOCATION TO STORE ROOM CABINET STUFFS');
INSERT INTO category (category_name, category_description)
    VALUES ('LIVING ROOM CABINET 5', 'LOCATION TO STORE ROOM CABINET STUFFS');
INSERT INTO category (category_name, category_description)
    VALUES ('LIVING ROOM CABINET 6', 'LOCATION TO STORE ROOM CABINET STUFFS');

END;
