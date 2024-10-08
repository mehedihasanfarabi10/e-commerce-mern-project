
const express = require("express")
const { handleGetUser,
      handleFindUserById,
      handleDeleteUserById, 
      handleProcessRegister,
      handleActivateUserAccount,
      handleUpdateUserById,
      handleManageStatusById,
      handleUpdatePassword,
      handleForgetPassword,
      handleResetPassword
      
      } = require("../controllers/userController")
const {userImageUpload} = require("../middleware/uploadFile")
const { validateUserRegistration,
        validateUserPasswordUpdate, 
        validateUserForgetPassword, 
        validateUserResetPassword 
        } = require("../validators/auth")
const runValidation = require("../validators")
const { isLoggedIn, isLogOut, isAdmin } = require("../middleware/auths")
const router = express.Router()



router.get("/",
        isLoggedIn,
            
                handleGetUser)

router.post("/process-register",
        userImageUpload.single("image"),
            isLogOut,
                validateUserRegistration,
                    runValidation,
                        handleProcessRegister)

router.post("/verify",
        isLogOut,
            handleActivateUserAccount)
// router.get("/verify/data",activateUserAccount)

router.get("/:id([0-9a-fA-F]{24})",
        isLoggedIn,
            handleFindUserById)

router.delete("/:id([0-9a-fA-F]{24})",
        isLoggedIn,
            handleDeleteUserById)
   


router.put("/manage-user/:id([0-9a-fA-F]{24})",
        isLoggedIn,
            isAdmin,
            handleManageStatusById)

router.put("/update-password/:id([0-9a-fA-F]{24})",
        validateUserPasswordUpdate,
        runValidation,
        isLoggedIn,
            handleUpdatePassword)

// router.put("/unban-user/:id",
//         isLoggedIn,
//             isAdmin,
//                 unBanUserById)

router.post("/forget-password/",
    validateUserForgetPassword,
        runValidation,
            handleForgetPassword)

router.put("/reset-password/",
    validateUserResetPassword,
        runValidation,
            handleResetPassword)

            //ei put router niche rakha hyece karon uporer put router use korte problem hoy
         
            router.put("/:id([0-9a-fA-F]{24})",
            userImageUpload.single("image"),
                isLoggedIn,
                    handleUpdateUserById)

router.get("/profile",(req, res) => {
    
    res.status(200).send({
        message : "User profile Returned",
        
    })
})


module.exports = router
