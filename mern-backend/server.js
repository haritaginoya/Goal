require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 3000
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorHandler') 

connectDB()

console.log(process.env.PORT)
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/goals', require('./modules/goals/goal.routes'))
app.use('/users', require('./modules/users/user.routes'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server started http://localhost:${port}`)
})

