const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController');

//home
userRouter.get('/',userController.loadHome);

//about us
userRouter.get('/aboutUs',userController.getAboutUs);

//article details
userRouter.get('/articleDetails',userController.getArticleDetails);


module.exports = userRouter