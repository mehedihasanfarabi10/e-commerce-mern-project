const Category = require("../models/categoryModel");
const { createCategory, 
        getAllCategory, 
        getOneCategory, 
        updateCategory, 
        deleteCategory } = require("../services/categoryService");
const { successResponse } = require("./responseController")
const httpError = require("http-errors")
const slugify = require("slugify")

const handleCreateCategory =async (req, res,next) => {
    
    try {

        const {name} = req.body;

        // console.log(slugify(name));

        const newCategory =await createCategory(name)

        return successResponse(res,{
            statusCode : 201,
            message : "Category created successfully",
            payload : {
                newCategory
            }
        })



    } catch (error) {
      
        next(error)
    }
}

const handleGetCategory =async (req, res,next) => {
    
    try {

        const category = await getAllCategory()
        return successResponse(res,{
            statusCode : 201,
            message : "All category returned successfully",
            payload : {
                category
            }
        })



    } catch (error) {
      
        next(error)
    }
}

const handleGetOneCategory =async (req, res,next) => {
    
    try {  

        const {slug} = req.params;

        const categoryOne = await getOneCategory(slug)
        return successResponse(res,{
            statusCode : 201,
            message : "One category returned successfully",
            payload : {
                categoryOne
            }
        })



    } catch (error) {
      
        next(error)
    }
}

const handleUpdateCategory =async (req, res,next) => {
    
    try {  

        const {name} = req.body;
        const {slug} = req.params;

        const updatedCategory =await updateCategory(name,slug)
        if(!updatedCategory){
            throw httpError(404,"No category was found with this slug.")
        }
        return successResponse(res,{
            statusCode : 201,
            message : "Category was updated successfully",
            payload : {
                updatedCategory
            }
        })
        



    } catch (error) {
      
        next(error)
    }
}

const handleDeleteCategory =async (req, res,next) => {
    
    try {  

        const {slug} = req.params;

        await deleteCategory(slug);

        return successResponse(res,{
            statusCode : 200,
            message : "Category deleted successfully",
            
        })
        



    } catch (error) {
      
        next(error)
    }
}


module.exports ={
        handleCreateCategory,
        handleGetCategory,
        handleGetOneCategory,
        handleUpdateCategory,
        handleDeleteCategory
}