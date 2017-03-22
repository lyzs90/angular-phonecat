/**
 * isAuthenticated
 */

const jwt = require('express-jwt');

const authCheck = jwt({
  secret: 'Ffmhrlssqq8b2g7_lEY3RydZ-XaWhCT0dSx6Xz1lNgs1wDdtMFcQj7M-bF51vfQ4',
  audience: 'nt6YmK4w8KNLEcBXiNmIM07xnOpc8bVf'
});

module.exports = authCheck;