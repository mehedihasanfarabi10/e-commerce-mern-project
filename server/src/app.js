
const express = require("express");
const morgan = require("morgan");
const httpError = require("http-errors")
const xssClean = require("xss-clean")
const cookieParser = require("cookie-parser")
const rateLimit = require("express-rate-limit");
const router = require("./routes/userRouter");
const { seedUser } = require("./controllers/seedController");
const seedRouter = require("./routes/seedRouter");
const { errorResponse } = require("./controllers/responseController");
const authRouter = require("./routes/authRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const app = express();

//using express limit rate

const rateLimiter = rateLimit({
    windowMs : 1 * 60 * 1000,  //1 minute mili seconds
    max : 4,
    message: "Rate limit exceeded"
})



app.use(cookieParser())
// app.use(rateLimiter) // for all route request 
app.use(xssClean())
// app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/users",router)
app.use("/api/seed",seedRouter)
app.use("/api/auth",authRouter)
app.use("/api/categories",categoryRouter)
app.use("/api/products",productRouter)

// const isLoggedIn = (req, res, next) => {
//     const login = true;
//     if (login) {
//         req.body.id = 101;
//         next();
//     }
//     else{
//         return res.status(401).json({
//             message : "You must be logged in"
//         })
//     }
// }


app.get("/",(req, res) => {
    res.status(200).send("Welcome to the Home Page")
})

app.get("/products",rateLimiter, (req, res) => {
    res.status(200).send("Welcome to the Product Page")
})

app.post("/products", (req, res) => {
    res.status(200).send("Welcome POST to the Product Page")
})

app.put("/products", (req, res) => {
    res.status(200).send("Welcome PUT to the Product Page")
})

app.delete("/products", (req, res) => {
    res.status(200).send("Welcome DELETE to the Product Page")
})

app.get("/router",(req, res) => {
    res.status(200).send({
        message : "Please log in first and confirm your identity !!!"
    })
})

app.use((req,res,next) => {
    // res.status(404).json({
    //     message : "Page not found"
    // })
    
    next(httpError(404, "Route Not Found"))
})

// All errors will come here
app.use((err,req,res,next) => {
    // res.status(500).json({
    //     message : "Internal server error"
    // })
    // next()

    // return res.status(err.status || 500).json({
    //     success : false,
    //     message : err.message
    // });


    return errorResponse(res,{statusCode : err.status, message : err.message})
    


})

// Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack); // Log the error for debugging purposes
//     res.status(err.status || 500).send({
//       status: err.status || 500,
//       message: err.message || 'Internal Server Error'
//     });
//   });

module.exports = app