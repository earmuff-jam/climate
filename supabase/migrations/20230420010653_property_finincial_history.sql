begin;
set schema 'public';
drop table if exists property_financial_history;
CREATE TABLE property_financial_history
(
    id              SERIAL PRIMARY KEY NOT NULL,
    property_id     INTEGER            NOT NULL REFERENCES properties (id),
    financial_type  VARCHAR(50)        NOT NULL,
    amount          NUMERIC(10, 2)     NOT NULL,
    date            DATE               NOT NULL,
    description     TEXT,
    created_by      UUID               NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by      UUID,
    updated_at      TIMESTAMP WITH TIME ZONE,
    sharable_groups UUID[]
);

alter table property_financial_history enable row level security ;
create policy "Authorized Users can only manipulate items." ON property_financial_history FOR ALL USING (auth.uid() = ANY (property_financial_history.sharable_groups));

end;
