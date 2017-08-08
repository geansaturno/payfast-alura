let restify = require('restify-clients');

module.exports = (app) => {

    return class CardfastClient {

        constructor(){

            this.client = restify.createJsonClient('http://localhost:3001');
        }

        autoriza(cartao){

            console.log('pedindo autorizacao');
            console.log(cartao);

            return new Promise((resolve, reject) => {
                this.client.post('/cartoes/autoriza', cartao, (err, req, res, obj) => {

                    console.log('Obijeto do cartrao', obj);

                    if(err){
                        reject(err);
                    } else {

                        if(obj.status != "AUTORIZADO"){
                            reject({msg: obj.status});
                        } else {
                            resolve();
                        }
                    }
                });
            });
        }
    }
}