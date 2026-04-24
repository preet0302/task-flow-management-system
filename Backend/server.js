require('dotenv').config()
const app = require('./src/app')
const connectedtodb = require('./src/db/db')





connectedtodb()
app.listen(5000,()=>{
    console.log("Server is runnig on port 5000")
})
