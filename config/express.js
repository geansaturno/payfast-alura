// jshint esversion:6
let express = require('express');
let consign = require('consign');

module.exports = () => {
    let app = express();

    consign()
    .include('controller')
    .into(app);

    return app;
};
