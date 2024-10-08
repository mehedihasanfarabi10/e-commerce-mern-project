
const express = require("express")
const runValidation = require("../validators")
const { isLoggedIn, isLogOut, isAdmin } = require("../middleware/auths")

const { handleCreateProduct, 
        handleGetAllProducts, 
        handleGetOneProduct,
        handleDeleteOneProduct,
        handleUpdateProductBySlug} = require("../controllers/productController")
const { validateProduct } = require("../validators/product")
const { productImageUpload } = require("../middleware/uploadFile")

const productRouter = express.Router()


//api/products
productRouter.post("/",  
                productImageUpload.single("image"),
                    validateProduct,
                        runValidation,
                            isLoggedIn,
                                    handleCreateProduct)

productRouter.get("/",  
                    handleGetAllProducts)

productRouter.get("/:slug",  
                    handleGetOneProduct)

productRouter.delete("/:slug",
                isLoggedIn,
                    handleDeleteOneProduct)

productRouter.put("/:slug",
                isLoggedIn,
                    productImageUpload.single("image"),
                        handleUpdateProductBySlug)






module.exports = productRouter
