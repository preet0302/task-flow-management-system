const dns = require('dns')
dns.setServers(['8.8.8.8','1.1.1.1'])

const mongoose = require('mongoose')

function connectedtodb(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Connected to MongoDB Successfully")
    })
   .catch(err=>{
    console.log(err)
   })
}


module.exports=connectedtodb