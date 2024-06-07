
-- INSERT TEST USER --
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at)
VALUES 
  ('00000000-0000-0000-0000-000000000000', '5899f99d-a449-4bfa-8769-19c097aaf1f5', 'authenticated', 'authenticated', 'test@gmail.com',  extensions.crypt('1231231', extensions.gen_salt('bf')), timezone('utc'::text, now()), NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, timezone('utc'::text, now()), timezone('utc'::text, now()), NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

INSERT INTO auth.identities (id,user_id,identity_data, provider_id, provider,last_sign_in_at,created_at,updated_at)
VALUES 
  ('5899f99d-a449-4bfa-8769-19c097aaf1f5', '5899f99d-a449-4bfa-8769-19c097aaf1f5'::uuid, '{"sub": "5899f99d-a449-4bfa-8769-19c097aaf1f5"}', '5899f99d-a449-4bfa-8769-19c097aaf1f5'::uuid, 'email', timezone('utc'::text, now()), timezone('utc'::text, now()), timezone('utc'::text, now()));

-- INSERT SAMPLE CATEGORY DATA --
insert into category(category_name, category_description, created_by) VALUES ('Bookmarked items', 'Category to store all bookmarked items', '5899f99d-a449-4bfa-8769-19c097aaf1f5');
insert into category(category_name, category_description, created_by) VALUES ('Misc items', 'Category to store all misc items', '5899f99d-a449-4bfa-8769-19c097aaf1f5');
insert into category(category_name, category_description, created_by) VALUES ('Household items', 'Category to store all household items', '5899f99d-a449-4bfa-8769-19c097aaf1f5');


-- INSERT SAMPLE INVENTORY DATA --
insert into inventories(
    name,
    description,
    price,
    barcode,
    sku,
    quantity,
    bought_at,
    is_bookmarked,
    created_by
    ) VALUES (
    'Small native plants', 
    'Small native plants to store in the bedroom', 
    12.99, 
    '123123-barcode', 
    '123==sku', 
    2, 
    'walmart',
    false,
    '5899f99d-a449-4bfa-8769-19c097aaf1f5'
    );

insert into inventories(
    name,
    description,
    price,
    barcode,
    sku,
    quantity,
    bought_at,
        is_bookmarked,
    created_by
    ) VALUES (
    'Keyboard', 
    'Small 88 keys keyboard', 
    23.99, 
    'keyboard-barcode-13221123', 
    '123==sku', 
    1,
    'online',
    true,
    '5899f99d-a449-4bfa-8769-19c097aaf1f5'
    );


-- INSERT SAMPLE MAINTENANCE PLAN DATA --
insert into maintenance_plan(plan, type, description, created_by) values (
    'Annual inventory', '7', 'Annual inventory plan', '5899f99d-a449-4bfa-8769-19c097aaf1f5'
);

insert into maintenance_plan(plan, type, description, created_by) values (
    'Weekly inventory', '2', 'Weekly inventory plan', '5899f99d-a449-4bfa-8769-19c097aaf1f5'
);