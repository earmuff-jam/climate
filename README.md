
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

## Working with Migrations

**DEVELOPING LOCALLY**

To develop locally, the following steps should suffice.
1. Run `supabase start` to start the docker container for the supabase application.
2. After initialization, the project settings is visible. Use it to configure the database. You can view the database from any database tool locally.
3. Copy these settings to your `.env.local` file. This is how you setup local development.
4. Open another terminal window and run `yarn dev`. This should run your database locally. Ensure that your `supabase` is running smoothly in container from step 1.

### Issues during local development

1. One of the most common issues that happens is running `supabase create migration <name>` and running an error on the file name.
   To solve this, simply rename to the correct pattern. No other work is required.
2. If you have already made some changes and you ran command `supabase remote db commit`, you will see that it will pull remote migration to your local instance. **This is not correct**. You should only run this command once - when you initialize the project for the first time.
   You should now see an error with migrations when you `supabase db push`. To solve this issue, you should simply -

    - Delete the migration folder in your local instance.
    - Delete the migration from your supabase cli. `drop table schema.migrations`
    - At this point, your local is missing migrations folder. `git pull` to stay in sync with your remote commit from github.
    - After you bring your migrations in, run command `supabase db reset` to reset your db.
    - Running `supabase db push` should not be a problem anymore.
    - Add `user` and start testing + building the application.

**CREATING MIGRATIONS**

```
alias sb=supabase
sb migration new create_table_new
sb db reset <will add your changes in psql>

```

**DEPLOYING YOUR CHANGES**

```
alias sb=supabase
<!-- only run both of these if its the first time -->
<!-- sb link --project-ref <project_id> -->
sb db remote commit <!-- One time use only -->
```

`Note`:

1. The general consensus is to create a new migration instead of trying to fix the existing script. This way, we can ensure a clean run every time.

2. Deploy your changes to supabase is not in sync with your project at the time. We plan to fix it soon, but for now we have to run these commands seperately. 😵‍💫😵‍💫

**HANDLING ERRORS DURING MIGRATIONS**

The common practice should be to develop locally.
Push your changes and then view it in the developmental instance of the application in supabase.
If you are unaware of how to develop locally, instruction are written above.