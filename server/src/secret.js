require("dotenv").config()
const PORT = process.env.SERVER_PORT || 3003;
const mongoUrl = process.env.MONGO_URL
const defaultImage = process.env.DEFAULT_IMAGE || "public/images/users/pss.jpg"
 
const jwtActivationKey = process.env.JWT_KEY || "12345677"
const jwtAccessKey = process.env.JWT_ACCESS_KEY || "949494"
const jwtResetKey = process.env.JWT_RESET_KEY || "94949494444"
const jwtRefreshKey = process.env.JWT_REFRESH_KEY || "34343434"

const smtpUsername = process.env.SMTP_USERNAME
const smtpPassword = process.env.SMTP_PASSWORD

const clientUrl = process.env.CLIENT_URL || "http://localhost:4002"

const uploadDirectory = process.env.UPLOAD_FILE || "public/images/users"


module.exports = {PORT,
    mongoUrl,defaultImage,
    jwtActivationKey,
    smtpUsername,smtpPassword,
    clientUrl,
    uploadDirectory,
    jwtAccessKey,
    jwtResetKey,
    jwtRefreshKey
}