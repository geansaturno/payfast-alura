module.exports = app => {
    var pagamentoDao = new app.persistencia.pagamentoDao();

    app.put('/pagamento/:id', (req, res) => {

        let pagamentoDao = new app.persistencia.pagamentoDao();
        let id = req.params.id;

        pagamentoDao.confirm(id)
            .then(result => {
                pagamentoDao.get(id)
                    .then(pagamento => {
                        let resData = {
                            data: pagamento,
                            links: [
                                app.helpers.hateoasLinkFactory('pagamento', 'Criar', 'POST')
                            ],
                            msg: 'Pagamento Confirmado'
                        }
                        res.json(resData);
                    })
            })
            .catch(error => {
                console.error("Ocorreu um erro ", error);
                res.status(500).send(error);
            });
    });
}