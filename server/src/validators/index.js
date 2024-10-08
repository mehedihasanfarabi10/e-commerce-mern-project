
//use to validate result and error handling

const {validationResult} = require("express-validator");
const { errorResponse } = require("../controllers/responseController");

const runValidation = async (req, res, next) => {

    try {

        const errors = validationResult(req); //req.body theke jodi error thake akhane asbe

        if(!errors.isEmpty()) {
            // console.log(errors.array()[0].msg)
            return errorResponse(res,{
                statusCode : 422,
                message : errors.array()[0].msg
            })
        }
        // if no error found then go to next middleware

        return next()

        
    } catch (error) {
        return next(error)
    }


}



module.exports = runValidation