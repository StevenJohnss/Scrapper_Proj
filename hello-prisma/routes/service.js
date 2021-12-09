const router= require("express").Router()
const {PrismaClient}= require("@prisma/client")
const {service,component}=new PrismaClient


router.post("/",async(req,res)=>{
    let services_obj=[];
    let components_obj=[];
    //console.log(req.body);
    

for (const el_req of req.body){
        //console.log(el_req);
        
        const {index:id,company_name:name,logo_src:logo,page_link:data_pageUrl,social_links}=el_req
        const {issues_category:components}=el_req;
        let  twitter,facebook
        const serviceExists= await service.findUnique({where:{id},
            select: {name:true} }
            )
            if(serviceExists){
                return res.status(400).json({msg:"service already exists"})
            }
            social_links.forEach(el => {
                if(el.link_category=="Facebook")facebook=el.link
                if(el.link_category=="Twitter")facebook=el.link
            });
            id_forDB=parseInt(id)+1 // our array starts with zero but we cannot store 0 as id number
        services_obj.push({id:id_forDB,name,logo,data_pageUrl,twitter,facebook,slug:name.toString()
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^\w-]+/g, '')
              .replace(/--+/g, '-')
              .replace(/^-+/, '')
              .replace(/-+$/, '')+`_${id_forDB}`})
        components_obj.push({service:id_forDB, name:JSON.stringify(components||[])})

    }
   console.log(components_obj)


    const newService= await service.createMany({
        data:services_obj
    })

    const newComponent= await component.createMany({
        data:components_obj
    })
    res.json({newService,newComponent})

    
})


module.exports =router