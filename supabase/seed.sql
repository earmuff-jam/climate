BEGIN;

WITH previous_profile AS (SELECT id
                          FROM profiles
                          WHERE user_role = '1204'
                          ORDER BY created_on DESC
                          LIMIT 1)
INSERT
INTO properties
(id, title, description, property_type, address, bedrooms, bathrooms, square_footage, amenities, pet_policy,
 availability_dates_jsonb, rent_amount, security_deposit, lease_term, owner_id, contact_name, contact_phone,
 contact_email, location_point, nearby_locations, photos, floor_plan, created_by, created_on, updated_by, updated_on)
VALUES ('123e4567-e89b-12d3-a456-426655440000', 'Beautiful apartment in downtown',
        'Spacious and bright apartment located in the heart of downtown', 'Apartment',
        '123 Main Street, Unit 4B, Anytown, USA', 2, 2, 1200, '{
    "swimming_pool": true,
    "gym": true,
    "balcony": false
  }', '{
    "cats_allowed": true,
    "dogs_allowed": false,
    "pet_deposit": 500
  }', '{
    "start_date": "2023-06-01",
    "end_date": "2024-06-01"
  }', 2000.00, 1000.00, 12, (SELECT id FROM previous_profile), 'John Doe', '555-555-5555', 'johndoe@email.com',
        '(40.7128, -74.0060)', 'Central Park, Empire State Building',
        ARRAY ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
        ARRAY ['https://example.com/floor_plan.pdf'], (SELECT id FROM previous_profile), '2023-05-13 00:00:00', NULL,
        NULL);

END;
