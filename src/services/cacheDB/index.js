const config = require("../../config")

const cacheDBs = {
    "redis": require("./redis")
}

const cacheDBService = {
    cacheDB: null,
    init: async () => {
        const dbService = cacheDBs[config.cacheDB]
        if (!dbService) {
            console.error("[Cache-DB init]:: No such cache DB present")
            return false
        }

        cacheDBService.cacheDB = await dbService.init()
        if (!cacheDBService.cacheDB) {
            console.error("[Cache-DB init]:: Failed to initialize the db")
            return false
        }

        return true
    },

    set: async (key, value) => {
        if (!cacheDBService.cacheDB) {
            console.error("[Cache-DB set]:: no db instance")
            return false
        }

        await cacheDBService.cacheDB.set(key, value)

        return true
    },

    hSet: async (key, value) => {
        if (!cacheDBService.cacheDB) {
            console.error("[Cache-DB hSet]:: no db instance")
            return false
        }

        await cacheDBService.cacheDB.hSet(key, value)

        return true
    },

    hGetAll: async (key = '') => {
        if (!key) {
            console.error("[Cache-DB hGetAll]:: Please provide the key")
            return false
        }

        const data = await cacheDBService.cacheDB.hGetAll(key)
        return data
    },

    delete: async (keys = []) => {
        if (!keys || !keys.length) {
            console.error("[Cache-DB delete]:: Please provide the keys")
            return false
        }

        await cacheDBService.cacheDB.delete(keys)
    }
}

module.exports = cacheDBService