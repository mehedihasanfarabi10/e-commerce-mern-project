
const app = require("./app");
const connectDB = require("./config/db");
const logger = require("./controllers/loggerController");
const { PORT } = require("./secret");


app.listen(PORT,async()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    logger.log("info",`Server is running on port http://localhost:${PORT}`);
    await connectDB()
})