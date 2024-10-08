const Category = require("../models/categoryModel");
const httpError = require("http-errors")
const slugify = require("slugify")

const createCategory =async (name) => {
    
    try {

        


        const newCategory = await Category.create(
                    {name: name,
                    slug: slugify(name)}
                    )

        return newCategory
    } catch (error) {
      
        console.log(error.message)
    }
}

const getAllCategory =async () => {
    
    try {

        //lean used for js object creation not mongoDB object
        const category = await Category.find().select('name slug').lean()
        if(!category){
            throw httpError(404,"Category not found")
        }

        return category
    } catch (error) {
      
        console.log(error.message)
    }
}

const getOneCategory =async (slug) => {
    
    try {
        return await Category.find({slug}).select('name slug').lean()
        
    } catch (error) {
      
        console.log(error.message)
    }
}

const updateCategory =async (name,slug) => {
    
    try {
        
        const updateCategory = await Category.findOneAndUpdate(
            {slug},
            {$set:{name:name,slug:slugify(name)}},
            {new:true}
        )
        return updateCategory
    } catch (error) {
      
        console.log(error.message)
    }
}

const deleteCategory =async (slug) => {
    
    try {
        
        const deleteCategory = await Category.findOneAndDelete({slug})
        if(!deleteCategory){
            throw httpError(404,"Category deleted not successful")
        }
        return deleteCategory
    } catch (error) {
      
        console.log(error.message)
    }
}


module.exports ={
        createCategory,
        getAllCategory,
        getOneCategory,
        updateCategory,
        deleteCategory,

}