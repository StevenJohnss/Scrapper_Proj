const router= require("express").Router()
const {PrismaClient}= require("@prisma/client")
const {users}=new PrismaClient
router.get("/",async (req,res)=>{
const all_users=await users.findMany({
    select:{ username:true , id:true},
    where:{id: 1}
})
res.json(all_users)
})



router.post("/",async(req,res)=>{
    const {id,username}=req.body;
    const userExists= await users.findUnique({where:{id},
        select: {username:true} }
        )
        if(userExists){
            return res.status(400).json({msg:"user already exists"})
        }
       

    const newUser= await users.create({
        data:{id,username}
    })
    res.json(newUser)
})


module.exports =router