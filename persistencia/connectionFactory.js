let mysql = require("mysql");


function createDbConnection(){

    let dbcofig = {
        host: "localhost",
        user: "root",
        password: "mysql@uol",
        database: "payfast"
    }

    return mysql.createConnection(dbcofig);
}

module.exports = () => createDbConnection;

