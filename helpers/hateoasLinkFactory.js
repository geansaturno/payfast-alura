module.exports = app => {
    return function hateoasLinkFactory(link, rel, method) {
        return {
            href: `http://${app.get('host')}:${app.get('port')}/${link}`,
            rel: rel,
            method: method
        }
    }
}