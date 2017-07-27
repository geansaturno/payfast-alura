module.exports = app => {

    return class Pagamento {

        constructor(){
            this.connection = app.persistencia.connectionFactory();
        }

        promiseSqlFactory(...queryArgs){
            return new Promise((resolve, reject) => {
                this.connection.query(...queryArgs, (erro, result) => {
                    if(erro){
                        reject(erro);
                    }
                    resolve(result);
                });
            });
        }

        confirm(id){
            return this.promiseSqlFactory('UPDATE pagamentos SET status = \"CONFIRMADO\" where id = ?', id);
        }

        cancel(id) {
            return this.promiseSqlFactory('UPDATE pagamentos SET status = \"CANCELADO\" where id = ?', id);
        }

        add(pagamento) {
            return this.promiseSqlFactory('INSERT INTO pagamentos SET ?', pagamento);
        }

        list() {
            return this.promiseSqlFactory('select * from pagamentos');
        }

        get(id) {
            return this.promiseSqlFactory("select * from pagamentos where id = ?",[id]);
        }
    }
}