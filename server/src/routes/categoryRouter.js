
const express = require("express")
const runValidation = require("../validators")
const { isLoggedIn, isLogOut, isAdmin } = require("../middleware/auths")
const { handleCreateCategory,
        handleGetCategory, 
        handleGetOneCategory, 
        handleUpdateCategory,
        handleDeleteCategory 
        } = require("../controllers/categoryController")
const { validateCategory } = require("../validators/category")
const categoryRouter = express.Router()



categoryRouter.post("/",
        validateCategory,
            runValidation,
                isLoggedIn,
                    
                        handleCreateCategory)

categoryRouter.get("/",
        
                isLoggedIn,
                    
                        handleGetCategory)

categoryRouter.get("/:slug",
       
                isLoggedIn,
                    
                        handleGetOneCategory)

categoryRouter.put("/:slug",
        validateCategory,
            runValidation,
                isLoggedIn,
                    isAdmin,
                        handleUpdateCategory)

categoryRouter.delete("/:slug",
                isLoggedIn,
                    
                        handleDeleteCategory)





module.exports = categoryRouter
