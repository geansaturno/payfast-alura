// jshint esversion:6
let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');

module.exports = () => {
    let app = express();

    app.set('port', 3000);
    app.set('host', 'localhost');

    app.use(bodyParser.json({extended: true}));
    app.use(expressValidator());

    consign()
        .include('persistencia')
        .then('services')
        .then('validators')
        .then('controller')
        .then('helpers')
        .into(app);

    new app.services.CorreiosClient().then((correiosCli)=>{
        console.log(correiosCli.toString());
    })

    return app;
};
