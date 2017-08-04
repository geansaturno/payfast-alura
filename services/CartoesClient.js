var restify = require('restify-clients');

module.exports  = (app) => {
    class CardFastClient {

        cosntructor(){

        this.client = restify.createJsonClient('http://localhost:3001');


        }

    }
}


// Creates a JSON client
var client = restify.createJsonClient({
    url: 'http://localhost:3001'
});


client.post('/cartoes/autoriza', (err, req, res, obj) => {
    console.log(obj);
})