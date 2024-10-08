const fs = require("fs").promises

const deleteImage = async(userImagePath) =>{

    try {
        //using async await except then case
        console.log("Deleted image")
    await fs.access(userImagePath)  
    await fs.unlink(userImagePath);
    console.log("Image was deleted")
    } catch (error) {
        console.error("User image doest not exist")
        throw error
    }


    // fs.access(userImagePath)
    // .then(()=> fs.unlink(userImagePath))
    // .then(()=>console.log("User image was deleted"))
    // .catch((error)=> console.error("User image doest not exist"))


}

module.exports = {
    deleteImage
}