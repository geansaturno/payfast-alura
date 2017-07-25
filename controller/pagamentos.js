// jshint esversion:6

module.exports = app => {

    app.get('/pagamento', (req, res) => {
        console.log('Requisição recebida');
        res.send('OK');
    });

    app.post('/pagamento', (req, res) => {
        res.send('dados recebidos');

        let pagamento = req.body;

        pagamento.status = "CRIADO";
        pagamento.data = new Date();

        let pagamentoDao = new app.persistencia.pagamentoDao();

        pagamentoDao.add(pagamento)
        .then(result => {
            res.json(pagamento);
        })
        .catch(error => {
            console.error(error);
            res.send(412);
        });


        console.log(req.body);
    });

    return app;

};
