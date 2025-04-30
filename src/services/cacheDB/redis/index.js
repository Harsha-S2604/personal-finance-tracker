const redis = require("redis")

const redisService = {
    redisClient: null,

    init: async () => {
        redisService.redisClient = redis.createClient()
        redisService.redisClient.on('error', err => console.log('Redis Client Error', err));
        await redisService.redisClient.connect()
        return redisService
    },

    hGetAll: async (key) => {
        const data = await redisService.redisClient.hGetAll(key)
        return data
    },

    set: async (key, value) => {
        await redisService.redisClient.set(key, value)
        return true
    },

    hSet: async (key, value) => {
        await redisService.redisClient.hSet(key, value)
        return true
    },

    delete: async (keys) => {
        await redisService.redisClient.del(keys)
        return true
    }
}

module.exports = redisService