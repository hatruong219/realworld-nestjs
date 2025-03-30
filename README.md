## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

### 📄 Environment Configuration

Create a `.env` file from `.env.example`:

```bash
# Development
cp .env.example .env.dev
```

## 🛢 Database Setup

Set the environment:

```bash
export NODE_ENV=dev
```

Generate a new migration:

```bash
yarn run migration:generate create-new-table
```

Apply migration:

```bash
yarn run migration:up
```

Rollback migration:

```bash
yarn run migration:down
```

---

##  Run app (yarn)

```bash
# Development
yarn run start:dev
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment
