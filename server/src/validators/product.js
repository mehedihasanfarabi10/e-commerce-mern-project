

const {body} = require("express-validator")


//Registrations validation  functions

const validateProduct = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required.")
    .isLength({min : 3})
    .withMessage("Product name should be at least 3 characters")
    ,
    body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required.")
    .isLength({min : 3})
    .withMessage("Description should be at least 3 characters")
    ,
    body("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required.")
    .isFloat({min : 0})
    .withMessage("Price should be at least a positive number")
    ,
    body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required.")  
    ,
    body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required.")
    .isLength({min : 1})
    .withMessage("Quantity should be at least a positive number")
    ,
    body("image")
    .optional()
    .isString()
    .withMessage("Product image must be required")


]


module.exports = {
    validateProduct
}