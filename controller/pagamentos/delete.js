module.exports = app => {
    var pagamentoDao = new app.persistencia.pagamentoDao();

    app.delete('/pagamento/:id', (req, res) => {

        let id = req.params.id;

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
            });

    });
}