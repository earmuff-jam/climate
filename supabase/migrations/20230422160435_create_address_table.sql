SET SCHEMA 'public';

-- references https://schema.org/PostalAddress

CREATE TABLE IF NOT EXISTS postal_address (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    address_street_address VARCHAR(255),
    address_locality VARCHAR(255),
    address_region VARCHAR(255),
    address_country VARCHAR(255),
    post_office_box_number VARCHAR(20),
    postal_code VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_by VARCHAR(255)
);
  
CREATE OR REPLACE FUNCTION update_postal_address_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    NEW.updated_by = USER;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE postal_address_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    postal_address_id INTEGER NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    name TEXT,
    address_country TEXT,
    address_locality TEXT,
    address_region TEXT,
    post_office_box_number TEXT,
    postal_code TEXT,
    address_street_address TEXT,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_by TEXT,
    change_type TEXT,
    CONSTRAINT person_history_pkey PRIMARY KEY (id, updated_at)
);

CREATE OR REPLACE FUNCTION set_postal_address_updated_by()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_by := USER;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER postal_address_history_updated_by_trigger
    BEFORE INSERT OR UPDATE ON postal_address_history
    FOR EACH ROW
    EXECUTE FUNCTION set_postal_address_updated_by();


CREATE OR REPLACE FUNCTION postal_address_history_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' OR TG_OP = 'DELETE') THEN
    INSERT INTO postal_address_history (postal_address_id, name, address_country, address_locality, address_region, post_office_box_number, postal_code, address_street_address, deleted, created_at, updated_by, change_type)
    VALUES (OLD.id, OLD.name, OLD.address_country, OLD.address_locality, OLD.address_region, OLD.post_office_box_number, OLD.postal_code, OLD.address_street_address, FALSE, OLD.updated_at, current_user, TG_OP);
  END IF;
  
  IF (TG_OP = 'UPDATE' OR TG_OP = 'INSERT') THEN
    INSERT INTO postal_address_history (postal_address_id, name, address_country, address_locality, address_region, post_office_box_number, postal_code, address_street_address, deleted, created_at, updated_by, change_type)
    VALUES (NEW.id, NEW.name, NEW.address_country, NEW.address_locality, NEW.address_region, NEW.post_office_box_number, NEW.postal_code, NEW.address_street_address, FALSE, NEW.created_at, current_user, TG_OP);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER postal_address_history_trigger
    AFTER INSERT OR UPDATE OR DELETE ON postal_address
    FOR EACH ROW
    EXECUTE FUNCTION postal_address_history_trigger_function();

ALTER TABLE properties
ADD COLUMN postal_address_id INTEGER REFERENCES postal_address(id);

-- Move this in a separate file
DELETE FROM properties WHERE address IS NULL;
INSERT INTO postal_address (name, address_street_address, created_at, updated_at, updated_by)
SELECT name, address, NOW(), NOW(), 'script'
FROM properties
WHERE address IS NOT NULL;

UPDATE properties
SET postal_address_id = (
    SELECT id FROM postal_address WHERE address_street_address = properties.address
);
