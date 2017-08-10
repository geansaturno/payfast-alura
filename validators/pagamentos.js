module.exports = app => {

    app.post('/pagamento', (req, res, next) => {

        req.checkBody('pagamento.forma_de_pagamento', "Forma de pagamento não pode ser vazia").notEmpty();
        req.checkBody('pagamento.valor', "Valor não existe ou está incorreto").notEmpty().isFloat();

        let erros = req.getValidationResult()
        .then(erros => {
            errorParse(erros, res, next);
        });
    });

    app.delete('/pagamento/:id', validarId);
    app.put('/pagamento/:id', validarId);

    function validarId(req, res, next){
        req.checkParams('id', "Valor Id incorreto").isInt().notEmpty();

        let erros = req.getValidationResult().then(erros => {
            errorParse(erros, res, next);
        })
    }

    function errorParse(erros, res, next) {
        if(!erros.isEmpty()){
            // console.log('Erros de validação', erros.array());
            res.status(400).json(erros.mapped());
            return;
        }

        next();
    }
}