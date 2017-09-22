let memcached = require('memcached');

module.exports = app => {
    return class MemCachedClient {

        constructor() {
            this._memcached = new memcached('localhost:11211', {
                retries: 10,
                retry: 10000,
                remove: true
            });
        }

        set(key, value) {
            return new Promise((resolve, reject) => {
                this._memcached.set(key, value, 200, (err) => {
                    if (err) {
                        reject(err);
                        console.log('Erro no memcache', err);
                    }
                    console.log(`Pagamento ${key} inserido`);
                    resolve();
                });
            })
        }

        get(key) {
            return new Promise((resolve, reject) => {
                this._memcached.get(key, (err, result) => {
                    if (err || !result) {
                        reject(`Miss - ${key}`)
                        console.log(`Miss - ${key}`);
                    } else {
                        resolve(result);
                        console.log(`Hit ${JSON.stringify(result)}`);
                    }
                });
            });
        }
    }
}
