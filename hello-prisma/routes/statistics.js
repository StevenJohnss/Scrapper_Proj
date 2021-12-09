const router= require("express").Router()
const {PrismaClient}= require("@prisma/client")
const {report}=new PrismaClient


router.post("/",async(req,res)=>{
    let report_obj=[];
for (const el_req of req.body){
        //console.log(el_req);
        
        const {index:id,statistics}=el_req
        const reportExists= await report.findUnique({where:{service_reportToservice:id},
            select: {service_reportToservice:true} }
            )
            if(reportExists){
                return res.status(400).json({msg:"report already exists"})
            }
        id_forDB=parseInt(id)+1 // our array starts with zero but we cannot store 0 as id number
        report_obj.push({service_reportToservice:id_forDB,service:id_forDB,component_componentToreport:id_forDB})

    }

    const newReports= await component.createMany({
        data:report_obj
    })
    if(newReports){
        res.send("Data posted successfully")
    }
    else{
        res.send("Failed to post Data")
    }
    

    
})


module.exports =router