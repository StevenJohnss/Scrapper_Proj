
const axios = require('axios');
const clean = require('./Statistics_cleaning');
const start = async(url)=>{


    // get social_links data
    const  last_user_reports={status:false,report:{}}  
     
    try{    
        console.log("before scrapping bee")
      await  axios.get('https://app.scrapingbee.com/api/v1', {
            params: {
                'api_key': 'A token for each user',
                 'url': url,
                 'wait': '100', 
    }
}).then( async  (response)=> {
   console.log("after scrapping bee")
   console.log(typeof(response.data))
    htm_js_page= response.data
    stat_obj=await clean(htm_js_page);
    last_user_reports.report =stat_obj.data[stat_obj.data.length -1]
    last_user_reports.status=true
    // newobj=  my_obj[obj.index]
    console.log("done =", last_user_reports)
   
})
    } catch(e){console.log(e);
        
        console.log("error =",last_user_reports)
       
    }
    
    return  last_user_reports 




}


// r= async()=>{ res= await start("https://downdetector.com/status/gmail/"); console.log(res)}
// r()
module.exports.last_report=start