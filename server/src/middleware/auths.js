const httpError = require("http-errors")

const jwt = require("jsonwebtoken");
const { jwtAccessKey } = require("../secret");


const isLoggedIn = async (req, res, next) =>{
    try {

        // console.log("Access")
        const token = req.cookies.accessToken;
        // console.log(token)
        if(!token){
            throw httpError(401,"Access token not found. Please log in...")
        }

        //verify access token with jwt
        const decoded = jwt.verify(token, jwtAccessKey);
        // console.log(decoded)

        if(!decoded){
            throw httpError(401,"Invalid access token.Please log in again")
        }
        
        // console.log(decoded)//decoded contains user access
        req.user = decoded.user //req.user contains user all info

        // req.body.userId = decoded._id;
        next();
    } catch (error) {
        next(error);
    }

}

const isLogOut = async (req, res, next) =>{
    try {

        // console.log("Access")
        const token = req.cookies.accessToken;
        // console.log(token)
        if(token){
            try {
                const decoded = jwt.verify(token, jwtAccessKey);
           if(decoded){
            throw httpError(400,"User is already logged in")
           }
            } catch (error) {
                throw error
            }
        }
        //no access token then log out and redirect to next()
        next();
    } catch (error) {
        next(error);
    }

}
const isAdmin = async (req, res, next) =>{
    try {
        // + not used here use comma
        // console.log("Hello Here Info...",req.user)
        // console.log(req.user.isAdmin) //return false

        const isAdminCheck = req.user.isAdmin;
        if(!isAdminCheck){
            throw httpError(403,"Forbidden. You must be an admin to be allowed")
        }


        next()
    } catch (error) {
        next(error);
    }

}



module.exports = {isLoggedIn,isLogOut,isAdmin}