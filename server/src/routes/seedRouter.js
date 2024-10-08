

const express = require('express');
const { seedUser, seedProducts } = require('../controllers/seedController');
const {userImageUpload, productImageUpload} = require('../middleware/uploadFile');

const seedRouter = express.Router();

seedRouter.get("/seeddata",userImageUpload.single("image"),seedUser)
seedRouter.get("/productseed",productImageUpload.single("image"),seedProducts)


module.exports = seedRouter;