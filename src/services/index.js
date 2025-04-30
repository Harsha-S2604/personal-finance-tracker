const cacheDBService = require("./cacheDB")

const services = {
    init: async () => {
        await cacheDBService.init()
    },

    cacheDB: cacheDBService,
}

module.exports = services