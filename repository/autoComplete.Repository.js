const { dbConnection,regex } = require("../func/customFunction")
const { result } = require("../func/misc");
const { success, error } = result;

module.exports={

    getIndex : async (limit, keyword, category) => {

      const collection = await dbConnection();

        try {
                  let value = await regex(keyword,1)

                  dataList = await collection.collection.find({category:category, keyword:{$regex: new RegExp(value) }}).sort({"weight":-1}).limit(Number(limit)).toArray()  


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

          let result = await collection.collection.find({category: category,keyword:keyword},{keyword:1}).toArray()

          if(result.length===0){

            keyword = keyword.trim()

            await collection.collection.insertOne({category: category, keyword:keyword, weight:0, shard:currentTime, searchCount:0,satisfactionCount:0,force:false})

          }else{

            await collection.collection.updateOne({category: category,keyword:keyword},{$inc:{searchCount:1}})

          }
          
        } catch(e) {

          throw e;

        }finally {

          collection.client.close();

        }
      },

    putSearchCount: async ( keyword, category ) => {

      const collection = await dbConnection();

      try {

        await collection.collection.updateOne({category:category, keyword:keyword},{$inc:{searchCount:1}})      
  
      } catch(e) {

        throw e;

      }finally {

        collection.client.close();

      }
    },

    putsatisfactionCount: async ( keyword, category ) => {

      const collection = await dbConnection();

      try {

       await collection.collection.updateOne({category:category,keyword:keyword},{$inc:{satisfactionCount:1}})

    
  
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

        await collection.collection.updateMany({shard:currentHour,force:false},
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
        )

       }

      } catch(e) {

        throw e;

      }finally {

        collection.client.close();

      }
    }, 

    putForceWeight: async ( weight, keyword, category ) => {

      const collection = await dbConnection()

      try {

        await collection.collection.updateOne({category:category, keyword:keyword},{$set:{weight:weight,force:true}})
  
      } catch(e) {

        throw e;

      }finally {

        collection.client.close();

      }
    }, 

    checkExist: async ( keyword, category ) => {

      const collection = await dbConnection();

      try {

        let value = await regex(keyword,2)
      
        let result = await collection.collection.find({category:category, keyword:{$regex: new RegExp(value)}}).toArray()

        return result

      } catch(e) {

        throw e;

      }finally {

        collection.client.close();

      }
    }, 

    putForce : async ( keyword,category ) => {

      const collection = await dbConnection();

      try {

        await collection.collection.updateOne({category:category,keyword:keyword},{$set:{force:false}})
  
      } catch(e) {

        throw e;

      }finally {

        collection.client.close();

      }
    }, 

}