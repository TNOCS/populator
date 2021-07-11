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
```

## Running the population service

An environment file is required for running the population service

this .env file should contain the following variables:

- POSTGRES_HOST_ADDRESS=localhost
- POSTGRES_PORT=5432
- POSTGRES_USER=postgis
- POSTGRES_PASSWORD=Geheim1!
- POSTGRES_DB=BAG
- PORT=3333
- PGDATA=/var/lib/postgis/data
- WEEKEND_MORNING=0.9
- WEEKDAY_MORNING=0.2
- WEEKEND_AFTERNOON=0.8
- WEEKDAY_AFTERNOON=0.4
- WEEKEND_EVENING=0.3
- WEEKDAY_EVENING=0.6
- WEEKEND_NIGHT=0.7
- WEEKDAY_NIGHT=0.9

the weekend/weekday variables are required for the calculation of the amount of people in an area with a time based request.

this environment should be placed in the same folder as the docker compose file.

the docker compose file required for running the population service is found in the root of the repository in the docker folder as 'docker-composes.yml'.

if this is run, it takes a bit of time for the population service database to be initialized after the initial docker compose up but this is resolved after a few minutes. This is due to the database being very large. If the database is stopped and restarted it will spool up instantly and is usable within seconds.

The api docs are found on localhost:3333/docs

localhost:3333/summarised for the summarised neighbourhood data

localhost:3333/detailed for the detailed household data

daypart parameter with the keywords 'morning', 'afternoon', 'evening', 'night' for time based requests
weektime parameter with the keywords 'weekend' and 'weekday' for time based requests

these 2 parameters are able to be used simultaneously for each endpoint.

when a circle is requested the feature geometry should be a point and the feature properties should contain the following attributes:

- shape: Circle
- radius: > 0
