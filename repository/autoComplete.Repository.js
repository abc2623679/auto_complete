const { dbConnection } = require("../func/customFunction")
const { result } = require("../func/misc");
const { success, error } = result;

module.exports={

    getIndex : async (limit, keyword) => {

      const collection = await dbConnection();

        try {

                keyword=keyword.split("")

                let value1 =''
                let value2 ='^'

                for(let i = 0 ; i<keyword.length;i++){

                  const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi //특수문자확인

                  if(reg.test(keyword[i])){                
                      let result = '\\'
                      result = result+keyword[i]
                      keyword[i] = keyword[i].replace(reg,result);

                      value2 +=  value1.concat(keyword[i])
                    
                  }else{

                      value2+=  value1.concat(keyword[i])

                  }

                }

                  dataList = await collection.collection.find({keyword:{$regex: new RegExp(value2) }}).sort({"weight":-1}).limit(Number(limit)).toArray()  


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

            keyword =keyword.trim()

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

    putForceWeight: async ( weight, keyword ) => {

      const collection = await dbConnection()

      try {

        await collection.collection.updateOne({keyword:keyword},{$set:{weight:weight,force:true}})
  
      } catch(e) {

        throw e;

      }finally {

        collection.client.close();

      }
    }, 

    checkExist: async (  keyword ) => {

      const collection = await dbConnection();

      try {
      
        let result = await collection.collection.find({keyword:keyword},{force:1}).toArray()
        
        return result[0].force

      } catch(e) {

        throw e;

      }finally {

        collection.client.close();

      }
    }, 

    putForce : async ( keyword ) => {

      const collection = await dbConnection();

      try {

        await collection.collection.updateOne({keyword:keyword},{$set:{force:false}})
  
      } catch(e) {

        throw e;

      }finally {

        collection.client.close();

      }
    }, 

}