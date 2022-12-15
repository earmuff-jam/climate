# General Introduction

Climate is designed to support your items management process. It will allow users to share their item storage to a certain limit and users will also be able to get notification for items that are expired and / or destroyed. One of the fundamental problems that we aim to solve is the ability to share one's inventory. We are also working on steps that would allow them to loan a list of items and let you know when the list expires.

## Developer Toolchain

1. `yarn add swr` lib for the prisma client
2. `npx prisma db push` with the correct `env vars` after schema change.

# Developer Getting Started

## Onboarding

1. `git clone` from github to download the project.
2. `yarn install` to install the dependencies.
3. `yarn dev` to start localhost development.
4. `yarn storybook` to develop UI components.

# Pain points

## `Common Issues`

Some of the common pain point is yarn failing its dependencies. We can try to resolve that by using the following commands.

```
rm -rf node_modules
yarn cache clean
yarn
yarn start
```

Installation of chartjs and react charts. We have to install the chart as

```
yarn add react-chartjs-2
yarn add chartjs

```

Installation of react map for our map purposes.

```
yarn add react-simple-maps

```

Installation and Deployment of our Edge functions

The following steps are for developers who have not installed brew before. If you have brew, you can skip the first two steps. If this is your first install on a M1 chip Macbook, please note that you need to run step 3 and restart your terminal too.
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)" 
brew install supabase/tap/supabase
echo "export PATH=/opt/homebrew/bin:$PATH" >> ~/.zshrc

```

To run / deploy a edge function on Supabase cli. The project_ref can be taken from your project url.

```
supabase functions new hello
supabase functions deploy hello --project-ref <your_project_ref_goes_here>

```

This should bundle your hello package and deploy it to the supabse edge functions all across the world