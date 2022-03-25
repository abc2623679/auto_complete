const { MongoClient } = require('mongodb');
const envConfig = require('../config/env.config');

const connectToDB = async () => {
const client = await MongoClient.connect(envConfig.MONGO_URL);
return client;
}

module.exports = {
    connectToDB,
}
