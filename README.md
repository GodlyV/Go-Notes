# Dormakaba-Notes
This project is a web application that allows a user to Store, Create, Update and Delete notes.
This is done through a main dashboard with a list of notes pulled from a Postgres Database. 

## Development Environment

#### Set Up
1. From the command line, go to the root of the Dormakaba-Notes folder and run the docker-compose up --build command. This will build and run all containers.

2. Go to http://localhost:3000 and there will be two predefined notes. You can edit them or delete them.

##### Frontend: localhost:3000
##### Express Backend: localhost:3001
##### Adminer: localhost:8080
##### Postgres: localhost:9906 

#### Developping
1. There are cypress tests set up to test he different components and the CRUD operations. 

2. To run it press npx cypress open or npx cypress run 

## Stack
##### Frontend: React.js, MUI, Tailwind, Axios, Typescript 
##### Backend (Primary): Express.js
##### Database: Postgres
