const multer = require("multer")
const path = require("path")
const httpError = require("http-errors");
const { UPLOAD_USER_IMAGE_DIRECTORY,
   ALLOWED_FILE_TYPES, 
   MAX_FILE_SIZE, 
   UPLOAD_PRODUCT_IMAGE_DIRECTORY } = require("../config");

// const storage = multer.memoryStorage()

const storage = multer.diskStorage({
  //server store image file
  
  // destination: function (req, file, cb) {
  //   cb(null,UPLOAD_USER_IMAGE_DIRECTORY)
  // },
  filename: function (req, file, cb) {

      const extensionName = path.extname(file.originalname)
      cb(null,Date.now() + "-" + file.originalname.replace(extensionName,"")
      +extensionName)

  //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  //   cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

//productImage upload
const productStorage = multer.diskStorage({
  //server store image file

  // destination: function (req, file, cb) {
  //   cb(null,UPLOAD_PRODUCT_IMAGE_DIRECTORY)
  // },
  filename: function (req, file, cb) {

      const extensionName = path.extname(file.originalname)
      cb(null,Date.now() + "-" + file.originalname.replace(extensionName,"")
      +extensionName)

  //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  //   cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
  //filtering image files

  const fileFilter = (req, file, cb) => {

    if(!file.mimetype.startsWith("image/")){
      return cb(new Error("File type not allowed"),
      false)
    }
    if(file.size > MAX_FILE_SIZE){
      return cb(new Error("File too large"),
      false)
    }
    if(!ALLOWED_FILE_TYPES.includes(file.mimetype)){
      return cb(new Error("File extion is not allowed"),
      false)
    }

    cb(null, true)


  }


  
  const userImageUpload = multer({ 
    storage: storage,
    
    fileFilter : fileFilter
    
})

  
  const productImageUpload = multer({ 
    storage: productStorage,
    
    fileFilter : fileFilter
    
})


  module.exports = {
    userImageUpload,
    productImageUpload
  };