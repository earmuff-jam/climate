Adding a user to a existing column in a table. 

```sql
WITH user_cte AS (
  SELECT id FROM auth.users WHERE email = 'a@a.com'
)
UPDATE properties
SET sharable_groups = array_append(sharable_groups, (SELECT id FROM user_cte))
WHERE NOT sharable_groups @> (SELECT ARRAY[id] FROM user_cte)
```

It is extremely painfful to type all the characters all over the keyboard. 
alias sb='supabase '