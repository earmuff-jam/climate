Adding a user to a existing column in a table. 

```sql
UPDATE tenants
SET sharable_groups = array_append(sharable_groups, '<new_uuid>')
WHERE tenant_id = '<existing_tenant_id>';
```