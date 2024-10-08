
const httpError = require("http-errors");
const User = require("../models/userModel");
const mongoose = require("mongoose");


const handleUserAction = async(userid,action) =>{

    try {

        let update;
        let successMessage;

        if(action === "ban"){
            update = {isBanned : true}
            successMessage = "User was banned successfully"
        }else if(action==="unban"){
            update = {isBanned : false}
            successMessage = "User was unbanned successfully"
        }else{
            throw httpError(400,"Invalid action. Use ban or unban action ")
        }

        
        // const updates = {isBanned : true}

        const updateOption = {new : true,
        runValidators : true, context : "query"}
        //using services folder findUserByID function


         const updatedUser = await User.findByIdAndUpdate(
                userid,
                    update,
                        updateOption
                            )
                        .select("-password")

       if(!updatedUser){

        throw httpError(404,"User was not banned successfully...!")

       }

       return successMessage
        
    } catch (error) {
        if(error instanceof mongoose.Error.CastError) {
            throw httpError(400,"Invalid Mongoose Id. Please enter coorect id...!!!")
        }
        throw error
    }



}


module.exports = {
    handleUserAction
}