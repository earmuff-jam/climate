
# Proprietatem administratio🍩🍩

We make property management easy.

Our experienced team takes care of everything from maintenance to tenant management, using the latest technology and industry best practices to ensure your investment is protected and your tenants are happy. We work closely with our clients to tailor our services to their unique needs and goals, building long-lasting relationships along the way. We bridge the gap between property owners and tenants. **magis congregare eos** 😁😁

Whether you own one property or a large portfolio, we have the expertise and resources to help you succeed. Contact us today to learn more about how we can help you achieve your property management goals.

Learn more at [Property Management](https://google.com).

## Application Memo

Built with [Next.js](https://nextjs.org/).

Current Deployment on [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Developer Guidance

### Working with the database
```
alias sb=supabase
sb start <starts the db>
sb stop <stops the db>
sb stop --backup <stops without reseting local changes>
```

`Note`:

1. Supabase Command Line Tools must be installed for local development. Supabase even recommends keeping it upto date.

2. Containerize your local instance of postgresql with Docker.

3. Add the `NEXT_PUBLIC_SUPABASE_ANON_KEY` key to your local env file.

4. Add the `NEXT_PUBLIC_SUPABASE_URL` key to your env file.

#### Working with Migrations

** CREATING MIGRATIONS **

```
alias sb=supabase
sb migration new create_table_new
sb db reset <will add your changes in psql>

```

** DEPLOYING YOUR CHANGES **

```
alias sb=supabase
<!-- only run if its the first time -->
<!-- sb link --project-ref <project_id> -->
sb db remote commit
```

`Note`:

1. The general consensus is to create a new migration instead of trying to fix the existing script. This way, we can ensure a clean run every time.

2. Deploy your changes to supabase is not in sync with your project at the time. We plan to fix it soon, but for now we have to run these commands seperately. 😵‍💫😵‍💫