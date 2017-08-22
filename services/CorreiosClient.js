let soap = require('soap');

module.exports = () => {
    return class CorreioClient {

        constructor() {
            this._url = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl"
        }

        calculaPrazo(origem, destino){
            return new Promise((resolve, reject) => {
                soap.createClientAsync(this._url)
                .then(correioClient => {
                    
                    origem.replace('-', '');
                    destino.replace('-', '');

                    let dados = {
                        "nCdServico": "40010",
                        "sCepOrigem": origem,
                        "sCepDestino": destino
                    }

                    correioClient.CalcPrazo(dados, (erro, result) => {
                        if(erro){
                            reject(erro)
                        } else {
                            // console.log(result.CalcPrazoResult.Servicos);
                            resolve(result.CalcPrazoResult.Servicos.cServico[0]);
                        }
                    });
                })
                .catch(error => {
                    reject(error)
                });
            });
        }
    }
}