## Project structure
Whole project is writeen in typescript and it's splitted into three main directories
`/api/` - simple ExpressJS server exposing single endpoint `/providers/`
`/app/` - ReactJS application based on create-react-app (https://github.com/facebook/create-react-app)
`/utils/` - helper for migrating data from csv to the db

Each directories has separate project.json and inside scripts for building and deploying application. `/api/` and `/app/` are hosted on zeit v1 and `/utils/` is just a helper that is meant to run locally.

## Project setup
