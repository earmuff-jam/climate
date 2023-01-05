BEGIN;
SET SEARCH_PATH = 'climate';
SET ROLE = 'climate_admin';

DROP TABLE IF EXISTS subscribe;
CREATE TABLE subscribe
(
    id                 SERIAL PRIMARY KEY       NOT NULL,
    firstname          TEXT,
    lastname           TEXT,
    emailAddress       TEXT UNIQUE              NOT NULL,
    receiveEmails      BOOLEAN                           DEFAULT true,
    receiveNewsLetters BOOLEAN                           DEFAULT true,
    created_on         TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    created_by         TEXT                     NOT NULL DEFAULT CURRENT_USER
);


END;