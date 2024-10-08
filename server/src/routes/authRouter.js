
const express = require("express")

const runValidation = require("../validators")
const { handleLogin,
     handleLogOut, 
     handleRefreshToken, 
     handleProtectedRoute } = require("../controllers/authController")
const { isLogOut, isLoggedIn } = require("../middleware/auths")
const { validateUserLogIn, validateRefreshToken } = require("../validators/auth")
const authRouter = express.Router()

authRouter.post("/login",
            validateUserLogIn,
            runValidation,
            isLogOut,
            handleLogin)
authRouter.post("/logout",isLoggedIn,handleLogOut)
authRouter.get("/refresh-token",
                handleRefreshToken)
authRouter.get("/protected",
                handleProtectedRoute)

module.exports = authRouter
