module.exports = app => {
    
    let memcached = app.loaders.memcached;

    app.post('/pagamento', (req, res) => {

        let pagamento = req.body.pagamento;

        if (pagamento.forma_de_pagamento == 'cartao') {
            let cartao = req.body.cartao;

            if (cartao) {
                cardfastClient = new app.services.CardfastClient();
                cardfastClient.autoriza(cartao)
                    .then(() => {
                        registrarPagamento(pagamento, res)
                    })
                    .catch(err => {
                        let status = 500;
                        
                        if (err.status) {
                            status = err.status
                        }

                        delete err.status;
                        res.status(status).json(err);
                    });
            } else {
                res.status(403).json({ error: "Cartão não fornecido" });
            }
        } else {
            registrarPagamento(pagamento, res)
        }
    });

    function registrarPagamento(pagamento, res) {

        pagamento.status = "CRIADO";
        pagamento.data = new Date();

        let pagamentoDao = new app.persistencia.pagamentoDao();
        pagamentoDao.add(pagamento)
            .then(result => {
                // console.log("Pagamento criado", pagamento);
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

                memcached.set(`pagamento-${pagamento.id}`, pagamento);
                res.status(201).json(resData);
            })
            .catch(error => {
                console.error("Ocorreu um erro ", error);
                res.status(500).send(error);
            });
    };
}