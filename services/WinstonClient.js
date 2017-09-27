module.exports = (app) => {
    return class WinstonClient {
        constructor(){
            let winston = require('winston');

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