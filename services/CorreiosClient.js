let soap = require('soap');

module.exports = () => {
    return class CorreioClient {

        constructor() {
            this._url = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl"
        }

        calculaPrazo(){
            return new Promise((resolve, reject) => {
                soap.createClientAsync(this._url)
                .then(correioClient => {
                    this.correioClient = cli;
                });
            });
        }
    }
}