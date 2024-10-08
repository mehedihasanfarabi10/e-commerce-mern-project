/*
https://res.cloudinary.com/coderstar44/
image/upload/v1712038833/
ecommerceMernUserImage/xm1nznbtrfbvgudjyfrw.jpg
delete image by last segment/id => xm1nznbtrfbvgudjyfrw
*/

const cloudinary = require("../config/cloudinary");



const pubicIdWithoutExtensionFromUrl=async(imageUrl)=>{

    const pathSegments = imageUrl.split('/');

    const lastSegment = pathSegments[pathSegments.length-1]

    // const valueWithoutExtension = lastSegment.split('.')[0]; // all file extension can be deleted "jpg", "png" or "jpeg"
    const valueWithoutExtension = lastSegment.replace('.jpg',"") //only jpg files are allowed for deletion
    return valueWithoutExtension

}

const deleteImageFromCloudinary = async(folderName,publicId,modelName)=>{

    try {

        const {result} = await cloudinary.uploader.destroy(`${folderName}/${publicId}`)
        
            if(result!=='ok'){
                throw new Error(
                    `${modelName} image not deleted successful from cloudinary.Please try again`
                )
            }
        
    } catch (error) {
        
    }

}


module.exports = {
    pubicIdWithoutExtensionFromUrl,
    deleteImageFromCloudinary
}