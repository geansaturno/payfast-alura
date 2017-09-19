module.exports = app => {
    app.get('/pagamento/:id', (req, res) => {

        var pagamentoDao = new app.persistencia.pagamentoDao();

        pagamentoDao.get(req.params.id)
        .then(result => {
            console.log(result);
            res.send(result);
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        })
    });
}