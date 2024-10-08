

const {Schema,model} = require("mongoose")


const categorySchema = new Schema({
    name : {
        type : String,
        required : [true,"Category is required"],
        trim : true,
        unique : true,
       
        minlength : [3, "Min length of Category is 3 characters"],
    },
    slug : {
        type : String,
        required : [true,"Category slug is required"],
        
        unique : true,
        lowercase : true,
       
    },
    
},{timestamps : true})

const Category = model("Category",categorySchema)

module.exports = Category;
