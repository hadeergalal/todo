const mongoose=require('mongoose')
// const Todo=mongoose.model('Todo',{
//     text:{
//         type:String,
//         required:true
//     },
    
//     completed:{
//         type:Boolean,
//         default:false
        
//     }

// })
const todoSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    todoType:{
        type:String,
        required:true,
        enum:['txt','img','vid'],
        trim:true
    },
    content:{
        type:String,
        required:function(){return this.todoType=="txt"}
    },
    todoFile:{
   type:String,
   required:function(){return this.todoType!=="txt"}
    }

},{timeStamps:true})
const Todo=mongoose.model('Todo',todoSchema)
module.exports=Todo