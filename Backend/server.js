require('dotenv').config()
const app = require('./src/app')
const connectedtodb = require('./src/db/db')


app.use(cors({ origin: true, credentials: true }))


connectedtodb()
app.listen(process.env.PORT,()=>{
    console.log("Server is runnig on port 5000")
})
