const expect = require('chai').expect;
const moment = require('moment')
const request = require('request')
const { dbConnection } = require("../func/customFunction")


exports.deleteCollection =(jsonData,message)=> {
    describe('테스트데이터삭제', function () {
        it(`${message}`, async function () {
    
            const collection = await dbConnection();
    
            await collection.collection.deleteMany({})  
    
            await collection.client.close();
    
    
            const getURL =`http://localhost:3003/autoComplete?keyword=${encodeURI(jsonData.keyword)}&limit=1&category=${encodeURI(jsonData.category)}`
            request.get({
                url:getURL,
                }, function (err, res, body) {
                    expect(JSON.parse(body).data.dataList.length).to.equal(0)   
                         
                    })
    
                })
            })

}

exports.addWords =(jsonData,message)=>{

    describe('단어추가테스트', function () {
        it(`${message}`, function (done) {
            request.post({
                headers:{'content-type':'application/json'},
                url:"http://localhost:3003/autoComplete/keyword",
                body:jsonData,
                json:true,
                }, function (err, res, body) {
                    expect(res.statusCode).to.equal(200)
                done()
            })
        })
    })
}