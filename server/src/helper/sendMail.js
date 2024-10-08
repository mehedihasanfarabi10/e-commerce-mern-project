const { emailWithNodeMailer } = require("./email")
const httpError = require("http-errors")

const sendMail = async(emailData)=>{
    
    try {
        await emailWithNodeMailer(emailData)
    } catch (emailError) {
        throw httpError(500,"Failed to send verification email")
        

        //if error occured then success response e r jabena jeta return kaj kore

    }
}

module.exports = {sendMail}