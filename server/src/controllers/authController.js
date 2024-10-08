const httpError = require("http-errors")

const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const { successResponse } = require("./responseController")
const { createJsonWebToken } = require("../helper/jsonwebtoken")
const bcrypt = require("bcryptjs");
const { jwtAccessKey, jwtRefreshKey } = require("../secret")


const handleLogin = async(req,res,next)=>{
    try {
        //email,password => req.body
        //isExist,comparePassword,isBanned,token=>cookie

        const {email,password} = req.body
        const user = await User.findOne({email:email})
        if(!user) {
            throw httpError(404,"User not found with this email. Please register first")
        }

        //compare password

        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if(!isPasswordMatch) {
            throw httpError(401,"Wrong Password. Please try again...!")
        }

        //isBanned

        if(user.isBanned){
            throw httpError(403,"Your account is banned. Please contact admin")
        }

       
        //token

          //create JWT token

        //   const accessToken = createJsonWebToken({email},
        //     jwtAccessKey,'20m')

        //   const accessToken = createJsonWebToken({_id:user._id},
        //     jwtAccessKey,'20m')

        //Access Token
        
          const accessToken = createJsonWebToken({user},
            jwtAccessKey,'20m')

            //cookie
            res.cookie("accessToken",accessToken,{
                maxAge : 20 *60*1000,//20 minutes
                // httpOnly : true,
                // secure : true,
                // sameSite : 'none'//3001 to 3002 request
                
            })

        //Refresh Token

          const refreshToken = createJsonWebToken({user},
            jwtRefreshKey,'7d')

            //cookie
            res.cookie("refreshToken",refreshToken,{
                maxAge : 7*24*60 *60*1000,//7 days
                // httpOnly : true,
                // secure : true,
                // sameSite : 'none'//3001 to 3002 request
                
            })

             //password alada kora hocce

        // const userWithoutPassword = await User.findOne({email:email}).select('-password')

        //2nd way password remove

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;


        //success response
        return successResponse(res,{
            statusCode : 200,
            message : "User was loggedIn successfully",
            payload :{userWithoutPassword}
        })


    } catch (error) {
        next(error)
    }
}

const handleLogOut = async(req,res,next)=>{
    try {
        
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")

        //success response
        return successResponse(res,{
            statusCode : 200,
            message : "User was logOut successfully",
            payload :{}
        })


    } catch (error) {
        next(error)
    }
}

const handleRefreshToken = async(req,res,next)=>{
    try {
        
        const oldRefreshToken = req.cookies.refreshToken;

        //verify old refresh token

        const decodedToken = jwt.verify(oldRefreshToken,
                    jwtRefreshKey)

        if(!decodedToken){
            throw httpError(401,"Invalid Refresh Token... Please log in again...!!!!!")
        }

            //New Access Token
        
            const accessToken = createJsonWebToken(decodedToken.user,
                jwtAccessKey,'20m')
    
                //cookie
                res.cookie("accessToken",accessToken,{
                    maxAge : 20 *60*1000,//20 minutes
                    // httpOnly : true,
                    // secure : true,
                    // sameSite : 'none'//3001 to 3002 request
                    
                })

        //success response
        return successResponse(res,{
            statusCode : 200,
            message : "New access token is generated successfully",
            payload :{}
        })


    } catch (error) {
        next(error)
    }
}

const handleProtectedRoute = async(req,res,next)=>{
    try {
        
        const accesToken = req.cookies.accessToken;


        const decodedToken = jwt.verify(accesToken,
                    jwtAccessKey)

        if(!decodedToken){
            throw httpError(401,"Invalid Access Token... Please log in again...!!!!!")
        }


        //success response
        return successResponse(res,{
            statusCode : 200,
            message : "Protected resouurcess is accessed successfully",
            payload :{}
        })


    } catch (error) {
        next(error)
    }
}


module.exports = {handleLogin,handleLogOut,
            handleRefreshToken,
            handleProtectedRoute}