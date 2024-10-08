const httpError = require("http-errors")
const User = require("../models/userModel")
const mongoose = require("mongoose");

const findWithId = async (Model,id,option={}) => {
    try {
        
        
        const item = await Model.findById(id,option)

        if(!item) throw httpError(404,`${Model.modelName} item not found by this id`)
        return item
    } catch (error) {
        //mongoose error handling
        if(error instanceof mongoose.Error){
            throw httpError(404,"Invalid Item Id")
            // return
        }
        throw error
    }

}


module.exports = {
    findWithId
}