const express = require('express')
require('dotenv').config()
const connectDB = require('./Config/Database')
const userRoute = require('./routes/user.route')
const todoRoute = require('./routes/todo.route')


const app = express()


//Connect Databse

connectDB()

//this is used for parsing json apllication
app.use(express.json())


app.use('/api/user',userRoute)
app.use('/api/todo',todoRoute)


//PORT
const PORT = process.env.PORT

//Server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    
})


