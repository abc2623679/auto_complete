const { connectToDB } = require('../db/db');
const client = require('../db/db');

exports.dbConnection = async() => {

    const client = await connectToDB();
    const collection = await client.db().collection('auto_complete');

    return {client,collection}
  }

exports.db= async()=>{
    return await client.connectToDB()
}