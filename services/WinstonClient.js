let fs = require('fs');
let winston = require('winston');

module.exports = (app) => {
    return class WinstonClient {
        constructor(path = 'logs/'){

            if(!path.endsWith('/')) {
                path += '/';
            }

            if(!fs.existsSync(path)) {
                fs.mkdirSync(path)
            }

            let logger = new winston.Logger({
                transports: [
                    new winston.transports.File({
                        name: "info-log",
                        level: "info",
                        filename: "logs/info-log.log"
                    }),
                    new winston.transports.File({
                        name: "error-log",
                        level: "error",
                        filename: "logs/error-log.log"
                    })
                ]
            });

            return logger;
        }
    }
}