const axios = require('axios');

const start = async()=>{
    let my_obj=[]
   await axios.get('https://app.scrapingbee.com/api/v1', {
        params: {
            'api_key': 'A token for each user',
            'url': 'https://downdetector.com/', 
            'wait': '100',
            'extract_rules': '{"my_obj":{"selector": "body > div.container.main-container.px-3.px-md-0 > div:nth-child(3) > div.col-md-9.mt-2 > div > div","output": {"page_link":{                "selector": "div > a",                "output": "@href"            },            "company_name": "div > a > div.caption > h5","logo_src":{"selector": "div > a > div.wrapper > img",                "output": "@src"}        },"type": "list","clean": true}}', 
        } 
    }).then(async (response)=> {
        my_obj =response.data.my_obj;
        //console.log(response.data.my_obj);
        my_obj.pop() // remove the last obj since its not nedeed as it gets a button
        index=0;
        for (const obj of my_obj){
            await  axios.get('https://app.scrapingbee.com/api/v1', {
                params: {
                    'api_key': 'A token for each user',
                     'url': `https://downdetector.com${obj.page_link}`,
                     'wait': '100', 
        }
    }).then( async  (response)=> {
       console.log("geting statistics")
       console.log(typeof(response.data))
        htm_js_page= response.data
        stat_obj=await clean(htm_js_page);
            my_obj[index]["statistics"]=stat_obj.data[stat_obj.data.length -1]
            my_obj[index].page_link=`https://downdetector.com${obj.page_link}`
            index++;
            // newobj=  my_obj[obj.index]
            }
            
       
        
    )}



    })

console.log(my_obj);
return  my_obj
}
module.exports.home_scrape_start=start