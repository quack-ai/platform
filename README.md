# Management dashboard for contribution guidelines

<p align="center">
  <a href="https://github.com/quack-ai/contribution-platform/actions/workflows/builds.yml">
    <img alt="CI Status" src="https://img.shields.io/github/actions/workflow/status/quack-ai/contribution-platform/builds.yml?branch=main&label=CI&logo=github&style=flat-square">
  </a>
  <a href="https://github.com/astral-sh/ruff">
    <img src="https://img.shields.io/badge/linter-Ruff-FCC21B.svg?style=flat-square" alt="ruff">
  </a>
  <a href="https://github.com/ambv/black">
    <img src="https://img.shields.io/badge/formatter-black-000000.svg?style=flat-square" alt="black">
  </a>
  <a href="https://github.com/PyCQA/bandit">
    <img src="https://img.shields.io/badge/security-bandit-yellow.svg?style=flat-square" alt="bandit">
  </a>
</p>


## Quick Tour

### Running/stopping the service

You can run the API containers using this command:

```shell
make run
```

You can now navigate to [`http://dashboard.localhost:8008`](http://dashboard.localhost:8008) to interact with the [Streamlit](https://streamlit.io/) app.

![screenshot](https://user-images.githubusercontent.com/26927750/257068796-daf8f0f7-1602-4bad-adba-eba8b5a3fc0a.png)

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
- `API_ENDPOINT`: your endpoint for the Quack Guideline API
- `APP_URI`: the URI of the Streamlit app

So your `.env` file should look like something similar to:
```
API_ENDPOINT='https://replace.with.quack.endpoint/'
APP_URI='http://dashboard.localhost:8008'
```

The file should be placed at the root folder of your local copy of the project.

## Contributing

Feeling like improving the interface? Or perhaps submitting a new feature idea? Any sort of contribution is greatly appreciated!

You can find a short guide in [`CONTRIBUTING`](CONTRIBUTING.md) to help grow this project!



## Copying & distribution

Copyright (C) 2023, Quack AI.

This program is licensed under the Apache License 2.0.
See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0> for full license details.
