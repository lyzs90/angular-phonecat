/**
 * isAuthenticated
 */

const jwt = require('express-jwt');

const authCheck = jwt({
  secret: new Buffer('ZQiOCG1pkyjraznpWmnaDDNWis1CHvNJMiFTfBcePI4bnbkMhY4SXDZde6BOOp7f', 'base64'),
  audience: 'nt6YmK4w8KNLEcBXiNmIM07xnOpc8bVf'
});

module.exports = authCheck;