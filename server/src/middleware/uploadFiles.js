const multer = require("multer")
const path = require("path")
const httpError = require("http-errors");
const { UPLOAD_USER_IMAGE_DIRECTORY, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } = require("../config");
// const { uploadDirectory } = require("../secret")

// const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 1024 * 1024 * 10; // 10 mb max file size
// const MIN_FILE_SIZE = process.env.MIN_FILE_SIZE || 1024 * 1024 * 10; 
// const ALLOWED_FILE = process.env.ALLOWED_FILE || ["jpg","jpeg","png"]
// const uploadDir = uploadDirectory;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,UPLOAD_USER_IMAGE_DIRECTORY)
    },
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

    const extensionName = path.extname(file.originalname)

    if(!ALLOWED_FILE_TYPES.includes(extensionName.substring(1))){ 
        //1 means it check start after . such as .jpg

        // const error = httpError(400,"File type not allowed")
        // return cb(error)

        //2nd way

        return cb(new Error("File type not allowed"),
        false)

    }

    cb(null, true)


  }


  
  const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: MAX_FILE_SIZE
    },
    fileFilter : fileFilter
    
})


  module.exports = upload;