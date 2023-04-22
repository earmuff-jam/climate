
-- file name must match pattern "<timestamp>_name.sql")
drop table if exists tenants cascade;
drop type if exists tenant_type_enum cascade;
-- opportunity : means that the tenant is not in any property
-- lead : means that the tenant is in at least 1 property
-- 0 : opportunity, 1 : lead
create type tenant_type_enum as enum ('0', '1');
create table tenants
(
    tenant_id              uuid primary key not null,
    tenant_type            tenant_type_enum not null default '0',
    firstName              text             not null,
    lastName               text             not null,
    email                  text,
    phone                  text,
    dob                    text             not null,
    occupation             text             not null,
    employer               text,
    monthlyIncome          text             not null,
    emergencyContactName   text             not null,
    emergencyContactPhone  text             not null,
    moveInDate             text             not null,
    leaseDuration          text             not null,
    rentAmount             text             not null,
    securityDepositAmount  text             not null,
    petAllowed             text             not null,
    petDescription         text,
    backgroundCheckConsent text             not null,
    created_by             uuid             not null,
    created_at             timestamp with time zone  default now(),
    updated_by             uuid,
    updated_at             timestamp with time zone,
    sharable_groups        uuid[]
);

alter table tenants
    enable row level security;

create policy "Authorized Users can only manipulate items." ON tenants FOR ALL USING (auth.uid() = ANY (tenants.sharable_groups));
end;



