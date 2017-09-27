module.exports = app => {
    app.get('/pagamento/:id', (req, res) => {

        var pagamentoDao = new app.persistencia.pagamentoDao();

        let memcached = app.loaders.memcached;

        memcached.get(`pagamento-${req.params.id}`)
        .then(result => {
            app.loaders.logger.info(`Get ${req.params.id} from cache`);
            res.send(result);            
        })
        .catch(()=> {
            pagamentoDao.get(req.params.id)
            .then(result => {
            app.loaders.logger.info(`Get ${req.params.id} from db`);
                res.send(result);
            })
            .catch(error => {
                console.log(error);
                res.send(error);
            })
        })
    });
}