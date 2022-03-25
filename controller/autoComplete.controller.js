
const env = require("../config/env.config")
const autoCompleteRepository = require('../repository/autoComplete.repository');
const { result } = require("../func/misc");
const { success, error } = result;

module.exports = {

    getIndex: async (req, res, next) => { 

        try{

            const { limit, keyword } = req.query

            if(keyword.length!==0){
                if(keyword.length<2 || keyword.length>7) throw error.badRequest("검색글자는 2~7글자입니다.")
            }
            
            if(isNaN(Number(limit))) throw error.badRequest("limit은 숫자여야합니다") 

            let {dataList} = await autoCompleteRepository.getIndex(limit, keyword)

            next(success.ok({dataList}));

        } catch(e){

            next(e)

        }
    
     },

     putSearchCount: async (req, res, next) => { 

        try{

            const { keyword } = req.body

            if(keyword.length!==0){
                if(keyword.length<2 || keyword.length>7) throw error.badRequest("검색글자는 2~7글자입니다.")
            }
 
            await autoCompleteRepository.putSearchCount( keyword )

            next(success.ok({}));

        } catch(e){

            next(e)

        }
    
     },

     putsatisfactionCount: async (req, res, next) => { 

        try{

            const { keyword } = req.body

            if(keyword.length!==0){
                if(keyword.length<2 || keyword.length>7) throw error.badRequest("검색글자는 2~7글자입니다.")
            }
 
            await autoCompleteRepository.putsatisfactionCount( keyword )

            next(success.ok({}));
            

        } catch(e){

            next(e)

        }
    
     },

     putForceWeight: async (req, res, next) => { 

        try{

            const { weight, keyword } = req.body

            if(keyword.length!==0){
                if(keyword.length<2 || keyword.length>7) throw error.badRequest("검색글자는 2~7글자입니다.")
            }

            if(isNaN(Number(weight))) throw error.badRequest("weight은 숫자여야합니다") 
 
            await autoCompleteRepository.putForceWeight( weight, keyword )

            next(success.ok({}));
            
        } catch(e){

            next(e)

        }
    
     },

}