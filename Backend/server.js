require('dotenv').config()
const app = require('./src/app')
const connectedtodb = require('./src/db/db')





connectedtodb()
app.listen(process.env.PORT,()=>{
    console.log("Server is runnig on port 5000")
})
