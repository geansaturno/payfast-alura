let fs = require('fs');

module.exports = app => {
    app.post('/image', (req, res) => {

        let date = new Date();
        let filename = req.headers.filename;
        let extension = false;

        console.log(filename);

        if(filename) {
            extension = filename.substring(filename.indexOf('.'), filename.lenght);
            filename = `${date.getDay()}-${date.getMonth() + 1}-${date.getYear()}-${date.getMilliseconds()}${extension}`;
    
            //res.send(filename);
            req.pipe(fs.createWriteStream(`files/uploads/${filename}`))
            .on('finish', algo => {
                console.log(algo);
                res.send('Arquivo escrito');
            })
            .on('error', error => {
                console.log(error);
                if(code == 'ENOT') {
                    fs.mkdir();
                }
            })
        } else {
            res.send('Nome do arquivo não fornecido');
        }
    });
}