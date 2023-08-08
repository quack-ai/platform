<p align="center">
  <a href="https://quack-ai.com"><img src="https://uploads-ssl.webflow.com/64a6527708bc7f2ce5fd6b2a/64a654825ed3d444b47c4935_quack-logo%20(copy).png" width="100" height="100"></a>
</p>
<h1 align="center">
    Maintainer Platform
</h1>

<p align="center">
  <a href="https://github.com/quack-ai/maintainer-platform/actions/workflows/builds.yml">
    <img alt="CI Status" src="https://img.shields.io/github/actions/workflow/status/quack-ai/maintainer-platform/builds.yml?branch=main&label=CI&logo=github&style=flat-square">
  </a>
  <a href="https://github.com/eslint/eslint">
    <img src="https://img.shields.io/badge/Linter-ESLint-4B32C3?style=flat-square&logo=ESLint&logoColor=white" alt="eslint">
  </a>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/Formatter-Prettier-F7B93E?style=flat-square&logo=Prettier&logoColor=white" alt="prettier">
  </a>
  <a href="https://app.codacy.com?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade">
    <img src="https://app.codacy.com/project/badge/Grade/058677772cac47c29aa3e397e2bd951c" alt="codacy">
  </a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=quackai.quack-companion">
    <img src="https://img.shields.io/visual-studio-marketplace/v/quackai.quack-companion?logo=visualstudiocode&logoColor=fff&style=flat-square&label=VS%20Marketplace" alt="VS Marketplace">
  </a>
  <a href="https://github.com/vercel/next.js">
    <img src="https://img.shields.io/badge/Next.js-13-000000?style=flat-square&logo=Next.js&logoColor=white" alt="React">
  </a>
  <a href="https://github.com/quack-ai/maintainer-platform/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-Apache 2.0-blue?style=flat-square" alt="license">
  </a>
</p>

<p align="center">
  <!-- <a href="https://discord.gg/E9rY3bVCWd">
    <img src="https://dcbadge.vercel.app/api/server/E9rY3bVCWd?style=flat" alt="discord"/>
  </a> -->
  <a target="_blank" href="https://discord.gg/E9rY3bVCWd" style="background:none">
    <img src="https://img.shields.io/badge/Discord-join-continue.svg?labelColor=191937&color=6F6FF7&logo=discord" />
  </a>
  <a href="https://twitter.com/quack_ai">
    <img src="https://img.shields.io/badge/-@quack_ai-1D9BF0?style=flat-square&logo=twitter&logoColor=white" alt="Twitter">
  </a>
</p>

This platform is meant for maintainers to curate the guidelines for their contributors.

## Quick Tour

### Running/stopping the service

You can run the API containers using this command:

```shell
make run
```

You can now navigate to [`http://dashboard.localhost:3000`](http://dashboard.localhost:3000) to interact with the [Next JS](https://nextjs.org/) app.

![screenshot](https://github.com/quack-ai/maintainer-platform/releases/download/v0.0.1/next-platform.png)

In order to stop the service, run:

```shell
make stop
```

## Installation

### Prerequisites

- [Docker](https://docs.docker.com/engine/install/)
- [Docker compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/) (optional)

The project was designed so that everything runs with Docker orchestration (standalone virtual environment), so you won't need to install any additional libraries.

## Configuration

In order to run the project, you will need to specific some information, which can be done using a `.env` file.
This file will have to hold the following information:

- `NEXT_PUBLIC_API_URL`: the endpoint of the Quack API you're using
- `NEXT_PUBLIC_REDIRECT_URI`: the URL the OAuth app redirects to

Optionally, the following information can be added:

- `NEXT_PUBLIC_POSTHOG_KEY`: the name of the [PostgreSQL](https://www.postgresql.org/) database that will be created.
- `NEXT_PUBLIC_SENTRY_DSN`: the URL of the [Sentry](https://sentry.io/) project, which monitors back-end errors and report them back.

So your `.env` file should look like something similar to:

```
NEXT_PUBLIC_API_URL=http://your-quack-api-host.com/api/v1
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/
NEXT_PUBLIC_POSTHOG_KEY=phc_my_api_key
NEXT_PUBLIC_SENTRY_DSN='https://replace.with.you.sentry.dsn/'
```

The file should be placed at the root folder of your local copy of the project.

## Roadmap

The ultimate goal for this platform is to offer a smooth maintenance experience for any project.
The development efforts will be focused on achieving the following milestones:

- ✏️ Get the possibility to add/edit/delete/reorder guidelines for your projects
- 👁️‍🗨️ Automatically parse & interpret guidelines from repository content, issues and PRs
- 📢 Have conditional guidelines and fork guideline flows from other public projects

## Telemetry

### Why we collect information

Quack is dedicated to transform the contribution workflow of developers. Developer tools are among the most difficult types of product to build and we need to better understand where to allocate/reduce our efforts over time.

Since we want to keep providing free options for our services in the future, and since we don't want to rely on advertising, we humbly ask you to share limited usage data so that we can improve the products and services that we offer.

### What we collect

For each event, here is the largest amount of data we collect:

- Event identifiers: the event type (e.g.`fetch-guidelines`) and potentially the scope (e.g. the repository)
- User information: depending on the telemetry setting, either your GitHub username or an anonymized UUID specific to you (created when you first activate the extension).

And since the extension is open source, you can navigate the codebase to verify the above information if you feel like it ;)

### What you can do about it

This data collection is done using [Posthog](https://posthog.com/) and can be:

- 😟 anonymized: by default we'll identify your actions with your GitHub username. We'll keep an option to prevent that identification, as we understand it's important for developers to have this choice.
- 😭 disabled: like in most VSCode extensions, you have the ability to disable telemetry completely.

## Copying & distribution

Copyright (C) 2023, Quack AI.

This program is licensed under the Apache License 2.0.
See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0> for full license details.

## Contributing

Feeling like improving the interface? Or perhaps submitting a new feature idea? Any sort of contribution is greatly appreciated!

You can find a short guide in [`CONTRIBUTING`](CONTRIBUTING.md) to help grow this project! And if you're interested, you can join us on [![](https://img.shields.io/badge/Discord-join-continue.svg?labelColor=191937&color=6F6FF7&logo=discord)](https://discord.gg/E9rY3bVCWd)
