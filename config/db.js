const mongoose = require('mongoose')
require('dotenv').config()

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connect.connection.host}, Database: ${connect.connection.name}`);
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = dbConnect;