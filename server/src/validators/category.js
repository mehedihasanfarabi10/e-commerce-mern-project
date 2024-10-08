

const {body} = require("express-validator")


//Registrations validation  functions

const validateCategory = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({min : 3})
    .withMessage("Category name should be at least 3 characters"),


]


module.exports = {
        validateCategory
}