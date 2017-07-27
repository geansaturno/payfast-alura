// jshint esversion:6
let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');

module.exports = () => {
    let app = express();

    app.use(bodyParser.json({extended: true}));
    app.use(expressValidator());

    consign()
        .include('persistencia')
        .then('validators')
        .then('controller')
        .into(app);

    return app;
};
