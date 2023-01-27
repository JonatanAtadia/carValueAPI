
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

```

## Users Resquest HTTP
* Create a new user:

POST http://localhost:3000/auth/signup

content-type: application/json

{
  "email": "test1@test.com",
  "password": "12345"
}

* Sign in as an existing user:

POST http://localhost:3000/auth/signin

content-type: application/json

{
  "email": "test1@test.com",
  "password": "12345"
}

* Sign Out:

POST http://localhost:3000/auth/signout

* Get the currently signed in user:

GET http://localhost:3000/auth/whoiam

* Find a particular user with a given ID:

GET http://localhost:3000/auth/4

* Find all users with a given email:

GET http://localhost:3000/auth?email=test@test.com

* Delete a user given id:

DELETE http://localhost:3000/auth/3

* Update a user:

PATCH http://localhost:3000/auth/4

content-type: application/json

{
  "password": "aaaaa"
}


## Reports Requests HTTP

* Create a new report:

POST http://localhost:3000/reports

Content-Type: application/json

{
    "price": 50000,
    "make": "Toyota",
    "model": "Corolla",
    "year": 2007,
    "lng": 0,
    "lat": 0,
    "mileage": 60000
}

* Approve an existing report:

PATCH http://localhost:3000/reports/5

Content-Type: application/json

{
    "approved": true
}

* Get an estimate for an  existing report:

GET http://localhost:3000/reports?make=toyota&model=corolla&lng=0&lat=0&mileage=20000&year=1980
