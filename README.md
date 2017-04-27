# Phone Catalog App

This app is based off the Phone Catalog app from the [AngularJS Tutorial](https://docs.angularjs.org/tutorial).

<img src="https://s22.postimg.org/du24od2vl/phone-catalog.png" width="800">

## Features
- A separate [Sails](http://sailsjs.com/) backend
- Token based authentication using [Auth0](https://auth0.com/)
- [Spinner](https://github.com/Chevtek/angular-spinners) during initial data fetch
- [Infinite scrolling](http://sroze.github.io/ngInfiniteScroll/index.html)
- State based routing using [ui-router](https://ui-router.github.io/) & HTML5 History API
- Shopping Cart
- [Checkout](https://stripe.com/checkout)
- [Charging](https://stripe.com/docs/charges) (coming soon!)

## Getting Started (Development)
- Clone the repo `git clone https://github.com/lyzs90/angular-phonecat.git`
- Navigate to the root directory `cd angular-phonecat`
- Run the app `npm run dev`

## Getting Started (Production)
- Clone the repo `git clone https://github.com/lyzs90/angular-phonecat.git`
- Navigate to the root directory `cd angular-phonecat`
- Run the app `npm start`

## Unit Tests
- [Karma](https://karma-runner.github.io/1.0/index.html) (Test Runner), [Mocha](https://mochajs.org/) (Test Framework), [Chai](http://chaijs.com/) (Assertion Library), [Sinon](http://sinonjs.org/) (Spies, stubs & mocks) are used for the frontend `cd frontend && npm test`

## E2E Tests
- End-to-end tesing is handled by [Protactor](https://github.com/angular/protractor) and [Jasmine](https://jasmine.github.io/)
- Install Protractor globally `npm install -g protractor`
- First start the application from root directory `npm start` then `npm run protractor`