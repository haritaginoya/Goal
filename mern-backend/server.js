require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 3000

console.log(process.env.PORT)

const app = express()

app.use('/',require('./modules/goals/goal.routes'))

app.listen(port,() =>{
    console.log(`server started http://localhost:${port}`)
})

