const mongoose = require('mongoose')
const dbUri = process.env.MONGO_URI

let connection = null
const connectMongo = async () => {
    if (!connection) {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
        connection = mongoose.connection
        return connection
    }
    return connection
}

console.log(connection)

module.exports = connectMongo
