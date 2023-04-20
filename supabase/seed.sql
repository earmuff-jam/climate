TRUNCATE TABLE properties CASCADE;
TRUNCATE TABLE tenants CASCADE;

INSERT INTO properties (name, address, sqFt, numberOfBedRooms, numberOfBathrooms, yearBuilt, garage, image, created_by, sharable_groups)
VALUES
('Luxury Villa', '123 Main Street', 3500, 4, 4, 2010, 2, 'https://picsum.photos/200', 'b0fa8dea-e866-4519-8674-f04c8ae49a79', '{"b0fa8dea-e866-4519-8674-f04c8ae49a79", "93416f71-6970-4503-a37d-95d84d5f8406", "0b3e75a0-4e3b-42ce-8ac8-1603c4043e43"}'),
('Beach House', '456 Ocean Boulevard', 2000, 3, 2, 1995, 1, 'https://picsum.photos/200', 'b0fa8dea-e866-4519-8674-f04c8ae49a79', '{"b0fa8dea-e866-4519-8674-f04c8ae49a79"}'),
('City Apartment', '789 Main Street', 1000, 1, 1, 2015, 0, 'https://picsum.photos/200', 'b0fa8dea-e866-4519-8674-f04c8ae49a79', '{"b0fa8dea-e866-4519-8674-f04c8ae49a79", "93416f71-6970-4503-a37d-95d84d5f8406", "0b3e75a0-4e3b-42ce-8ac8-1603c4043e43"}'),
('Ranch House', '246 Country Road', 1500, 2, 2, 2000, 2, 'https://picsum.photos/200', 'b0fa8dea-e866-4519-8674-f04c8ae49a79', '{"b0fa8dea-e866-4519-8674-f04c8ae49a79"}'),
('Mountain Chalet', '369 Hillside Drive', 3000, 5, 3, 1985, 2, 'https://picsum.photos/200', 'b0fa8dea-e866-4519-8674-f04c8ae49a79', '{"b0fa8dea-e866-4519-8674-f04c8ae49a79", "93416f71-6970-4503-a37d-95d84d5f8406", "0b3e75a0-4e3b-42ce-8ac8-1603c4043e43"}'),
('Lakefront Cottage', '789 Lakeview Drive', 1200, 2, 1, 1970, 0, 'https://picsum.photos/200', 'b0fa8dea-e866-4519-8674-f04c8ae49a79', '{"b0fa8dea-e866-4519-8674-f04c8ae49a79"}'),
('Suburban Home', '321 Oak Street', 2000, 3, 2, 2005, 1, 'https://picsum.photos/200', 'b0fa8dea-e866-4519-8674-f04c8ae49a79', '{"b0fa8dea-e866-4519-8674-f04c8ae49a79", "93416f71-6970-4503-a37d-95d84d5f8406", "0b3e75a0-4e3b-42ce-8ac8-1603c4043e43"}');

INSERT INTO tenants (tenant_id, tenant_type, firstName, lastName, email, phone, dob, occupation, employer, monthlyIncome, emergencyContactName, emergencyContactPhone, moveInDate, leaseDuration, rentAmount, securityDepositAmount, petAllowed, petDescription, backgroundCheckConsent, created_by) 
VALUES 
    ('123e4567-e89b-12d3-a456-426655440001', '0', 'Homer', 'Simpson', 'homer@springfield.com', '555-1234', '1956-05-12', 'Nuclear Safety Inspector', 'Springfield Nuclear Power Plant', '$5,000', 'Marge Simpson', '555-5678', '2023-05-01', '1 year', '$1,000', '$1,000', 'Yes', '3 cats', 'Yes', '123e4567-e89b-12d3-a456-426655440002'),
    ('123e4567-e89b-12d3-a456-426655440003', '0', 'Marge', 'Simpson', 'marge@springfield.com', '555-5678', '1954-04-01', 'Homemaker', 'N/A', '$0', 'Homer Simpson', '555-1234', '2023-05-01', '1 year', '$1,000', '$1,000', 'Yes', '2 dogs and a parrot', 'Yes', '123e4567-e89b-12d3-a456-426655440002'),
    ('d1ac9ca1-434a-4f2d-9f10-5a00e30bcca2', '0', 'Bart', 'Simpson', 'bart@springfield.com', '+1 (555) 555-1414', 'April 1, 1980', 'Student', 'Springfield Elementary School', '$0', 'Homer Simpson', '+1 (555) 555-1212', 'January 1, 2000', '12 months', '$500', '$500', 'No', NULL, 'Yes', 'b0ed3f54-08d6-4a9e-94b3-72b7c73fe030'),
    ('4c31e4d4-864f-4e9a-9b91-2b9676e771b6', '0', 'Lisa', 'Simpson', 'lisa@springfield.com', '+1 (555) 555-1515', 'May 9, 1984', 'Student', 'Springfield Elementary School', '$0', 'Marge Simpson', '+1 (555) 555-1313', 'January 1, 2000', '12 months', '$500', '$500', 'No', NULL, 'Yes', 'b0ed3f54-08d6-4a9e-94b3-72b7c73fe030');