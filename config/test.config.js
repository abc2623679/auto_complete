const testConfig = require("dotenv").config({path:".env.test"}).parsed

module.exports={
    MONGO_URL : `mongodb://${testConfig.MONGO_USER}:${testConfig.MONGO_PW}@localhost:27017/${testConfig.MONGO_DB_NAME}?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`,
         PORT : testConfig.PORT,
}