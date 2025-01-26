import { createClient, type RedisClientType } from 'redis'

let redis: RedisClientType | null = null

export const initializeRedisClient = async () => {
  if (!redis) {
    redis = createClient()
    redis.on('error', (err) => {
      console.error(err)
    })
    redis.on('connect', (err) => {
      console.log('redis connected')
    })
    await redis.connect()
  }
  return redis
}
