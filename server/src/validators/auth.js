

const {body} = require("express-validator")


//Registrations validation  functions

const validateUserRegistration = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required. Enter your full name")
    .isLength({min : 3, max :31})
    .withMessage("Name should be between 3 and 31 characters"),

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email address")
    ,

    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required. Enter your password")
    .isLength({min : 6})
    .withMessage("Password should be at least 6 characters")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    ).withMessage(
        "Password mudt contain at least one uppercase letter,one lowercase letter, one number and one special characters"
    )
    ,
    body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({min : 3})
    .withMessage("Address at least 3 characters")
    ,
    body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
   
    ,
    body("image")
    .optional()
    .isString()
    /*
        .custom((value,{req})=>{
        if(!req.file || !req.file.buffer){
            throw new Error("User image is required")
        }
        return true
    })

    */ 
    .withMessage("User image is must be required")
   
    ,

    



]

const validateUserLogIn = [
 
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email address")
    ,

    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required. Enter your password")
    .isLength({min : 6})
    .withMessage("Password should be at least 6 characters")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    ).withMessage(
        "Password mudt contain at least one uppercase letter,one lowercase letter, one number and one special characters"
    )

    

]

const validateUserPasswordUpdate = [
 
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email address")
    ,

    body("oldpassword")
    .trim()
    .notEmpty()
    .withMessage("Old password is required. Enter your password")
    .isLength({min : 6})
    .withMessage("Old password should be at least 6 characters")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    ).withMessage(
        "Password must contain at least one uppercase letter,one lowercase letter, one number and one special characters"
    ),
    body("newpassword")
    .trim()
    .notEmpty()
    .withMessage("New password is required. Enter your password")
    .isLength({min : 6})
    .withMessage("New password should be at least 6 characters")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    ).withMessage(
        "Password must contain at least one uppercase letter,one lowercase letter, one number and one special characters"
    ),
    // newpassword and confirm password matching

    body("confirmpassword").custom((value,{req})=>{
        if(value!== req.body.newpassword){
            throw new Error("OldPassword & NewPassword didn't match...!")
        }
        return true
    })
    

]

const validateUserForgetPassword = [
 
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email address")

    

]

const validateUserResetPassword = [
 
    body("token")
    .trim()
    .notEmpty()
    .withMessage("Token is required. Token is missing")
    
    // .withMessage("Token is missing")
,
    body("newpassword")
    .trim()
    .notEmpty()
    .withMessage("New Password is required. Enter your password")
    .isLength({min : 6})
    .withMessage("New Password should be at least 6 characters")
    .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    ).withMessage(
    "Password must contain at least one uppercase letter,one lowercase letter, one number and one special characters"
        )
    

]

const validateRefreshToken = [
 
    body("token")
    .trim()
    .notEmpty()
    .withMessage("Token is required. Token is missing")
    
    

]

module.exports = {
    validateUserRegistration,validateUserLogIn,
    validateUserPasswordUpdate,
    validateUserForgetPassword,
    validateUserResetPassword,
    validateRefreshToken

}







