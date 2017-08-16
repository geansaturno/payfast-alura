let soap = require('soap');

module.exports = () => {
    return class CorreioClient {

        constructor(){
            this.correioSoap = soap.createClientAsync(url);
            return this.correioSoap;
        }

        CalcPrecoPrazo(cepOrigen, cepDestino){

        }
    }
}