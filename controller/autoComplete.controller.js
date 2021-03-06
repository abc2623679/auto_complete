
const env = require("../config/env.config")
const autoCompleteRepository = require('../repository/autoComplete.repository');
const { result } = require("../func/misc");
const { success, error } = result;
const moment = require('moment')

module.exports = {

    getIndex: async (req, res, next) => { 

        try{

            const { limit, keyword, category } = req.query

            if(keyword.length!==0){
                if(keyword.length<2 || keyword.length>7) throw error.badRequest("검색글자는 2~7글자입니다.")
            }
            
            if(isNaN(Number(limit))) throw error.badRequest("limit은 숫자여야합니다") 

            let {dataList} = await autoCompleteRepository.getIndex(limit, keyword, category)

            next(success.ok({dataList}));

        } catch(e){

            next(e)

        }
    
     },

     postWord: async (req, res, next) => { 

        try{

            const { category,keyword } = req.body
      
            let currentTime = moment().hours()

            await autoCompleteRepository.postWord(category,keyword,currentTime)

            next(success.ok({}));

        } catch(e){

            next(e)

        }
    
     },


     putSearchCount: async (req, res, next) => { 

        try{

            const { keyword,category } = req.body

            let result = await autoCompleteRepository.checkExist( keyword, category )

            if(result.length===0) throw error.badRequest("존재하지않는 키워드입니다.")

            await autoCompleteRepository.putSearchCount( keyword, category )

            next(success.ok({}));

        } catch(e){

            next(e)

        }
    
     },

     putsatisfactionCount: async (req, res, next) => { 

        try{

            const { keyword, category } = req.body

            let result = await autoCompleteRepository.checkExist( keyword, category )

            if(result.length===0) throw error.badRequest("존재하지않는 키워드입니다.")
            
            await autoCompleteRepository.putsatisfactionCount( keyword, category )

            next(success.ok({}));
            

        } catch(e){

            next(e)

        }
    
     },

     putForceWeight: async (req, res, next) => { 

        try{

            const { weight, keyword, category } = req.body

            if(isNaN(Number(weight))) throw error.badRequest("weight은 숫자여야합니다") 

            let result = await autoCompleteRepository.checkExist( keyword, category )

            if(result.length===0) throw error.badRequest("존재하지않는 키워드입니다.")
 
            await autoCompleteRepository.putForceWeight( weight, keyword, category )

            next(success.ok({}));
            
        } catch(e){

            next(e)

        }
    
     },

     putForce : async (req, res, next) => { 

        try{

            const { keyword, category } = req.body

            let result = await autoCompleteRepository.checkExist( keyword, category )

            if(result.length===0) throw error.badRequest("존재하지않는 키워드입니다.")
            else if(result[0].force===false) throw error.badRequest("가중치변경이 안된 상태입니다.")
 
            await autoCompleteRepository.putForce( keyword, category )

            next(success.ok({}));
            
        } catch(e){

            next(e)

        }
    
     },

}