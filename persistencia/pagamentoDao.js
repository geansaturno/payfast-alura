module.exports = app => {

    return class Pagamento {

        constructor(){
            this.connection = app.persistencia.connectionFactory();
        }

        add(pagamento) {
            return new Promise((resolve, reject) => {
                this.connection.query('INSERT INTO pagamentos SET ?', pagamento, (error, result)=> {
                    if(error){
                        reject(error);
                    }
                    resolve(result);
                });
            });
        }

        list() {
            return new Promise((resolve, reject) => {
                this.connection.query('select * from pagamentos', (error, result) => {
                    if(error){
                        reject(error);
                    }
                    resovle(result);
                });
            });
        }

        get(id) {
            return new Promise((resolve, reject) => {
                this.connection.query("select * from pagamentos where id = ?",[id], (error, result) => {
                    if(error) {
                        reject(error);
                    }
                    resovle(result);
                });
            });
        }
    }
}