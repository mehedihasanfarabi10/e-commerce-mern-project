

const {Schema,model} = require("mongoose")


const productSchema = new Schema({
    name : {
        type : String,
        required : [true,"Product is required"],
        trim : true,
        unique : true,
        minlength : [3, "Min length of Product is 3 characters"],
    },
    slug : {
        type : String,
        required : [true,"Product slug is required"],
        
        unique : true,
        lowercase : true,
       
    },
    description : {
        type : String,
        required : [true,"Product description is required"],
        
        trim : true,
        minlength : [3, "Min length of Product description is 3 characters"],
    },
    price : {
        type : Number,
        required : [true,"Product price is required"],
        
        trim : true,
        validate: {
            validator: (v)=>v>0,
            message : (props)=>`${props.value} is not a valid price. 
            Price must be greater then 0`
        }
    },
    quantity : {
        type : Number,
        required : [true,"Product quantity is required"],
        
        trim : true,
        validate: {
            validator: (v)=>v>0,
            message : (props)=>`${props.value} is not a valid quantity. 
            Quantity must be greater then 0`
        }
    },
    sold : {
        type : Number,
        required : [false,"sold quantity is required"],
        
        trim : true,
        default: 0,
        validate: {
            validator: (v)=>v>=0,
            message : (props)=>`${props.value} is not a valid sold quantity. 
            sold must be greater then 0`
        }
    },
    shipping:{
        type : Number,
        default:0, //0 means free or can be paid
    },
    image : {
        
        type : String,
        // default : defaultImage,
        contentType : String,
        required : [false,"Product image must be required"],
        
    },
    //product should be under a category for this code
    category:{
        type:Schema.Types.ObjectId,
        ref: "Category",
        required : true
    }
    
},{timestamps : true})

const Product = model("Product",productSchema)

module.exports = Product;
