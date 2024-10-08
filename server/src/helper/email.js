

const nodemailer = require("nodemailer");
const { smtpUsername, smtpPassword } = require("../secret");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: smtpUsername,
      pass: smtpPassword,
    },
  });

const emailWithNodeMailer = async(emailData)=>{

    try {
        const mailOptions = {
            from: smtpUsername, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            // text: "Hello world?", // plain text body
            html: emailData.html, // html body
            }
        
            const info = await transporter.sendMail(mailOptions)
        
            console.log("Message sent : %s", info.response)
    } catch (error) {
        console.error("Error occured while sending mail ",error)
        throw error
    }
   

}


module.exports = {
    emailWithNodeMailer
    
}