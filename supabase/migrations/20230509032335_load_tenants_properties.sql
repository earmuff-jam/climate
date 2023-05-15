BEGIN;

DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- TABLE PROPERTIES --
DROP TABLE IF EXISTS properties CASCADE;
CREATE TABLE IF NOT EXISTS properties
(
    id                       UUID PRIMARY KEY         NOT NULL DEFAULT uuid_generate_v4(),
    title                    TEXT                     NOT NULL,
    description              TEXT                     NOT NULL,
    property_type            TEXT                     NOT NULL,
    address                  TEXT                     NOT NULL,
    bedrooms                 INTEGER                  NOT NULL,
    bathrooms                INTEGER                  NOT NULL,
    square_footage           INTEGER                  NOT NULL,
    amenities                JSONB,
    pet_policy               JSONB,
    availability_dates_jsonb JSONB,
    rent_amount              NUMERIC(10, 2)           NOT NULL,
    security_deposit         NUMERIC(10, 2)           NOT NULL,
    lease_term               INTEGER                  NOT NULL,
    owner_id                 UUID REFERENCES public.profiles (id),
    contact_name             TEXT                     NOT NULL,
    contact_phone            TEXT,
    contact_email            TEXT                     NOT NULL,
    location_point           POINT,
    nearby_locations         TEXT,
    photos                   TEXT[],
    floor_plan               TEXT[],
    created_by               UUID                     NOT NULL REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_on               TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by               UUID,
    updated_on               TIMESTAMP WITH TIME ZONE,
    sharable_groups          UUID[]
);
COMMENT
    ON TABLE properties IS 'PROPERTY TABLE IS USED FOR PROPERTY DETAILS';
COMMENT
    ON COLUMN properties.created_by IS 'PROPERTY OWNER OF THE SAID PROPERTY.';
DROP INDEX IF EXISTS properties_location_idx;
CREATE INDEX IF NOT EXISTS properties_location_idx ON properties (id);

ALTER TABLE properties
    ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authorized users can only manipulate properties" ON properties FOR ALL USING (
    auth.uid() = ANY (properties.sharable_groups)
    );

-- AUTO UPDATE USER ROLE --
-- LIFT USER ID TO PROPERTY OWNER IF PROFILES.ID HAS PROPERTY --
-- AUTO DROP USER ROLE TO DEFAULT IF PROFILES.ID HAS NO PROPERTY --
-- NO WORKS FOR MANAGER YET --
DROP FUNCTION IF EXISTS update_user_role_fn(property_owner_id UUID, type_function text);
CREATE
    OR REPLACE FUNCTION update_user_role_fn(property_owner_id UUID, type_function text)
    RETURNS VOID AS
$$
BEGIN
    CASE type_function
        WHEN 'INSERT' THEN UPDATE public.profiles
                           SET user_role  = CASE
                                                WHEN (SELECT COUNT(*) FROM properties WHERE owner_id = property_owner_id) = 0
                                                    THEN '1204'
                                                ELSE '7543'
                               END,
                               updated_on = now(),
                               updated_by = property_owner_id
                           WHERE public.profiles.id = property_owner_id;
        WHEN 'UPDATE' THEN UPDATE public.profiles
                           SET user_role  = CASE
                                                WHEN (SELECT COUNT(*) FROM properties WHERE owner_id = property_owner_id) = 0
                                                    THEN '1204'
                                                ELSE '7543'
                               END,
                               updated_on = now(),
                               updated_by = property_owner_id
                           WHERE public.profiles.id = property_owner_id;
        WHEN 'DELETE' THEN UPDATE public.profiles
                           SET user_role  = CASE
                                                WHEN (SELECT COUNT(*) FROM properties WHERE owner_id = property_owner_id) = 0
                                                    THEN '1204'
                                                ELSE '7543'
                               END,
                               updated_on = now(),
                               updated_by = property_owner_id
                           WHERE public.profiles.id = property_owner_id;
        END CASE;
END;
$$
    LANGUAGE plpgsql;

CREATE
    OR REPLACE FUNCTION update_user_role_tr()
    RETURNS TRIGGER AS
$$
BEGIN
    -- Call the update_person_name function with the new name and the ID of the row being updated
    CASE
        WHEN tg_op = 'INSERT' OR tg_op = 'UPDATE' THEN PERFORM update_user_role_fn(NEW.owner_id, tg_op);
                                                       RETURN NEW;

        WHEN tg_op = 'DELETE' THEN PERFORM update_user_role_fn(OLD.owner_id, tg_op);
                                   RETURN OLD;
        END CASE;
END;
$$
    LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS auto_update_user_role_trigger ON properties;
CREATE
    OR REPLACE TRIGGER auto_update_user_role_trigger
    AFTER
        UPDATE OR
        INSERT
        OR
        DELETE
    ON properties
    FOR EACH ROW
EXECUTE FUNCTION update_user_role_tr();

-- TABLE REVIEWS --
DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews
(
    id                    SERIAL PRIMARY KEY,
    property_id           UUID                     NOT NULL REFERENCES properties (id) ON UPDATE CASCADE ON DELETE CASCADE,
    renter_id             UUID                     NOT NULL REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    review_text           TEXT                     NOT NULL,
    cleanliness_rating    INTEGER                  NOT NULL,
    responsiveness_rating INTEGER                  NOT NULL,
    overall_rating        INTEGER                  NOT NULL,
    created_by            UUID                     NOT NULL REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_on            TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_by            UUID,
    updated_on            TIMESTAMP WITH TIME ZONE,
    sharable_groups       UUID[]
);
COMMENT
    ON TABLE reviews IS 'REVIEWS TABLE IS USED TO REVIEW EACH PROPERTY';
DROP INDEX IF EXISTS reviews_property_id_idx;
CREATE INDEX IF NOT EXISTS reviews_property_id_idx ON reviews (property_id);

-- TABLE REVIEW HISTORY --
DROP TABLE IF EXISTS reviews_history;
CREATE TABLE reviews_history
(
    id                    SERIAL PRIMARY KEY NOT NULL,
    property_id           UUID               NOT NULL REFERENCES properties (id) ON UPDATE CASCADE ON DELETE CASCADE,
    renter_id             UUID               NOT NULL REFERENCES profiles (id) ON UPDATE CASCADE ON DELETE CASCADE,
    review_text           TEXT,
    cleanliness_rating    INTEGER            NOT NULL,
    responsiveness_rating INTEGER            NOT NULL,
    overall_rating        INTEGER            NOT NULL,
    updated_by            UUID,
    updated_at            TIMESTAMP WITH TIME ZONE,
    sharable_groups       UUID[]
);

COMMENT
    ON TABLE reviews_history IS 'REVIEW HISTORY TO STORE HISTORY OF REVIEWS';
COMMENT
    ON COLUMN reviews_history.updated_by IS 'UPDATED REFERENCES THE AUTH UUID FROM PROFILES';
COMMENT
    ON COLUMN reviews_history.updated_at IS 'TRIGGER SHOULD AUTOMATICALLY PUT IN THE RIGHT TIME';
DROP INDEX IF EXISTS reviews_history_idx;
CREATE INDEX IF NOT EXISTS reviews_history_idx ON reviews_history (id);

DROP FUNCTION IF EXISTS auto_create_review_history();
CREATE
    OR
    REPLACE FUNCTION auto_create_review_history() RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO reviews_history(property_id, renter_id, review_text, cleanliness_rating, responsiveness_rating,
                                overall_rating, updated_by, updated_at)
    VALUES (new.property_id, new.renter_id, new.review_text, new.cleanliness_rating, new.responsiveness_rating,
            new.overall_rating, new.renter_id,
            now());
    RETURN new;
END;

$$
    LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS create_new_history_automatically_trigger ON reviews;
CREATE TRIGGER create_new_history_automatically_trigger
    AFTER UPDATE OR INSERT
    ON reviews
    FOR EACH ROW
EXECUTE FUNCTION auto_create_review_history();

END;