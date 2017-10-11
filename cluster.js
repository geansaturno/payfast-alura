let cluster = require('cluster');
let os = require('os');

if(cluster.isMaster) {
    os.cpus().forEach(() => {
        cluster.fork();
    });

    cluster.on('listening', worker => {
        console.log(`Server rodando na tread ${worker.process.pid}`);
    });

    cluster.on('disconnect', worker => {
        console.log(`Disconectado na tread ${worker.process.pid}`);
    })

    cluster.on('exit', () => {
        console.log('Iniciando novo server');
        cluster.fork();
    })

} else {
    require('./index.js');
}