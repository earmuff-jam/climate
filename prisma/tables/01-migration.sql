begin -- drop tables if exists
drop table if exists audit_columns cascade;

drop table if exists item_location cascade;

drop table if exists item;

-- create tables if they do not exist
create table if not exists item_location (
    item_location_id int primary key not null,
    item_location_name varchar not null,
    item_location_desc varchar user_id int,
    constraint FK_item_location_user foreign key (user_id) references user (id)
);

create table if not exists item (
    id int primary key not null,
    item_name varchar not null,
    item_desc varchar,
    item_expiry_date timestamp,
    item_location_id int,
    constraint FK_item_item_location foreign key (item_location_id) references item_location (item_location_id)
);

create table if not exists user (
    id int primary key not null,
    first_name string not null,
    last_name string not null,
    email_address string not null,
    location_street string not null,
    location_zip_code string not null,
    last_created_by varchar not null,
    last_created_on timestamp default now(),
    last_updated_by varchar,
    last_updated_on varchar
)
end;