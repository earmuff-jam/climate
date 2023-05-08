BEGIN;
SET ROLE mohitpaudyal;
SET SEARCH_PATH = public, properties;

-- INSERT STATEMENT FOR PROFILE AND TENANT TABLES --
TRUNCATE TABLE profiles CASCADE;
INSERT INTO profiles(id, username, first_name, last_name, created_on)
VALUES (uuid_generate_v4(), 'test_user', 'john', 'doe', now());

-- SEED STATEMENTS --
WITH previous_profile AS (SELECT id
                          FROM profiles
                          WHERE profiles.username = 'test_user'
                          ORDER BY created_on DESC
                          LIMIT 1)
INSERT
INTO properties (id, title, description, property_type, address, bedrooms, bathrooms, square_footage, amenities,
                 pet_policy, availability_dates, rent_amount, security_deposit, lease_term, owner_id, contact_name,
                 contact_phone, contact_email, location_point, nearby_locations, photos, floor_plan)
VALUES ('bb2a68a7-0546-4c03-8ec1-35421c7d05a5', 'Spacious Condo in Downtown',
        'This beautiful condo is located in the heart of downtown and features stunning views of the city.', 'Condo',
        '123 Main St, Suite 100, Anytown, USA', 2, 2, 1200, 'Swimming Pool, Gym, Parking', 'Pets allowed with deposit',
        '2023-06-01', 2000.00, 1000.00, 12, (SELECT id FROM previous_profile), 'John Smith', '555-555-1234',
        'john.smith@email.com',
        POINT(-118.2437, 34.0522), 'Restaurants, Shops',
        '{"https://example.com/photos/photo1.jpg", "https://example.com/photos/photo2.jpg"}',
        '{"https://example.com/floor_plans/floor_plan1.pdf"}');

WITH previous_profile AS (SELECT id
                          FROM profiles
                          WHERE profiles.username = 'test_user'
                          ORDER BY created_on DESC
                          LIMIT 1)
INSERT
INTO properties (id, title, description, property_type, address, bedrooms, bathrooms, square_footage, amenities,
                 pet_policy, availability_dates, rent_amount, security_deposit, lease_term, owner_id, contact_name,
                 contact_phone, contact_email, location_point, nearby_locations, photos, floor_plan)
VALUES ('6c9042b2-c7b3-4e3d-9203-f2d3582b9c90', 'Cozy Cottage in the Woods',
        'This charming cottage is nestled in the woods and offers a peaceful retreat from the city.', 'Cottage',
        '456 Forest Rd, Anytown, USA', 1, 1, 800, 'Fireplace, Outdoor Seating', 'No pets allowed', '2023-07-01',
        1500.00, 750.00, 6, (SELECT id FROM previous_profile), 'Jane Doe', '555-555-5678', 'jane.doe@email.com',
        POINT(-122.0840, 37.4219),
        'Hiking Trails, Lake', '{"https://example.com/photos/photo3.jpg", "https://example.com/photos/photo4.jpg"}',
        '{"https://example.com/floor_plans/floor_plan2.pdf"}');

WITH previous_profile AS (SELECT id
                          FROM profiles
                          WHERE profiles.username = 'test_user'
                          ORDER BY created_on DESC
                          LIMIT 1)
INSERT
INTO properties (id, title, description, property_type, address, bedrooms, bathrooms, square_footage, amenities,
                 pet_policy, availability_dates, rent_amount, security_deposit, lease_term, owner_id, contact_name,
                 contact_phone, contact_email, location_point, nearby_locations, photos, floor_plan)
VALUES ('e201b7a5-5e5b-4ed8-a35d-5c5d9793203e', 'Luxury Penthouse with Panoramic Views',
        'This stunning penthouse boasts incredible views of the city skyline and features top-of-the-line amenities.',
        'Cottage', '456 Forest Rd, Anytown, USA', 1, 1, 800, 'Fireplace, Outdoor Seating', 'No pets allowed',
        '2023-07-01', 1500.00, 750.00, 6, (SELECT id FROM previous_profile), 'Jane Doe', '555-555-5678',
        'jane.doe@email.com',
        POINT(-122.0840, 37.4219),
        'Hiking Trails, Lake', '{"https://example.com/photos/photo3.jpg", "https://example.com/photos/photo4.jpg"}',
        '{"https://example.com/floor_plans/floor_plan2.pdf"}');


-- RETRIEVES THE id OF THE FIRST ROW OF TABLE properties. --
-- SELECT p.id
-- FROM properties p
-- WHERE EXISTS(
--               SELECT 1 FROM properties
--           )
-- LIMIT 1;
INSERT INTO reviews(property_id, renter_id, review_text, cleanliness_rating, responsiveness_rating, overall_rating,
                    created_at, created_by, updated_by, updated_at)
VALUES ((SELECT p.id
         FROM properties p
         WHERE EXISTS(
                       SELECT 1 FROM properties
                   )
         LIMIT 1),
        (SELECT t.id
         FROM tenants t
         WHERE EXISTS(SELECT 1 FROM tenants)
         LIMIT 1),
        'This apartment was fantastic. Clean, modern, and spacious. The location was also very convenient for getting around the city. Highly recommend!',
        5, 5, 5, '2023-05-05 10:00:00',
        (SELECT t.id
         FROM tenants t
         WHERE EXISTS(SELECT 1 FROM tenants)
         LIMIT 1),
        (SELECT t.id
         FROM tenants t
         WHERE EXISTS(SELECT 1 FROM tenants)
         LIMIT 1), '2023-05-05 12:00:00');

-- UPDATE THE REVIEW TABLE -- THIS SHOULD TRIGGER THE HISTORY TO AUTO POPULATE.
INSERT INTO reviews(property_id, renter_id, review_text, cleanliness_rating, responsiveness_rating, overall_rating,
                    created_at, created_by, updated_by, updated_at)
VALUES ((SELECT p.id
         FROM properties p
         WHERE EXISTS(
                       SELECT 1 FROM properties
                   )
         LIMIT 1),
        (SELECT t.id
         FROM tenants t
         WHERE EXISTS(SELECT 1 FROM tenants)
         LIMIT 1), 'It felt like a home sweet home. test.', 5, 4, 5, now(),
        (SELECT t.id
         FROM tenants t
         WHERE EXISTS(SELECT 1 FROM tenants)
         LIMIT 1), null, null)
ON CONFLICT
    (renter_id)
    DO UPDATE SET review_text           = EXCLUDED.review_text,
                  cleanliness_rating    = EXCLUDED.cleanliness_rating,
                  responsiveness_rating = EXCLUDED.responsiveness_rating,
                  overall_rating        = EXCLUDED.overall_rating,
                  created_by            = EXCLUDED.created_by,
                  updated_by            = (SELECT t.id FROM tenants t WHERE EXISTS(SELECT 1 FROM tenants) LIMIT 1);


-- TO NOTICE CHANGES IN THE HISTORY TABLE RUN THE ABOVE INSERT + UPDATE STATEMENT WITH A DIFFERENT TEXT. --

SELECT *
FROM profiles;
select *
from properties;
TRUNCATE TABLE properties.reviews;
TRUNCATE TABLE properties.reviews_history;
TRUNCATE TABLE properties.properties CASCADE;


WITH prev_profile AS (SELECT id
                      FROM public.profiles
                      WHERE profiles.username = 'test_user'
                      ORDER BY created_on DESC
                      LIMIT 1)
DELETE
FROM properties.properties
WHERE owner_id = (SELECT id FROM prev_profile);
END;

-- THE TRIGGERS ARE NOT WORKING FOR DELETING A PROPERTY --
