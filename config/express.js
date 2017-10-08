// jshint esversion:6
let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
let morgan = require('morgan');
let WinstonClient = require('../services/WinstonClient')();
let logger = new WinstonClient();

module.exports = () => {
    let app = express();

    app.set('port', 3000);
    app.set('host', 'localhost');

    let morganCofig = {
        stream: {
            write: function(msg) {
                logger.info(msg);
            }
        }
    };

    app.use(bodyParser.json({extended: true}));
    app.use(expressValidator());
    app.use(morgan('common', morganCofig));

    consign()
        .include('persistencia')
        .then('services')
        .then('loaders')
        .then('validators')
        .then('controller')
        .then('helpers')
        .into(app);

    return app;
};
