const app=require('./src/app')
app.listen(process.env.PORT,()=>{
    console.log('onlocal host '+process.env.PORT)
})
