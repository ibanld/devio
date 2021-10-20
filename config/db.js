const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.MONGO_DB_URI

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        if (connect) {
            console.log('Connect with Database via Mongoose')
        }
    } catch (err) {
        console.error(err)
    }
}

module.exports = dbConnect