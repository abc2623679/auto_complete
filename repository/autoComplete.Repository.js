const { dbConnection } = require("../func/customFunction")

module.exports={

    getIndex : async (limit, keyword) => {

      const collection = await dbConnection();

        try {

          const dataList = await collection.collection.find({keyword:{$regex: new RegExp('^'+keyword) }}).sort({"weight":-1}).limit(Number(limit)).toArray()

          return {dataList}
    
        } catch(e) {

          throw e;

        }finally {

          collection.client.close();

        }
      },

    postWord: async (category,keyword,currentTime) => {

      const collection = await dbConnection();

        try {

          let result = await collection.collection.find({keyword:keyword},{keyword:1}).toArray()

          if(result.length===0){

            await collection.collection.insertOne({category: category, keyword:keyword, weight:0, shard:currentTime, searchCount:0,satisfactionCount:0,force:false})

          }else{

            await collection.collection.updateOne({keyword:keyword},{$inc:{searchCount:1}})

          }
          
        } catch(e) {

          throw e;

        }finally {

          collection.client.close();

        }
      },

    putSearchCount: async ( keyword ) => {

      const collection = await dbConnection();

      try {

        await collection.collection.updateOne({keyword:keyword},{$inc:{searchCount:1}})
  
      } catch(e) {

        throw e;

      }finally {

        collection.client.close();

      }
    },

    putsatisfactionCount: async ( keyword ) => {

      const collection = await dbConnection();

      try {

        await collection.collection.updateOne({keyword:keyword},{$inc:{satisfactionCount:1}})
  
      } catch(e) {

        throw e;

      }finally {

        collection.client.close();

      }
    }, 

    putweightAtTime: async ( ) => {

      const collection = await dbConnection();

      try {

        const currentHour = new Date().getHours()

       const result = await collection.collection.find().toArray()

       if(result.length!=0){

        await collection.collection.update({shard:currentHour},
          [
            {
              $addFields: {
                weight: {
                  $trunc: [
                    {
                      "$sum": [
                        {
                          "$multiply": [
                            "$searchCount",
                            0.5
                          ]
                        },
                        {
                          "$multiply": [
                            "$satisfactionCount",
                            0.5
                          ]
                        }
                      ]
                    },
                    0
                  ]
                }
              }
            }
          ],
          {
            multi: true
          })

       }

      } catch(e) {

        throw e;

      }finally {

        collection.client.close();

      }
    }, 

    putForceWeight: async ( weight, keyword ) => {

      const collection = await dbConnection();

      try {

        await collection.collection.updateOne({keyword:keyword},{$set:{weight:weight,force:true}})
  
      } catch(e) {

        throw e;

      }finally {

        collection.client.close();

      }
    }, 

}