const mongoose = require('mongoose')

async function dbConnect(){
    await mongoose.connect(process.env.MONGOURL,{
        dbName:'Limelight'
    })
    .then(()=>{
        console.log('MongoDb Connected Successfully')
    })
    .catch((err)=>{
        console.log('Error When Connecting MongoDb',err)
    })
}


module.exports=dbConnect