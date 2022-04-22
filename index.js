const envConfig = require("./config/env.config.js");
const { connectToDB } = require('./db/db');
const logger = require("./func/logger");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("./cron/cron")
require("moment-timezone");
const moment = require('moment')
moment.tz.setDefault("Asia/Seoul");
const { response, notFound } = require("./middleware/result.middleware");

const morgan = require("morgan");

const app = express();

app.use(morgan(envConfig.LOG.morgan, { stream: logger.stream }));


morgan.token("date", (req, res, tz) => {
  return moment.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
});

morgan.token("param", (req, res) => {
  if (Object.keys(req.query).length !== 0) return `query: ${JSON.stringify(req.query)}\n`;
  else if (Object.keys(req.body).length !== 0) return `body: ${JSON.stringify(req.body)}\n`;
  else return `\n`;
});


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

