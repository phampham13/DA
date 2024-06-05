import 'dotenv/config'

export const env = {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGO_DB: process.env.MONGO_DB,
    DATABASE_NAME: process.env.DATABASE_NAME,
    APP_HOST: process.env.APP_HOST,
    APP_PORT: process.env.APP_PORT,
    AUTHOR: process.env.AUTHOR,
    SECRET_KEY: process.env.SECRET_KEY,
    RSECRET_KEY: process.env.RSECRET_KEY
}