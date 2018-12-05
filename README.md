[![Waffle.io - Columns and their card count](https://badge.waffle.io/colehart/BYOBackend.svg?columns=all)](https://waffle.io/colehart/BYOBackend)

[![Build Status](https://travis-ci.org/colehart/BYOBackend.svg?branch=master)](https://travis-ci.org/colehart/BYOBackend)

# BYOBackend - Recharge API

## Recharge while you recharge! With Recharge API, you can query a sophisticated API to find Electric Vehicle (EV) charging stations and nearby cafes anywhere in the US or Canada. A Heroku-hosted PostgreSQL relational database and well-documented API built with Node.js, Express, and Knex.js.

## How to Use
Recharge API on Heroku: [https://recharge-api.herokuapp.com/](https://recharge-api.herokuapp.com/).

![A screen recording of the app](https://na.com "App Screen Recording")

### Developers:
#### Install and Start Server
* Clone this repo.

* `npm install`

* `npm start`

#### Create Postgres Database and Run Migrations
* `psql CREATE DATABASE rechargeables`

* `knex migrate:latest`

* `knex seed:run`

### API Endpoints
#### Charging Stations
```
GET /api/v1/stations // get all stations
GET /api/v1/stations/:station_id // get a particular station
POST/api/v1/stations/:station_id/  // create a new station
PUT/api/v1/stations/:station_id/  // edit an existing station
DELETE /api/v1/stations/:station_id/  // delete a station
```
#### Cafes
```
GET /api/v1/stations/:station_id/cafes // get all cafes
GET /api/v1/stations/:station_id/cafes/:cafe_id  // get a specific cafe
POST /api/v1/stations/:station_id/cafes/:cafe_id  // create a new cafe
PUT /api/v1/stations/:station_id/cafes/:cafe_id  // edit an existing cafe
DELETE /api/v1/cafes/:cafe_id  // delete a cafe
```

## Technologies Used
- JavaScript
- jQuery
- Node.js
- Express
- Knex.js
- Heroku

## Project Requirements
Project spec can be found [here](http://frontend.turing.io/projects/build-your-own-backend.html).

Feature checklist can be found here [here](http://frontend.turing.io/projects/byob/backend-feature-checklist.html).

## Database Schema Wireframe
Recharge API has a one-to-many relationship between recharging stations and cafes.
![An illustration of the database schema](https://raw.githubusercontent.com/colehart/BYOBackend/master/public/assets/images/rechargeSchema.png "Database schema")


## This is a partenered project designed and coded by Alexander Ela and Cole Hart.