// jshint esversion:6

module.exports = app => {

    var pagamentoDao = new app.persistencia.pagamentoDao();

    app.get('/pagamento', (req, res) => {
        console.log('Requisição recebida');
        res.send('OK');
    });

    app.delete('/pagamento/:id', (req, res) => {
        
        let id  = req.params.id;

        pagamentoDao.cancel(id)
        .then(result => {

            let resData = {
                data: {},
                links: [
                    app.helpers.hateoasLinkFactory('pagamento', 'Criar', 'POST')
                ],
                msg: 'Pagamento Cancelado'
            }

            res.status(200).json(resData);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).send(erro);
        })

    });

    app.put('/pagamento/:id', (req, res) => {

        let pagamentoDao = new app.persistencia.pagamentoDao();
        let id = req.params.id;

        pagamentoDao.confirm(id)
        .then(result => {

            pagamentoDao.get(id)

            let resData = {
                data: pagamento,
                links: [
                    app.helpers.hateoasLinkFactory('pagamento', 'Criar', 'POST')
                ],
                msg: 'Pagamento Confirmado'
            }

            .then(pagamento => {
                res.json(resData);
            });

        })
        .catch(error => {
            console.error("Ocorreu um erro ", error);
            res.status(500).send(error);
        });
    })

    app.post('/pagamento', (req, res) => {
        let pagamentoDao = new app.persistencia.pagamentoDao();

        let pagamento = req.body;

        pagamento.status = "CRIADO";
        pagamento.data = new Date();

        pagamentoDao.add(pagamento)
        .then(result => {
            console.log("Pagamento criado", pagamento);
            res.location(`pagamento/${result.insertId}`);

            pagamento.id = result.insertId;

            let resData = {
                data: pagamento,
                links: [
                    app.helpers.hateoasLinkFactory(`pagamento/${pagamento.id}`, 'Confirmar', 'PUT'),
                    app.helpers.hateoasLinkFactory(`pagamento/${pagamento.id}`, 'Cancelar', 'DELETE'),
                ],
                msg: "Pagamento criado"
            }

            res.status(201).json(resData);
        })
        .catch(error => {
            console.error("Ocorreu um erro ", error);
            res.status(500).send(error);
        });
    });

    return app;
};
