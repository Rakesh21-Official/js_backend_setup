var Pool = require('pg-pool')
require('dotenv').config()

var pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: false,
    max: 20, // set pool max size to 20
    idleTimeoutMillis: 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
    maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
})

pool.on('connect', client => {
    console.log('DB Connected')
})

pool.on('error', (err, client) => {
    console.log('Connection error', err)
})

class Postgres {
    static async getClient() {
        try {
            return await pool.connect()
        } catch (error) {
            throw error
        }
    }
    static async getResult(query) {
        try {
            const result = await pool.query(query)
            return result.rows
        } catch (error) {
            throw error
        }
    }
}

module.exports = Postgres