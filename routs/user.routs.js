const router=require('express').Router()
const User=require('../models/user.model')
const emailSetting = require('../helper/sendEmail.helper')
const auth=require('../middleware/Auth')

//register
router.post('/register',async(req,res)=>{
    try{
        const userdata=new User(req.body)
        await userdata.save()
        emailSetting(userdata.email, "test email")
         res.status(200).send({
         apistatus:true,
         data:userdata,
         message:"data is sucess"

     })
    }
    catch(e){
        res.status(500).send({
            apistatus:false,
            data:e.message,
            message:"error data"

        })
    }
})
//add addresses
router.post('/addaddr/:id',async(req,res)=>{
    try{
          const user=await User.findById(req.params.id)
         const addr=req.body
        
        user.addresses.push(addr)
        await user.save()
         res.status(200).send({
         apistatus:true,
         data:user,
         message:"data is sucess"

     })
    }
    catch(e){
        res.status(500).send({
            apistatus:false,
            data:e.message,
            message:"error data"

        })
    }
        

})
//login
router.post('/login',async(req,res)=>{
    try {
        const user=await User.loginUser(req.body.email,req.body.password)
        const token=await user.generateToken()
        res.status(200).send({
            apistatus:true,
            data:user,token,
            message:"u r login"
        })
    } catch (e) {
        res.status(400).send({
            apistatus:false,
            data:e.message,
            message:" can notlogin"
        })
    }
})
//profile
router.post('/me',auth, async(req,res)=>{
res.send(req.user)
}) 
//logout
router.post('/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter(singletoken=>{
            return singletoken.token !=req.token
           
        })
        req.user.save()
        res. status(200).send({
            apistatus:true,
            data:"",
            message:"logout "
        })
       
    }
    catch(e){
        res.status(500).send({
            apistatus:false,
            data:e.message,
            message:"error"
        })
    }

})//logoutall
router.post('/logoutall',auth,async(req,res)=>{
    try{
    req.user.tokens=[]
    await req.user.save()
    res.status(200).send({
        apistatus:true,
        data:"",
        message:"logout from all devices"
    })
    }
    catch(e){
        res.status(500).send({
            apistatus:false,
            data:e.message,
            message:"error"
        })
    }
})

module.exports=router