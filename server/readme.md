
#E commerce project stact 

Express server

http-errors npm 

For security api -->> xss-clean, 
(It is used to limit login authentication such as per minute 3 attempts can accept for log in)express-rate-limit

BSON--> MongoDB stored data bson format

Schema --> name : string
            email : email
            Schema is used to model


-->>
userModel.js(
    const user = [
    {
    id : 1,
    name : "Mehedi Hassan"
},
    {
    id : 1,
    name : "Mehedi Hassan"
},
    {
    id : 1,
    name : "Mehedi Hassan"
}

]

module.exports = user
)

--<<

mongoose theke Schema and model nite hbe
const {Schema, model} = require('mongoose')

for email validation regular expression must need

userModel.js er jonne => mongoose Schema validator use korte hobe

bcrypt use to password secure 

regular expression

fs module => file system

fs er sathe promise use kore then case er use korte hoy

nodemailer npm is used to send email

use bcryptjs except bcrypt

file upload => npm multer (use as a middleware)
1.Disk storage code copy from multer npm

express-validator => npm is a middleware
{body},{validationResult} require from express-validator

image ke string er maddhome grohon kora hoy ja run validation ba validators>auth.js e ace

buffer er maddhome image ke kom jayga diye stro kora jay => binary


cookieparser = npm i cookie-parser =>need data store by cookie

winstonlogger => console.log er better version(log in related working)

slug holo telephone-smart => ei majher hypen tai holo slug .. eker odhik keyword alada bujate slug use hoy

Category name converted to slug by (npm i slugify) package

Cloudinary is used for storing file such as images


file => form-data theke multer dara file neya hoy
and req.file theke amra file location ta pai
=> server e file store na kore cloudinary te store kra hobe


cloudinary sign in=> api,name,secret paste in .env
export cloudinary 
npm i cloudinary
ei code use hobe jokn user activate kra hoy sekhane user image cloudinary te store kora hoy => activateUserController







