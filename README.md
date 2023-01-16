# General Introduction

Climate is designed to support your items management process. It will allow users to share their item storage to a certain limit and users will also be able to get notification for items that are expired and / or destroyed. One of the fundamental problems that we aim to solve is the ability to share one's inventory. We are also working on steps that would allow them to loan a list of items and let you know when the list expires.

# Developer Toolchain

## Onboarding

1. `git clone` from github to download the project.
2. `yarn install` to install the dependencies.
3. `yarn dev` to start localhost development.
4. `yarn storybook` to develop UI components.
5. `yarn add react-jsbarcode` for the barcode.

### Pain points

### `Common Issues`

Some of the common pain point is yarn failing its dependencies. We can try to resolve that by using the following commands.

```
rm -rf node_modules
yarn cache clean
yarn
yarn start
```

Authentication Setup Overview

We are currently using Supabase auth and login. Doing this, we are sepearting out auth, user and item data. A user is able to sign into the application using `Magic link`. 

Installed package list -

```
yarn add @supabase/supabase-js
yarn add @supabase/auth-helpers-react @supabase/auth-helpers-nextjs
yarn add @supabase/auth-ui-react
```
