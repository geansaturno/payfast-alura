let mysql = require("mysql");


function createDbConnection(){

    let dbcofig = {
        host: "localhost",
        user: "root",
        password: "Cronos1248*",
        database: "payfast"
    }

    return mysql.createConnection(dbcofig);
}

module.exports = () => createDbConnection;

