const User=require('../models/user.model')
const jwt=require('jsonwebtoken')
const auth=async(req,res,next)=>{
    try{
    const token=req.header('Authorization').replace('Bearer '," ")
    const decoded=jwt.verify(token,process.env.JWTKEY)
    const user=await User.find()
  res.send(token)
    // if(!user) throw new Error("user not found")
    // req.user=user
    // req.token=token
    // next()
    }
    catch(e)
    {
        res.status(500).send({
            apistatus:false,
            date:e.message,
            message:"invalid token"
        })
    }
 
}
module.exports=auth