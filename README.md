**API** - https://codingchalangeapi.now.sh
**APP** - https://codingchalangeapp.now.sh
(When not used for a while it might take for them fews more seconds to boot)

## Project
Project is writeen in typescript and it's splitted into three main directories
##### `/api/` - simple ExpressJS server exposing single endpoint `/providers/`
*Express JS* - Probably not required for such a small api, but it's really easy to set up, which allowed me to save some time.
*Postgres JS* - Data in CSV are structured so PostgresJS with its good search capabilities seemed to be a good choice. 
##### `/app/` - ReactJS application based on create-react-app (https://github.com/facebook/create-react-app)
*ReactJS* - possibly an overkill for such a small application, but I know it well and it gave me development comfort.
*Ant Design* - I decided to use component library, becouse I didn't want to focus on design, which I felt wasn't the part of the task. I resulted in a littble bit messy styling, but...
*react-refetch* - I find it really clean and declarative (react-like) solution for fetching data. It also remidns me react-apollo, to which I'm really used to.
##### `/utils/` - helper for migrating data from csv to the db


### Set up
Each directories has separate project.json and inside scripts for building and deploying application. `/api/` and `/app/` are hosted on zeit v1 and `/utils/` is just a helper that is meant to run locally.

##### `/app/`
```
cd app/
yarn
yarn start
```

##### `/api/`
to run api locally you have to create local database `codingchallange` (to match this local URI postgresql://localhost/codingchallange) or pass DATABASE_URL as enviroment variable to each request
```
cd api/
yarn
yarn migrate
yarn start
```
(to populate db with data go to `/utils`/ and run `yarn && yarn hydrate` - also requires DATABASE_URL)

Database `codingchallangetest` is a default when running tests

### Set up

Endpoint: https://codingchalangeapi.now.sh/providers

#### Search Query parameters

| Parameter                       | Description                               |
|---------------------------------|-------------------------------------------|
| `max_discharges`                | The maximum number of Total Discharges    |
| `min_discharges`                | The minimum number of Total Discharges    |
| `max_average_covered_charges`   | The maximum Average Covered Charges       | 
| `min_average_covered_charges`   | The minimum Average Covered Charges       |
| `max_average_medicare_payments` | The maximum Average Medicare Payment      |
| `min_average_medicare_payments` | The minimum Average Medicare Payment      |
| `state`                         | The exact state that the provider is from |


#### Pagination
Dataset size required adding pagination to the results. Default page size is 50, limit for page size is 500. To allow implementing pagination on the front-end, while keeping required data output I decided to return number of total items using response header (`x-total-count`). You can freely combine pagination query parameters with search query parameters.

| Parameter             | Description                                     |
|-----------------------|-------------------------------------------------|
| `page`                | The pagination page number (starting with 1)    |
| `per_page`            | The number of items displayed per page          |
