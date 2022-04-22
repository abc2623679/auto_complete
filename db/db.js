const { MongoClient } = require('mongodb');
const envConfig = require('../config/env.config');
const testConfig = require('../config/test.config');

const connectToDB = async () => {
const client = await MongoClient.connect(testConfig.MONGO_URL);
return client;
}

module.exports = {
    connectToDB,
}
