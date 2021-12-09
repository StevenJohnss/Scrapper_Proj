

const  Puppeteer = require("puppeteer")
const fs = require("fs/promises")
//const useProxy = require('puppeteer-page-proxy');
const start = async()=>{

const browser = await Puppeteer.launch({ headless: false,
    slowMo: 250})  // slow down by 250ms
const page = await browser.newPage()
//const page=  await browser.createIncognitoBrowserContext();
console.log('Opening page ...');
try {
    await page.goto('https://downdetector.com/companies/',{timeout:70000});
} catch(err) {
    console.log(err);
}
//await page.screenshot({path:"amazing.png",fullPage:true})
const  my_obj = await page.$$eval("body > div.container.main-container.px-3.px-md-0 > div:nth-child(3) > #companies > div > table > tbody > tr ",
 el=> el.map((x,i)=> { 
     logo_src= x.children[0].children[0].src;
     company_name= x.children[1].children[0].textContent;
     page_link= x.children[1].children[0].href;
     return  {logo_src,company_name,page_link,index:i} 
    })

)
for (const obj of my_obj){
    // get social_links data
    await page.goto(obj.page_link,{timeout:70000,headless: true}) 
    try{    
        console.log("geting statistics")
    htm_js_page= await page.content()
    stat_obj=await clean(htm_js_page);
    my_obj[obj.index]["statistics"]=stat_obj
    // newobj=  my_obj[obj.index]
   
    } catch(e){}
    try{
    const social_links= await page.$$eval("body > div.container.main-container.px-3.px-md-0 > div.row.hfeed.mt-lg-n2 > div.col-lg-4.p-0.p-lg-3 > #sidebar > div:nth-child(3) > p:nth-child(2) > a",
    inside=>inside.map(x=> {
       link_category= x.textContent.trim();
       link= x.href;
       return {link_category,link} 
    }))
    my_obj[obj.index]["social_links"]=social_links
    // newobj=  my_obj[obj.index]
   

// get popup componenet data
    try{
        await page.click(`body > div.container.main-container.px-3.px-md-0 > div.row.hfeed.mt-lg-n2 > #company > div.card.card-body.px-2.px-md-4.pt-3.pb-4.mb-3.mr-lg-n3 > div:nth-child(2) > a`)
        console.log('button clicked ...');
        const issues_category= await page.$$eval("body > div.container.main-container.px-3.px-md-0 > div.row.hfeed.mt-lg-n2 > #company > #indicator-modal > div > #step1 > div.results > div.modal-body > div.options > p > button",
        inside=>inside.map(x=> {
           category_name= x.textContent.trim();
           return category_name 
        }))
        my_obj[obj.index]["issues_category"]=issues_category
        // newobj=  my_obj[obj.index]
        // console.log(newobj.statistics.data)
    }catch(e){}



}catch(e){}

console.log(obj.index)
}
//await fs.writeFile('./temp.json', JSON.stringify(my_obj, null, 2),'utf8')
//await fs.writeFile('./companiesData.json', JSON.stringify(my_obj, null, 2),'utf8')
await fs.writeFile('./finalCompaniesData.json', JSON.stringify(my_obj, null, 2),'utf8')
await browser.close()
}

start()