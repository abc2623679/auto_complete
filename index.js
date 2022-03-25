const envConfig = require("./config/env.config.js");
const { connectToDB } = require('./db/db');

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("./cron/cron")
const { response, notFound } = require("./middleware/result.middleware");

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  exposedHeaders: "Authorization",
};

app.use(cors(corsOptions));

app.use("/autoComplete",require("./route/autoComplete.route"))

// app.get('/', async function(req, res) {
    

    //  const collection = await client.db().collection('auto_complete');
    //  const data = await collection.find().sort({"categort":1}).limit(Number(limit)).skip(1).toArray()
    //  if(!data) res.send({ test: 'test '});

  //   const client = await connectToDB();
  //   const collection = await client.db().collection('auto_complete');
  //   const data = await collection.find().sort({"categort":1}).limit(1).skip(1).toArray();

  //   client.close();

  //   res.send(data)

  // });

//   app.get('/insert', async function(req, res) {

//     const {
//         category, keyword, weight, shard, searchCount, satisfactionCount, force
//     } = req.body
    
//     const client = await connectToDB();
//     const collection = await client.db().collection('auto_complete');
//     const data = await collection.

//     res.send({});

//   });


app.use(express.static("public"));

app.use(notFound);
app.use(response);
app.use(express.json())

cron.putweightAtTime();

app.listen(envConfig.PORT, () => {
  console.log("Express server listening on port : ", envConfig.PORT);
});

