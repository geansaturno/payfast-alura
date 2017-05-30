// jshint esversion:6

module.exports = app => {

    app.get('/pagamento', (req, res) => {
        console.log('Requisição recebida');
        res.send('OK');
    });

    return app;

};
