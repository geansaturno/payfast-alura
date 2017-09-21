module.exports = app => {
    return new app.services.MemCachedClient();
}