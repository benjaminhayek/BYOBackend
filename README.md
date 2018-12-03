[![Waffle.io - Columns and their card count](https://badge.waffle.io/colehart/BYOBackend.svg?columns=all)](https://waffle.io/colehart/BYOBackend)

# BYOB - Build Your Own Backend

## A PostgreSQL relational database and well documented API built with Node.js, Express, and Knex.js. With, BYOBackend you can ... .

## How to Use
*Pick your palettes* on Heroku: [https://palatable-palettes.herokuapp.com/](https://palatable-palettes.herokuapp.com/).

![A screen recording of the app](https://na.com "App Screen Recording")

### Developers:
#### Install and Start Server
* Clone this repo.

* `npm install`

* `npm start`

#### Create Postgres Database and Run Migrations
*  `psql CREATE DATABASE *palettepickers*`

* `knex migrate:latest`

* `knex seed:run`

### API Endpoints
```
/api/v1/projects
/api/v1/project/:project_id/palettes
/api/v1/project/:project_id/palettes/:palette_id
```

## Technologies Used
- JavaScript
- jQuery
- Node.js
- Express
- Knex.js

## Project Requirements
Project spec can be found [here](http://frontend.turing.io/projects/build-your-own-backend.html).

Feature checklist can be found here [here](http://frontend.turing.io/projects/byob/backend-feature-checklist.html).

## Schema Wireframe
Build Your Own Backend has a one-to-many relationship between ___ and ___ .

## This is a partenered project designed and coded by Alexander Ela and Cole Hart.