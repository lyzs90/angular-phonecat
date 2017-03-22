# Phone Catalog App

This app is based off the Phone Catalog app from the [AngularJS Tutorial](https://docs.angularjs.org/tutorial). 

## Features
- A separate [Sails](http://sailsjs.com/) backend
- Token based authentication using [Auth0](https://auth0.com/)

## Getting Started
- Clone the repo `git clone https://github.com/lyzs90/angular-phonecat.git`
- Navigate to the root directory `cd angular-phonecat`
- Install the backend `cd backend && npm install`
- Install the frontend `cd frontend && npm install`
- Run the app `npm start`

## E2E Tests
- End-to-end tesing is handled by [Protactor](https://github.com/angular/protractor)`
- First start the application from root directory `npm start` then `npm run protractor`