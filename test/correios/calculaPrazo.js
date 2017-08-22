let express = require('../config/express.js')();
let supertest = require('supertest')(express);
let testhelpers = require('./helpers');
let pagamento = require('../files/correios.json');

