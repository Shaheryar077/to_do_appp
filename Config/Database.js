const mongoose = require('mongoose')


const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`DB CONNECTED:`);
        
    } catch (error) {
        console.error('Something went wrong ',error.message)
        
    }

}

module.exports = connectDB