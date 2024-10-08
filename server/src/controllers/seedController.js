
const data = require("../data");
const Product = require("../models/productModel");
const userModels = require("../models/userModel")


const seedUser = async(req,res,next) => {

    try {
        //delete all existing user
        await userModels.deleteMany({})
        //inserting  user

        const userData = await userModels.insertMany(data.users)
        
        //successfully response
        return res.status(201).json(userData)
    } catch (error) {
        next(error);
        //this error will be shown in the app.js file error handler


    }

}


const seedProducts = async(req,res,next) => {

    try {
        //delete all existing user
        await Product.deleteMany({})
        //inserting  user

        const productData = await Product.insertMany(data.products)
        
        //successfully response
        return res.status(201).json(productData)
    } catch (error) {
        next(error);
        //this error will be shown in the app.js file error handler


    }

}


module.exports = {seedUser,seedProducts}