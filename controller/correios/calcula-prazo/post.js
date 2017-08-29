module.exports = app => {

    let correiosClient = new app.services.CorreiosClient();

    app.post('/correios/calcula-prazo', (req, res) => {

        let origem = req.body.origem;
        let destino = req.body.destino;

        correios = new app.services.CorreiosClient();
        correios.calculaPrazo(origem, destino)
        .then(result => {
            res.json(result);
        })
        .catch(erro => {
            console.log(erro);
            res.sendStatus(500);
        })
    });
}