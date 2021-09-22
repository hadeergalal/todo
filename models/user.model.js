const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        
       
    },
    email:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        unique:true,
        validate(value){
         if( !validator.isEmail(value)) throw  new Error('invalid email formate')
        }

    },
    phone:{
        type:String,
        trim:true,
        required:true,
        validate(value){
          if(!validator.isMobilePhone(value,['ar-EG'])) throw new Error("not egyption number") 
        }
    },
    password:{
        type:String,
        trim:true,
        required:true, 
    },
    age:{
        type:Number,
        trim:true,
        required:true,
        validate(value){
            if(value<21) throw new Error ('user under age')
        }
    },
    addresses:[{
      addrtype:{
       type:String,
       trim:true
      },
      addrdetails:{
        type:String,
        trim:true
      }
    }],
    image:{
        type:String,
        trim:true,
    },
    status:{
        type:Boolean,
        default:false
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]




},{timestamps:true})

//handle response to delet unwanted 
userSchema.methods.toJSON = function()
{
   const user=this.toObject()
   delete user.password
   delete user.__v
   return user
}


//hash user password before save
userSchema.pre('save',async function(){ 
    // console.log(this)
    const user=this
    if(user.isModified('password')){
    user.password= await bcrypt.hash(user.password,12)
    }

})
//login 
userSchema.statics.loginUser=async(email,password)=>{
    const user= await User.findOne({email})
    if(!user) throw Error ("incorrect email")
   const isvalidpass=await bcrypt.compare(password,user.password)
   if(!isvalidpass) throw Error("invalid password")
   return user
}
const jwt=require('jsonwebtoken')
const router = require('../routs/user.routs')
const auth = require('../middleware/Auth')
//create token
userSchema.methods.generateToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id},process.env.JWTKEY)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

const User= mongoose.model('User',userSchema)
module.exports=User