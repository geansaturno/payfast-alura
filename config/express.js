// jshint esversion:6
let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');

module.exports = () => {
    let app = express();

    app.use(bodyParser.json());

    consign()
        .include('controller')
        .into(app);

    return app;
};
