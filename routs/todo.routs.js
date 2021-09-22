// try {
    
// } catch (e) {
    
// }

const router=require('express').Router()
const Todo=require('../models/todo.model')
//set todo to database
router.post('/addtodo',(req,res)=>{
    const data=new Todo(req.body)
    data.save()
    .then(()=>res.send(data))
    .catch(e=>res.send(e))
})
//get all todo
router.get('/alltodo',async(req,res)=>{
 try{
const data=await Todo.find()
  res.send(data)
}
catch(e){
    res.send(e)
}
})
//get todo by id
router.get('/alltodo/:id',async(req,res)=>{
  try{
     const data= await Todo.findById(req.params.id)
     if(!data) res.send("todo not found")
     res.send(data)

  }
  catch(e){
  res.send(e)
  }
})
//delet todo by id
router.delete('/alltodo/:id', async(req,res)=>{
    try {
        const data=await Todo.findByIdAndDelete(req.params.id)
        if(!data) res.send("no data found")
        res.send(data)
    } catch (e) {
        res.send(e)
    }
})
//update
router.patch('/all/:id',async(req,res)=>{
 availableupdates=["text"]
 requested=Object.keys(req.body)
 isvalid=requested.every(r=>availableupdates.includes(r))
 if(!isvalid) res.send("no available updates")

   try{
     const data=await Todo.findByIdAndUpdate(req.params.id,eq.body)
     if(!data) res.send('user not found')
     res.send('done')
   }
   catch(e){
    res.send(e)
   }
})








module.exports=router