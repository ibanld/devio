const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.MONGO_DB_URI

// conexao com o banco de dados
const connect = mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })

const dbConnect = async () => {
    try {
        const connection = await connect
        if (connection) {
            console.log('Connect with Database via Mongoose')
        }
    } catch (err) {
        console.error(err)
    }
}

module.exports = { connect, dbConnect }