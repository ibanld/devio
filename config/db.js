const { MongoClient } = require('mongodb')
require('dotenv').config()

const URI = process.env.MONGO_DB_URI
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true })
const dbConnect = client.connect(err => {
  console.log('Connected to Database')
  client.close()
})

module.exports = dbConnect