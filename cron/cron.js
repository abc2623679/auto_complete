
const cron = require('node-cron');
let autoCompleteRepository = require('../repository/autoComplete.Repository');
    
     exports.putweightAtTime =()=> {

         cron.schedule('0 */1 * * *', function () {

            autoCompleteRepository.putweightAtTime();
            
         }
     )

 }    
