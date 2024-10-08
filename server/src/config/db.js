
const mongoose = require("mongoose");
const { mongoUrl } = require("../secret");
const logger = require("../controllers/loggerController");

const connectDB = async (options ={}) =>{
    //if anything can accept by options then it work 
    try {
        
        await mongoose.connect(mongoUrl,options)
        // console.log("Connected to MongoDB is Successful")
        logger.log("info","Connected to MongoDB is Successful")

        mongoose.connection.on("error", (error)=>{
            // console.error("DB connection error: " + error)
            logger.log("error","DB connection error: " + error)
        })
    } catch (error) {
        console.error("Could not connect with DB: " + error.toString())
        logger.log("error","Could not connect with DB: " + error.toString())
    }
}


module.exports = connectDB