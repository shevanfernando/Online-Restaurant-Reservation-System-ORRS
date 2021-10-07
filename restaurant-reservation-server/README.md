# RESTAURANT RESERVATION Back-End

<p align="center">
<img alt="server" src="https://lh3.googleusercontent.com/alRCZzgFIPxBymApTfimThvWi70SASNCEW1X6cALJM08no-XZTUDouSDsx540AJbqmqaFukhNQ3z30aghrd5BPdF-YDuWTtpfEmpQDjE7jfRZ_s86FbkmOa3abYK_KO7hA9xUAjN=w2400">
</p>

This is the back-end of the **Restaurant Reservation**, and this project implement using [Express](https://expressjs.com/)
and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). It is based on a PostgreSQL database.

## Getting started <hr>

### 1. Install dependencies

Install npm dependencies:

```
cd restaurant-reservation-server
npm install
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone https://github.com/shevanfernando/restaurant-reservation.git
```

Install npm dependencies:

```
cd restaurant-reservation/restaurant-reservation-server
npm install
```

</details>

### 2. Change environment variables

All the environment variables are located in [`.env`](.env). The default name of this
file [`.env.example`](.env.example). Duplicate it (`.env.example`) and rename it as a `.env`.

#### 1. Change APP_PORT

Default port is 5000, can change it your aspect.

```
APP_PORT=5000
```

#### 2. Change DATABASE URL

Default it looks like as follows,

```
DB_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

**Keywords:**

> User: root\
> Password: mypassword\
> Host: localhost\
> Post: 5432\
> Database name: mydb\
> Schema name: public

**\*Change the TEST DB URL also.**

### 3. Create and seed the database

Run the following command to create your PostgreSQL database file. This also creates the `User` and `Post` tables that
are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npm run prisma:migration
```

Now, seed the database with the sample data in [`prisma/seed.ts`](prisma/seed.ts) by running the following command:

```
npm run prisma:seed
```

### 4. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:5000`. You can now the API requests,
e.g. [`http://localhost:5000/user`](http://localhost:5000/user).

### 5. Running unit tests and super tests

```
cd express-ts-startup-project
npm run test
```

<details><summary><strong>Alternative:</strong> Other testing</summary>

Watch all test:

```
cd express-ts-startup-project
npm run test:watch
```

Check test coverage:

```
cd express-ts-startup-project
npm itest:coverage
```

</details>
