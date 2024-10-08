

const UPLOAD_USER_IMAGE_DIRECTORY = "public/images/users"
const UPLOAD_PRODUCT_IMAGE_DIRECTORY = "public/images/products"

const MAX_FILE_SIZE = 2097152


const ALLOWED_FILE_TYPES = ["image/jpg","image/jpeg","image/png"]
// const ALLOWED_FILE_TYPES = ["jpg","jpeg","png"]

module.exports = {
    UPLOAD_USER_IMAGE_DIRECTORY,
    MAX_FILE_SIZE,
    ALLOWED_FILE_TYPES,
    UPLOAD_PRODUCT_IMAGE_DIRECTORY
}