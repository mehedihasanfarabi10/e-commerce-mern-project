const httpError = require("http-errors")
const fs = require("fs").promises
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const { successResponse } = require("./responseController")
// const user = require("../models/userModel")
const mongoose = require("mongoose")
const { findWithId} = require("../services/findItem")
const { error } = require("console")
const { deleteImage } = require("../helper/deleteImage")
const { createJsonWebToken } = require("../helper/jsonwebtoken")
const { jwtActivationKey,clientUrl, jwtResetKey } = require("../secret")
const { emailWithNodeMailer } = require("../helper/email")
const path = require("path")
const { handleUserAction } = require("../services/manageUser")
const { getAllUser, findOneUserById, deletingUserById, updatingUserById, updatePassword, forgetPasswordByEmail, resetPassword } = require("../services/userService");
const { sendMail } = require("../helper/sendMail");
const cloudinary = require("../config/cloudinary");
const { response } = require("express");



const handleGetUser =async (req, res,next) => {
    
    try {
        //if any one search  for pagination
        const search = req.query.search || ""
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const {users,pagination} =  await getAllUser(search, limit,page)

        return successResponse(res,{
            statusCode : 200,
            message : "User were returned successfully",
            payload : {
                users,
                pagination : pagination
            }
        })


    } catch (error) {
        next(error)
    }
}

// const getUser =async (req, res,next) => {

//get user 1 copy code here

//     try {
//         //if any one search  for pagination
//         const search = req.query.search || ""
//         const page = Number(req.query.page) || 1
//         const limit = Number(req.query.limit) || 10

//         //search regular expression
//         // ".*" first or last not matter if search result will match any name
//         const searchRegEx = new RegExp(".*"+search+".*","i");

//         //filter if he admin

//         const filter = {
//             isAdmin : {
//                 $ne : true
//             },
//             $or :[
//                 {name : {
//                     $regex : searchRegEx
//                 }},
//                 {email : {
//                     $regex : searchRegEx
//                 }},
//                 {phone : {
//                     $regex : searchRegEx
//                 }},
//             ]
//         }

//         //not showing password
//         const option = {password : 0}


//         //all user get here
//         const user = await User.find(filter,option).limit(limit).skip((page-1)*limit)

//         //counting user

//         const count = await User.find(filter).countDocuments();

//         if(!user) throw httpError(404,"No user found")

//         // res.status(200).send({
//         //     message : "User profile is available",
//         //     user,
//         //     pagination : {
//         //         totalPage : Math.ceil(count/limit),
//         //         currentPage : page,
//         //         previousPage : page - 1 > 0 ? page -1: null,
//         //         nextPage : page + 1 <= Math.ceil(count/limit) ? page +1 : null,

//         //     }
//         // })


//         return successResponse(res,{
//             statusCode : 200,
//             message : "User were returned successfully",
//             payload : {
//                 user,
//                 pagination : {
//                     totalPage : Math.ceil(count/limit),
//                     currentPage : page,
//                     previousPage : page - 1 > 0 ? page -1: null,
//                     nextPage : page + 1 <= Math.ceil(count/limit) ? page +1 : null,
    
//                 }
//             }
//         })



//     } catch (error) {
//         next(error)
//     }
// }


const handleFindUserById =async (req, res,next) => {
    
    try {

        // console.log(req.user)
        const id = req.params.id;
        const option = {password : 0}
        //using services folder findUserByID function
        //const user = await findWithId(User,id,option)
        const user =await findOneUserById(id,option);
        
        return successResponse(res,{
            statusCode : 200,
            message : "User were returned successfully",
            payload : {
                user
            }
        })



    } catch (error) {
      
        next(error)
    }
}

const handleDeleteUserById =async (req, res,next) => {
    
    try {

        const id = req.params.id;
        const option = {password : 0}
        //using services folder findUserByID function

        // const user =await findWithId(User,id,option);

        const user = await deletingUserById(id,option);
        
        // const userImagePath = user.image;

        //1st Way delete Image

        // fs.access(userImagePath)
        // .then(()=> fs.unlink(userImagePath))
        // .then(()=>console.log("User image was deleted"))
        // .catch((error)=> console.error("User image doest not exist"))


        // deleteImage(userImagePath)

        //deleting user image
        /*
        
        if(user && user.image){
            await deleteImage(user.image)
        }
        
        */ 

       /* 
       //2nd Way
        fs.access(userImagePath,(err) => {
            if(err){
                console.log("User image not found")
            }
            else{
                fs.unlink(userImagePath,(err)=>{
                    if(err) throw err;
                    console.log("User image was deleted")
                })
            }
        })

        */


        return successResponse(res,{
            statusCode : 200,
            message : "User was deleted successfully",
            
        })



    } catch (error) {
      
        next(error)
    }
}

const handleProcessRegister =async (req, res,next) => {
    
    try {

        const {name,email,password,phone,address} = req.body;
        
        /*
        //Buffer image process comments here

        //if no image found
        if(!req.file) {
            throw httpError(400,"No image found")
        }
        if(req.file.size > 1024 * 1024 * 2) {
            throw new Error("Image size is too large. Must be less than 2 mb")
        }
        //image convert to buffer string

        const imageBufferString = req.file.buffer.toString("base64");


        */ 

        //Without buffer string here simple process

        const image = req.file?.path;

        // ? is defined that this file can have or not have thakteo pare abr nao pare


        if(image && image.size > 1024 * 1024 * 10) {
            throw new Error("Image size is too large. Must be less than 10 mb")
        }

        const userExist = await User.exists({email:email})

        if(userExist) {
            throw httpError(409,"User this email already exist. Please sign in")
        
        }

        //create JWT token

        const token = createJsonWebToken({name,email,password,phone,address,image},
            jwtActivationKey,'20m')

            // console.log(token)

            //prepare email

            const emailData = {
                email,
                subject : "Account Activation Mail",
                html : `
                    <h2> Hello ${name} </h2>
                    <p> Please activate your account by clicking the link below</p>
                    <a href="${clientUrl}/api/users/activate/${token}" target="_blank"> activate your account </a>
                `
            }

            //send email by nodemailer
            //helper folder sendEmail.js theke

            await sendMail(emailData)

        const newUser = {
            name,
            email,
            password,
            phone,
            address,
            
        }


        return successResponse(res,{
            statusCode : 200,
            message : `Please go to your ${email} for registration`,
            payload : {
                token
            }
        })



    } catch (error) {
      
        next(error)
    }
}

const handleActivateUserAccount = async (req, res, next) => {
    try {
        const token = req.body.token;
        console.log(token)

        if (!token) {
            throw httpError(404, "Token not found");
        }

        
        // Verify user
        const decoded = jwt.verify(token, jwtActivationKey);
        if (!decoded) {
            throw httpError(404, "Unable to verify user");
        }
        console.log(decoded)

        // Check if user already exists
        const userExists = await User.exists({ email: decoded.email });
        if (userExists) {
            throw httpError(409, "User with this email already exists. Please sign in.");
            // res.status(200).json({
            //     message: "User with this email already exists. Please sign in first."
            // })
        }

        //image stored in Cloud Storage

        const image = decoded.image;

        if(image){
            const storeImage = await cloudinary.uploader.upload(
                        image,{
                            folder : 'ecommerceMernDB/users'
                        }
            )
            // console.log(response)
            //cloudinary ekta secure_url make korbe setai use kre image store hoy

            decoded.image = storeImage.secure_url;
        }

        // Create user
        await User.create(decoded)

        return successResponse(res, {
            statusCode: 201,
            message: `User was registered successfully`,
        });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw httpError(401, "Token has expired");
        } else if (error.name === "JsonWebTokenError") { // Corrected condition
            throw httpError(401, "Invalid User");
        } else {
            throw error; // Throw other errors to be caught by error handling middleware
        }
    }
};


const handleUpdateUserById =async (req, res,next) => {
    
    try {

        const userid = req.params.id;
        const option = {password : 0}
        //using services folder findUserByID function

        /*
        services folder e code included
        
        const user = await findWithId(User,userid,option);
        

        const updateOption = {new : true,
        runValidators : true, context : "query"}
        //using services folder findUserByID function

       let updates = {}

    //    if(req.body.name){
    //     updates.name = req.body.name
    //    }
    //    if(req.body.password){
    //     updates.password = req.body.password;
    //    }
    //    if(req.body.phone){
    //     updates.phone = req.body.phone
    //    }
    //    if(req.body.adress){
    //     updates.adress = req.body.adress
    //    }

       for(let key in req.body){
        if(["name","password","phone","address"].includes(key)){
            updates[key] = req.body[key]
        }
        else if(["email"].includes(key)){
            throw httpError(400,"Email can not be updated")
        }

       }


       const image = req.file?.path;

       if(image){
        if(image.size > 1024 * 1024 * 10) {
            throw new Error("Image size is too large. Must be less than 10 mb")
        }
        updates.image = image
        //replace existing image with new
        updates.image !== "default.png" && deleteImage(user.image)
        //image convert to buffer string
        // updates.image = image.buffer.toString("base64")
       }


       delete updates.email;


       const updatedUser = await 
       User.findByIdAndUpdate(userid,updates,
        updateOption).select("-password")

       if(!updatedUser){

        throw httpError(404,"User does not exist with this id")

       }

       //...End here...

       */ 

       const updatedUser = await updatingUserById(userid,option,req)

        return successResponse(res,{
            statusCode : 200,
            message : "User was updated successfully",
            payload : updatedUser
        })



    } catch (error) {
      
        next(error)
    }
}

const handleManageStatusById =async (req, res,next) => {
    
    try {

        const userid = req.params.id;
        // const option = {new : true} //new updated ban value returned from
      
        const user = await findWithId(User,userid);

        //value can be ban or unban that contain action

        const action = req.body.action;

        const successMessage = await handleUserAction(userid,action)

        return successResponse(res,{
            statusCode : 200,
            message : successMessage,
            // payload : updatedUser
        })



    } catch (error) {
      
        next(error)
    }
}


// const unBanUserById =async (req, res,next) => {
    
//     try {

//         const userid = req.params.id;
//         // const option = {new : true} //new updated ban value returned from
      
//         const user = await findWithId(User,userid);
        
//         const updates = {isBanned : false}

//         const updateOption = {new : true,
//         runValidators : true, context : "query"}
//         //using services folder findUserByID function


//          const updatedUser = await User.findByIdAndUpdate(
//                 userid,
//                     updates,
//                         updateOption
//                             )
//                         .select("-password")

//        if(!updatedUser){

//         throw httpError(404,"User was not unBanned successfully...!")

//        }

//         return successResponse(res,{
//             statusCode : 200,
//             message : "User was unBanned successfully",
//             payload : updatedUser
//         })



//     } catch (error) {
      
//         next(error)
//     }
// }

//Update Password

const handleUpdatePassword =async (req, res,next) => {
    
    try {

        const {email,oldpassword,newpassword,confirmpassword} = req.body;

        const userId = req.params.id;

        const updatedUser = await updatePassword(
            userId,
                email,   
                    oldpassword,    
                        newpassword,
                            confirmpassword)
        
        return successResponse(res,{
            statusCode : 200,
            message : "User password updated successfully",
            payload: {updatedUser}
        })



    } catch (error) {
      
        next(error)
    }
}

const handleForgetPassword =async (req, res,next) => {
    
    try {
        const {email} = req.body;
        
        const token = await forgetPasswordByEmail(email)
        
            return successResponse(res,{
                statusCode : 200,
                message : `Please go to your ${email} for resetting password`,
                payload : {
                    token
                }
            })



    } catch (error) {
      
        next(error)
    }
}

const handleResetPassword =async (req, res,next) => {
    
    try {

        const {token,newpassword} = req.body;

        await resetPassword(token,newpassword)

        return successResponse(res,{
            statusCode : 200,
            message : "User password reset successfully",
            payload: {}
        })



    } catch (error) {
      
        next(error)
    }
}

// const handleResetPassword = async (req, res, next) => {
//     try {
//         const { token, password } = req.body;

//         // Verify the token
//         const decoded = jwt.verify(token, jwtResetKey);
//         if (!decoded) {
//             throw httpError(400, "Invalid or expired token.");
//         }

//         // Extract email from the decoded token
//         const filter = { email: decoded.email };

//         // Define the update object
//         const update = { password: password };

//         // Define options for findOneAndUpdate
//         const options = { new: true };

//         // Perform the update operation
//         const updatedUser = await User.findOneAndUpdate(filter, update, options);

//         // Check if the update was successful
//         if (!updatedUser) {
//             throw httpError(404, "Password reset failed.");
//         }

//         // Return success response
//         return successResponse(res, {
//             statusCode: 200,
//             message: "User password reset successfully",
//             payload: {}
//         });
//     } catch (error) {
//         next(error);
//     }
// };


module.exports = {
    handleGetUser,
    handleFindUserById,
    handleDeleteUserById,
    handleProcessRegister,
    handleActivateUserAccount,
    handleUpdateUserById,
    handleManageStatusById,
    handleUpdatePassword,
    handleForgetPassword,
    handleResetPassword
    
}