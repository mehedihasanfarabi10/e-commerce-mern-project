
const {Schema,model} = require("mongoose")

const bcrypt = require("bcryptjs");
const { defaultImage } = require("../secret");


const userSchema = new Schema({
    name : {
        type : String,
        required : [true,"User is required"],
        trim : true,
        maxlength : [31, "Max length is 31 characters"],
        minlength : [4, "Min length is 4 characters"],
    },
    email : {
        type : String,
        required : [true,"Email is required"],
        trim : true,
        lowercase : true,
        unique : true,
        validate : {
            validator : function (v) {
               return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
               
            },
            message : "Please enter a valid email address"
            
        }
    },
    password: {
        type : String,
        required : [true,"Password is required"],
        
        maxlength : [100, "Max length is 100 characters"],
        minlength : [6, "Min length is 6 characters"],

        set: function(v) {
            return bcrypt.hashSync(v, bcrypt.genSaltSync(10));
        }
    },

    image : {
        // type : String,
        type : String,
        default : defaultImage,
        // contentType : String,
        required : [true,"Image must be * required"],
        
    },
    address : {
        type : String,
        required : [false,"User address is required"],
        minlength : [3, "Min length is 3 characters"],
    },
    phone : {
        type : String,
        required : [false,"User phone is required"]
    },
    isAdmin  : {
        type : Boolean,
        default : false
    },
    isBanned : {
        type : Boolean,
        default : false
    },
},{timestamps : true})

const User = model("Users",userSchema)

module.exports = User;
