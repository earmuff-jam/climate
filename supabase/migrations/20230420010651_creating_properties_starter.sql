begin;
set schema 'public';
drop table if exists properties cascade;
create table if not exists properties
(
    id                serial primary key not null,
    name              varchar(255)       not null,
    address           varchar            not null,
    sqFt              int                not null,
    numberOfBedRooms  int                not null,
    numberOfBathrooms int                not null,
    yearBuilt         int                not null,
    garage            int                not null,
    image             varchar(255),
    created_by        uuid               not null,
    created_at        timestamp with time zone default now(),
    updated_by        uuid,
    updated_at        timestamp with time zone,
    sharable_groups   uuid[]
);

alter table properties
    enable row level security;

create policy "Authorized Users can only manipulate items." ON properties FOR ALL USING (auth.uid() = ANY (properties.sharable_groups));
end;