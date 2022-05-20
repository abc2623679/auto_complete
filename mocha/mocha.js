
const expect = require('chai').expect;
const { json } = require('body-parser');
const moment = require('moment')
const request = require('request');
const { add } = require('winston');
const { dbConnection,regex } = require("../func/customFunction")
const {deleteCollection,addWords}= require("./function")



describe('API Endpoint Test', async() => {

    let jsonData ={
        category:"테스트용고리",
        keyword:"테스트워드"
    }

    await deleteCollection(jsonData,"테스터 시작전에 데이터전체삭제") 

    await addWords(jsonData,"단어추가테스트에 대한 예시데이터 추가")
    
        describe('단어가 제대로 들어갔는지 체크', function () {
            it('검색된 단어가 제대로 insert됐는지 확인', function (done) {

                const getURL =`http://localhost:3003/autoComplete?keyword=${encodeURI(jsonData.keyword)}&limit=1&category=${encodeURI(jsonData.category)}`
                request.get({
                    url:getURL,
                    }, function (err, res, body) {
                        expect(JSON.parse(body).data.dataList[0].category).to.equal(jsonData.category)
                        expect(JSON.parse(body).data.dataList[0].keyword).to.equal(jsonData.keyword)
                        expect(JSON.parse(body).data.dataList[0].weight).to.equal(0)
                        expect(JSON.parse(body).data.dataList[0].shard).to.equal(moment().hours())
                        expect(JSON.parse(body).data.dataList[0].searchCount).to.equal(0)
                        expect(JSON.parse(body).data.dataList[0].satisfactionCount).to.equal(0)
                        expect(JSON.parse(body).data.dataList[0].force).to.equal(false)         
                        done()           
                        })

                  })
                })

    await deleteCollection(jsonData,"자동완성단어에 대한 테스트를 마친후에 데이터삭제") 

    await addWords(jsonData,"클릭수 증가 테스트를 위한 예시데이터 추가")

        describe(`클릭수 증가 체크`, function () {
    
            it(`${jsonData.keyword}의 searchCount증가 api statusCode가 200인지 확인`, function (done) {
                const putURL =`http://localhost:3003/autoComplete/searchCount`
                request({
                    method:'PUT',
                    uri:putURL,
                    'content-type':'application/json',
                    json:jsonData
                    }, function (err, res, body ) {
                        expect(res.statusCode).to.equal(200)
                        done()
                    })
                })
            
            })

        describe('클릭수가 1이됐는지 확인', function () {
            it(`만약 insert한 ${jsonData.keyword}의 클릭스가 1이 아닐경우 에러`, function (done) {

                const getURL =`http://localhost:3003/autoComplete?keyword=${encodeURI(jsonData.keyword)}&limit=1&category=${encodeURI(jsonData.category)}`
                request.get({
                    url:getURL,
                    }, function (err, res, body) {
                        expect(JSON.parse(body).data.dataList[0].searchCount).to.equal(1)    
                        done()           
                        })

                    })
                })

        
        await deleteCollection(jsonData,"클릭수증가에 대한 테스트를 마치고 예시데이터 삭제")

        await addWords(jsonData,"만족수 증가 테스트를 위한 예시데이터 추가")

        describe(`만족수 증가 체크`, function () {

            it(`${jsonData.keyword}의 만족수증가 api statusCode가 200인지 확인`, function (done) {
                const putURL =`http://localhost:3003/autoComplete/satisfactionCount`
                request({
                    method:'PUT',
                    uri:putURL,
                    'content-type':'application/json',
                    json:jsonData
                    }, function (err, res, body ) {
                        expect(res.statusCode).to.equal(200)
                        done()
                    })
                })
            
            })
        
        describe('만족수가 1이됐는지 확인', function () {
            it(`만약 insert한 ${jsonData.keyword}의 satisfactionCount가 1이 아닐경우 에러`, function (done) {

                const getURL =`http://localhost:3003/autoComplete?keyword=${encodeURI(jsonData.keyword)}&limit=1&category=${encodeURI(jsonData.category)}`
                request.get({
                    url:getURL,
                    }, function (err, res, body) {
                        expect(JSON.parse(body).data.dataList[0].satisfactionCount).to.equal(1)    
                        done()           
                        })

                    })
                })
        
        await deleteCollection(jsonData,"만족수 증가 테스트를 마친후에 예시데이터삭제")

        await addWords(jsonData,"가중치강제변경 테스트를 위한 예시 데이터추가")

        jsonData ={
            category:"테스트용고리",
            keyword:"테스트워드",
            weight:50
        }
        
        describe('가중치(force+weight)강제변경', function () {

            console.log("TTTTTT")
            it(`${jsonData.keyword}의 weight를 ${jsonData.weight}로 변경`, function (done) {

                const putURL =`http://localhost:3003/autoComplete/forceWeight`

                console.log("TTTTTT")
                request({
                    method:'PUT',
                    uri:putURL,
                    'content-type':'application/json',
                    json:jsonData
                    }, function (err, res, body ) {
                        expect(res.statusCode).to.equal(200)
                        done()
                    })
                })
            })

        describe(`가중치변경 체크`, function () {

            it(`${jsonData.keyword}의 weight가 ${weight}로 변경 + force = ${force} 인지 확인`, function (done) {
                const getURL =`http://localhost:3003/autoComplete?keyword=${encodeURI(jsonData.keyword)}&limit=1&category=${encodeURI(jsonData.category)}`
                request.get({
                    url:getURL,
                    }, function (err, res, body) {
                        expect(JSON.parse(body).data.dataList[0].weight).to.equal(weight)    
                        expect(JSON.parse(body).data.dataList[0].force).to.equal(force)    
                        done()           
                        })

                    })
                })

            await deleteCollection(jsonData,"가중치강제변경 테스트를 마친후에 예시데이터삭제")
           
        describe(`force를 ${force}로 강제변경`, function () {
                it(`${jsonData.keyword}의 force=${force}로변경`, function (done) {
    
                    const putURL =`http://localhost:3003/autoComplete/force`
                    request({
                        method:'PUT',
                        uri:putURL,
                        'content-type':'application/json',
                        json:jsonData
                        }, function (err, res, body ) {
                            expect(res.statusCode).to.equal(200)
                            done()
                        })
                    })
                })

       

         describe(`force변경 체크`, function () {

            it(`${jsonData.keyword}의  force = ${force} 인지 확인`, function (done) {
                const getURL =`http://localhost:3003/autoComplete?keyword=${encodeURI(jsonData.keyword)}&limit=1&category=${encodeURI(jsonData.category)}`
                request.get({
                    url:getURL,
                    }, function (err, res, body) {
                        expect(JSON.parse(body).data.dataList[0].force).to.equal(force)    
                        done()           
                        })

                    })
                })

        describe(`${moment().hours()}시에 마다 weight체크`, function () {

            it(`weight의 값이 만족수*0.5 + 클릭수*0.5가 되는지 확인`,async function (done) {

                const collection = await dbConnection();

                await collection.collection.updateOne({category:category,keyword:keyword},{$inc:{satisfactionCount:40}})
                await collection.collection.updateOne({category:category,keyword:keyword},{$inc:{searchCount:45}})
        
                await collection.client.close();

                const getURL =`http://localhost:3003/autoComplete?keyword=${encodeURI(jsonData.keyword)}&limit=1&category=${encodeURI(jsonData.category)}`
                request.get({
                    url:getURL,
                    }, function (err, res, body) {
                        expect(JSON.parse(body).data.dataList[0].weight).to.equal(42.5)    
                        done()           
                        })

                    })
                })

        describe('테스트데이터삭제', function () {
            it(`테스트데이터가 지워졌는데 확인`, async function () {

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
})