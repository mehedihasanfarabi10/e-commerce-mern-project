

const httpError = require("http-errors")
const slugify = require("slugify")
const Product = require("../models/productModel")
const { deleteImage } = require("../helper/deleteImage")
const cloudinary = require("../config/cloudinary");
const { pubicIdWithoutExtensionFromUrl,
        deleteImageFromCloudinary,  } = require("../helper/cloudinaryHelper");


const createProduct =async (productData,image) => {
    
    try {

        const {name,description,price,quantity,
            shipping,category} = productData

        const productExist = await Product.exists({name:productData.name})

        if(productExist) {
            // console.log("Product already exists")
            throw httpError(409,"Product with this name already exist.")
        
        }


        // const imageBuffer = image.buffer.toString("base64")

        
        if(image){
            
                const storeProductImage = await cloudinary.uploader.upload(
                            image,{
                                folder : 'ecommerceMernDB/products'
                            }
                )
                // console.log(response)
                //cloudinary ekta secure_url make korbe setai use kre image store hoy
    
                productData.image = storeProductImage.secure_url;
            
        }
        
        //create product

        const product = await Product.create({
            ...productData,
        slug:slugify(productData.name)})

        

        return product
            
    } catch (error) {
      
        console.log(error.message)
    }
}

const getAllProducts =async (page=1,limit=5,search={}) => {
    
    try {

        // ".*" first or last not matter if search result will match any name
        const searchRegEx = new RegExp(".*"+search+".*","i");

        //filter if he admin

        const filter = {
            
            $or :[
                {name : {
                    $regex : searchRegEx
                }},
                // {email : {
                //     $regex : searchRegEx
                // }},
                // {phone : {
                //     $regex : searchRegEx
                // }},
            ]
        }

        //populate used for category dividing except category id

        const products = await Product.find(filter)
                    .populate('category').skip((page-1)*limit)
                    .limit(limit)
                    .sort({createdAt : -1})


        /*const products = await Product.find({})
                    .populate('category').skip((page-1)*limit)
                    .limit(limit)
                    .sort({createdAt : -1})
        */

        if(!products){
            throw httpError(404,"No product found")
        }
        
        const count = await Product.find(filter)
                        .countDocuments()
        
        // const count = await Product.find({})
        //                 .countDocuments()


        return {
            products,
            count
        }

            
    } catch (error) {
      
        console.log(error.message)
    }
}

const getOneProductBySlug =async (slug) => {
    
    try {

        //populate used for category dividing except category id

        const product = await Product.findOne({slug})
                        .populate('category')
       


        if(!product){
            throw httpError(404,"No product found")
        }
        

        return {
            product
        }

            
    } catch (error) {
      
        console.log(error.message)
    }
}

const deleteOneProductBySlug =async (slug) => {
    
    try {

        const existingProduct = await Product.findOne({slug})
        
        // if(existingProduct && existingProduct.image){
        //     await deleteImage(existingProduct.image)
        // }

        if(existingProduct && existingProduct.image){
            const publicIdForProduct = await pubicIdWithoutExtensionFromUrl(existingProduct.image);
            //helper folder theke function used kra hoyece
            await deleteImageFromCloudinary('ecommerceMernDB/products', publicIdForProduct,'Product')
        }
        
        
        await Product.findOneAndDelete({slug})
            
    } catch (error) {
      
        throw error
    }
}

const updateProductBySlug =async (slug,updates,image,updateOption) => {
    
    try {

        const product = await Product.findOne({slug:slug})

        if(!product){
            throw httpError(404,"Product does not exist with this slug")
        }

        if(updates.name){
            updates.slug = slugify(updates.name)
           }
       
           if(image){
            if(image.size > 1024 * 1024 * 10) {
                throw new Error("Image size is too large. Must be less than 10 mb")
            }
            /* previous image update code
            updates.image = image
            //replace existing image with new
            product.image !== "default.png" && deleteImage(product.image)
            //image convert to buffer string
            // updates.image = image.buffer.toString("base64")
            */
            // Now image update code
            
            const response = await cloudinary.uploader.upload(image,{
                folder : 'ecommerceMernDB/products'
            }) 
            
            updates.image = response.secure_url;

            
           }
    
    
    
           const updatedProduct = await 
           Product.findOneAndUpdate({slug},updates,
            updateOption)
    
           if(!updatedProduct){
    
            throw httpError(404,"Product does not exist with this slug")
    
           }

           //delete previous cloudinary image
           //id generate
           if(product.image){
            const publicIdForProductExistImage = await pubicIdWithoutExtensionFromUrl(
                        product.image
            )
            //delete
            await deleteImageFromCloudinary('ecommerceMernDB/products',
                            publicIdForProductExistImage,'Product')
           }
    
    
    
        
        

        return {
            updatedProduct
        }

            
    } catch (error) {
      
        console.log(error.message)
    }
}



module.exports = {
        createProduct,
        getAllProducts,
        getOneProductBySlug,
        deleteOneProductBySlug,
        updateProductBySlug,
}