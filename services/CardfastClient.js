let restify = require('restify-clients');

module.exports = (app) => {

    class CardfastClient {

        constructor(){

            this.client = restify.createJsonClient('http://localhost:3001');
        }

        autoriza(cartao){

            return new Promise((reject, resolve) => {
                client.post(('/cartao/autoriza', cartao, (err, req, res, obj) => {

                    console.log(obj);

                    if(err){
                        reject(err);
                    } else {

                        if(obj.status != "AUTORIZADO"){
                            reject({msg: obj.status});
                        } else {
                            resolve();
                        }
                    }
                }));
            });
        }
    }
}