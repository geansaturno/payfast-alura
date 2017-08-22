module.exports = app => {

    let correiosClient = new app.services.CorreiosClient();

    app.post((req, res) => {

        let origem = req.body.origem;
        let destino = req.body.destino;

        correios.calcularPrazo(origem, destino)
        .then(result => {
            res.json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.sendStatus(500);
        })
    });
}