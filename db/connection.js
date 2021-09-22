const mongoose=require('mongoose')
try{
    mongoose.connect(process.env.DBURL)
}
catch(e){
    console.log('error to connect database')
}
