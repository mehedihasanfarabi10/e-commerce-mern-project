const { deleteImage } = require("../helper/deleteImage");
const User = require("../models/userModel");
const httpError = require("http-errors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { findWithId } = require("./findItem");
const { createJsonWebToken } = require("../helper/jsonwebtoken");
const { jwtResetKey,clientUrl } = require("../secret");
const { emailWithNodeMailer } = require("../helper/email");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../helper/sendMail");
const { pubicIdWithoutExtensionFromUrl,
        deleteImageFromCloudinary } = require("../helper/cloudinaryHelper");
const cloudinary = require("../config/cloudinary");



//It is used to simple controller code and shorter syntax

const getAllUser = async(search,limit,page)=>{

         try {
               //search regular expression
        // ".*" first or last not matter if search result will match any name
        const searchRegEx = new RegExp(".*"+search+".*","i");

        //filter if he admin

        const filter = {
            isAdmin : {
                $ne : true
            },
            $or :[
                {name : {
                    $regex : searchRegEx
                }},
                {email : {
                    $regex : searchRegEx
                }},
                {phone : {
                    $regex : searchRegEx
                }},
            ]
        }

        //not showing password
        const option = {password : 0}


        //all user get here
        const users = await User.find(filter,option).limit(limit).skip((page-1)*limit)

        //counting user

        const count = await User.find(filter).countDocuments();

        if(!users || users.length===0) throw httpError(404,"No user found")

        return {
            users,
            pagination : {
                totalPage : Math.ceil(count/limit),
                currentPage : page,
                previousPage : page - 1 > 0 ? page -1: null,
                nextPage : page + 1 <= Math.ceil(count/limit) ? page +1 : null,

            }
        }


        // return successResponse(res,{
        //     statusCode : 200,
        //     message : "User were returned successfully",
        //     payload : {
        //         user,
        //         pagination : {
        //             totalPage : Math.ceil(count/limit),
        //             currentPage : page,
        //             previousPage : page - 1 > 0 ? page -1: null,
        //             nextPage : page + 1 <= Math.ceil(count/limit) ? page +1 : null,
    
        //         }
        //     }
        // })



         } catch (error) {
            throw error
         }

}

const findOneUserById=async(id,option={})=>{

    try {

        const user = await User.findById(id,option)
        if(!user){
            throw httpError(404,"User does not exist with this id")
        }
        return user

    } catch (error) {
        if(error instanceof mongoose.Error.CastError) {
        throw httpError(400,"Invalid Mongoose Id. Please enter coorect id...!!!")
    }
        throw error
    }

}

const deletingUserById=async(id,option={})=>{

    try {

        const existingUser =   await User.findOne({
            _id:id
        })

        // previous code cloudinary er ager code
        //if(existingUser && existingUser.image){
        //     await deleteImage(existingUser.image)
        // }
        //dleting user image from cloudinary
        if(existingUser && existingUser.image){
            const publicId = await pubicIdWithoutExtensionFromUrl(existingUser.image);

            // const {result} = await cloudinary.uploader.destroy(`ecommerceMernDB/users/${publicId}`)
        
            // if(result!=='ok'){
            //     throw new Error(
            //         'User image not deleted successful from cloudinary.Please try again'
            //     )
            // }

            await deleteImageFromCloudinary("ecommerceMernDB/users",publicId,'User')
        }

       

        //deleting User from database

        await User.findByIdAndDelete({
            _id:id,
            isAdmin: false
        })


    } catch (error) {
        if(error instanceof mongoose.Error.CastError) {
            throw httpError(400,"Invalid Mongoose Id. Please enter coorect id...!!!")
        }
        throw error
    }

}

const updatingUserById=async(userid,option={},req)=>{

    try {

        const user = await findOneUserById(userid,option);

        if(!user){
            throw httpError(404,"User does not exist with this id")
        }
        
        const updateOption = {new : true,
        runValidators : true, context : "query"}
        
        let updates = {}

        const allowedFields = ["name","password","phone","address"]

        for(let key in req.body){
        if(allowedFields.includes(key)){
            updates[key] = req.body[key]
        }
        else if(key==="email"){
            throw httpError(400,"Email can not be updated")
        }

       }


       const image = req.file?.path;

       if(image){
        if(image.size > 1024 * 1024 * 10) {
            throw new Error("Image size is too large. Must be less than 10 mb")
        }
        /*Previous code for image update*/ 
        // updates.image = image
        // //replace existing image with new
        // updates.image !== "default.png" && deleteImage(user.image)

        /*Cloudinary code for image update*/ 

        const response = await cloudinary.uploader.upload(image,{
            folder : 'ecommerceMernDB/users'
        }) 
        
        updates.image = response.secure_url;

       }


    //    delete updates.email;


       const updatedUser = await 
       User.findByIdAndUpdate(userid,updates,
        updateOption).select("-password")

       if(!updatedUser){

        throw httpError(404,"User does not exist with this id")

       }

       //delete previous cloudinary image
           //id generate
           if(user.image){
            const publiUserImageId = await pubicIdWithoutExtensionFromUrl(
                        user.image
            )
            //delete
            await deleteImageFromCloudinary('ecommerceMernDB/users',
                    publiUserImageId,'User')
           }
    
    


      return updatedUser

    } catch (error) {
        if(error instanceof mongoose.Error.CastError) {
            throw httpError(400,"Invalid Mongoose Id. Please enter coorect id...!!!")
        }
        throw error
    }

}


// const updatePassword = async (email, oldPassword, newPassword, confirmPassword) => {
//     try {
//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             throw httpError(404, "User does not exist with this email");
//         }

//         // Compare old password
//         const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
//         if (!isPasswordMatch) {
//             throw httpError(400, "Old Password didn't match. Please try again!");
//         }

//         // Check if new passwords match
//         if (newPassword !== confirmPassword) {
//             throw httpError(400, "New password and confirm password do not match");
//         }

//         // Hash new password
//         const hashedPassword = await bcrypt.hash(newPassword, 12);

//         // Update user password by email
//         const updatedUser = await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
        
//         if (!updatedUser) {
//             throw httpError(401, "Password was not updated successfully! Please try again");
//         }

//         return updatedUser; // Depending on your use case, you might want to limit the data returned here

//     } catch (error) {
//         throw error; // Consider more nuanced error handling based on your application's needs
//     }
// };

const updatePassword= async (userId,email,
            oldpassword,newpassword,confirmpassword)=>{

    try {
        //userId diye update password
        const user = await findWithId(User,userId)

        //email diye update password
        // const user = await User.findOne({email})
        if(!user){
            throw httpError(404,"User does not exist with this id/email")
        }

        
        //compare password

        const isPasswordMatch = await bcrypt.compare(oldpassword,user.password)
        if(!isPasswordMatch) {
            throw httpError(400,"Old Password didn't match. Please try again...!")
        }

          // Check if new passwords match
        //   if (newpassword !== confirmpassword) {
        //     throw httpError(400, "OldPassword & NewPassword didn't match...!");
        // }

        // const filter = {userId}   //user id separated

        // const update = {$set : {password:newpassword}}
    
        // const option = {new : true} //new updated ban value returned from
        
        // Hash new password
        // const hashedPassword = await bcrypt.hash(newpassword, 12);

        // const updatedUser = await User.findByIdAndUpdate({email},
        //                     {password:newpassword},
        //                     {new : true} 
        //                         )
        const updatedUser = await User.findByIdAndUpdate(userId,
                            {password:newpassword},
                            {new : true} 
                                )

        if(!updatedUser) {
        throw httpError(401,"User was not updated successfully! Please try again")
            }

            return updatedUser

    } catch (error) {
        if(error instanceof mongoose.Error.CastError) {
            throw httpError(400,"Invalid Mongoose Id. Please enter correct id...!!!")
        }
        throw error
    }

}

const forgetPasswordByEmail= async (email)=>{

    try {
        
        const user = await User.findOne({email})
        if(!user){
            throw httpError(404,"Email is incorrect...!")
        }
        
        //create JWT token

        const token = createJsonWebToken({email},
            jwtResetKey,'20m')

            // console.log(token)

            //prepare email

            const emailData = {
                email,
                subject : "Reset Password Mail",
                html : `
                    <h2> Hello ${user.name} </h2>
                    <p> Please reset your password by clicking the link below</p>
                    <a href="${clientUrl}/api/users/reset-password/${token}" target="_blank"> Reset your password </a>
                `
            }

            //send email by nodemailer

            sendMail(emailData)
            // try {
            //     await emailWithNodeMailer(emailData)
            // } catch (emailError) {
            //     next(httpError(500,"Failed to send reset password email"))
            //     return

            //     //if error occured then success response e r jabena jeta return kaj kore

            // }

            return token

    } catch (error) {
       
        throw error
    }

}
const resetPassword= async (token,newpassword)=>{

    try {
        
        const decoded = jwt.verify(token,jwtResetKey)
        
        if (!decoded) {
            throw httpError(400, "Invalid or expired token.");
        }
        // console.log(decoded)
        //email filtered from token
        const filter = {email: decoded.email};

        const update =  {password:newpassword}
        const option = {new : true} 
        //findOneandUpdate 
        
        const updatedUser = await User.findOneAndUpdate(filter,update,option)

        if(!updatedUser){
            throw httpError(404, "Password reset failed.")
        }

    } catch (error) {
       
        throw error
    }

}


module.exports = {
    getAllUser,
    findOneUserById,
    deletingUserById,
    updatingUserById,
    updatePassword,
    forgetPasswordByEmail,
    resetPassword
}