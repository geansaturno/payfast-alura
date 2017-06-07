// jshint esversion:6

module.exports = app => {

    app.get('/pagamento', (req, res) => {
        console.log('Requisição recebida');
        res.send('OK');
    });

    app.post('/pagamento', (req, res) => {
        res.send('dados recebidos');
        console.log(req.body);
    });

    return app;

};
