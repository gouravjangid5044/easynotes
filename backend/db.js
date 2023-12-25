const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/newdb"

const connectToMongo=async()=>{
    await mongoose.connect(mongoURI)
    .then((value)=>{
        console.log("Connection successful")
    }) 
}
 
module.exports=connectToMongo