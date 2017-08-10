let restify = require('restify-clients');

module.exports = (app) => {

    return class CardfastClient {

        constructor(){
            this.client = restify.createJsonClient('http://localhost:3001');
        }

        autoriza(cartao){

            return new Promise((resolve, reject) => {
                this.client.post('/cartoes/autoriza', cartao, (err, req, res, obj) => {

                    let cartao = obj.dados_do_cartao;
                    if(err){
                        reject({cartao: {msg: "Erro na autorização do cartão", 'param': 'cartao'}, status : 400});
                    } else {

                        if(cartao.status != "AUTORIZADO"){
                            reject({'msg': cartao.status});
                        } else {
                            resolve();
                        }
                    }
                });
            });
        }
    }
}