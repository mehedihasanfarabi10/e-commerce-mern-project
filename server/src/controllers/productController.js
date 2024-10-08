const httpError = require("http-errors")

const { successResponse } = require("./responseController")

const mongoose = require("mongoose")
const { findWithId} = require("../services/findItem")
const slugify = require("slugify")
const { deleteImage } = require("../helper/deleteImage")
const Product = require("../models/productModel")
const { createProduct, getAllProducts, getOneProductBySlug, deleteOneProductBySlug, updateProductBySlug } = require("../services/productService")



const handleCreateProduct =async (req, res,next) => {
    
    try {

        const {name,description,price,quantity,
        shipping,category} = req.body;
        
    
        const image = req.file?.path;


        const productExist = await Product.exists({name:name})

        if(productExist) {
            // console.log("Product already exists")
            throw httpError(409,"Product with this name already exist.")
        
        }

        const productData = {name,description,price,quantity,
            shipping,category,image}

        if(image && image.size > 1024 * 1024 * 10) {
            throw new Error("Image size is too large. Must be less than 10 mb")
        }

        const product = await createProduct(productData,image)


        return successResponse(res,{
            statusCode : 200,
            message : "Product was created successful",
            payload : {
                product
            }
        })



    } catch (error) {
      
        next(error)
    }
}

const handleGetAllProducts =async (req, res,next) => {
    
    try {
        const search = req.query.search || ""
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5



       const productsData = await getAllProducts(
                        page,limit,search
       )

        return successResponse(res,{
            statusCode : 200,
            message : "All products returned successful",
            payload : {
                products: productsData.products,
                pagination : {
                    totalPage : Math.ceil(productsData.count/limit),
                    currentPage : page,
                    previousPage : page - 1 > 0 ? page -1: null,
                    nextPage : page + 1 <= Math.ceil(productsData.count/limit) ? page +1 : null,
                    totalNumberOfProducts : productsData.count
                }
            }
        })



    } catch (error) {
      
        next(error)
    }
}

const handleGetOneProduct =async (req, res,next) => {
    
    try {

        const {slug} = req.params;

        const product = await getOneProductBySlug(slug)

        if(!product){
            throw httpError(404,"Product not found")
        }

        return successResponse(res,{
            statusCode : 200,
            message : "One product returned successful",
            payload : {
                product: product,
                
            }
        })



    } catch (error) {
      
        next(error)
    }
}

const handleDeleteOneProduct =async (req, res,next) => {
    
    try {

        const {slug} = req.params;

        const productDelete = await deleteOneProductBySlug(slug)
        // if(!productDelete){
        //     throw httpError(400,"Deleted unsuccessful!")
        // }
        return successResponse(res,{
            statusCode : 200,
            message : "This product is successfully deleted.",
            
        })



    } catch (error) {
      
        next(error)
    }
}


const handleUpdateProductBySlug =async (req, res,next) => {
    
    try {

        const {slug}= req.params;
        const updates = {}
      
        
        const updateOption = {new : true,
        runValidators : true, context : "query"}
        
        const allowedFields = ["name",
                               "description",
                               "price",
                               "sold",
                                "quantity",
                                "shipping"
                                ]

       for(let key in req.body){
        if(allowedFields.includes(key)){
            updates[key] = req.body[key]
        }
        

       }

       const image = req.file?.path;

       const updatedProduct = await updateProductBySlug(slug,updates,image,updateOption)
       
        return successResponse(res,{
            statusCode : 200,
            message : "Product was updated successfully",
            payload : updatedProduct
        })



    } catch (error) {
      
        next(error)
    }
}



module.exports = {
        handleCreateProduct,
        handleGetAllProducts,
        handleGetOneProduct,
        handleDeleteOneProduct,
        handleUpdateProductBySlug,
        
}