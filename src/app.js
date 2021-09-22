const  express=require('express')
const app=express()
require('dotenv').config()
require("../db/connection")
//const todorouts=require('../routs/todo.routs')
const userrouts=require('../routs/user.routs')
const cors=require('cors')
   

app.use(cors())
app.use(express.urlencoded({ extended:true }))
app.use(express.json())
//app.use('/todo',todorouts)
app.use('/user',userrouts)



module.exports=app
