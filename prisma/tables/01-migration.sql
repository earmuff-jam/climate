begin -- drop tables if exists
drop table if exists audit_columns cascade;

drop table if exists item_location cascade;

drop table if exists item;

-- create tables if they do not exist
create table audit_columns (
    id int primary key not null,
    createdBy varchar not null,
    createdOn timestamp default now(),
    updatedBy varchar,
    updatedOn varchar
);

create table item_location (
    item_location_id int primary key not null,
    item_location_name varchar not null,
    item_location_desc varchar
);

create table if not exists item (
    id int primary key not null,
    item_name varchar not null,
    item_desc varchar,
    item_expiry_date timestamp,
    item_location_id int,
    constraint FK_item_item_location foreign key (item_location_id) references item_location (item_location_id)
);

end;