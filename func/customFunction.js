const { connectToDB } = require('../db/db');
const client = require('../db/db');

exports.dbConnection = async() => {

    const client = await connectToDB();
    const collection = await client.db().collection('testdb');

    return {client,collection}
  }

exports.db= async()=>{
    return await client.connectToDB()
}

exports.regex = async(keyword,type)=>{
  
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

  if(type===1) return value2
  else return value2 + "$"

}