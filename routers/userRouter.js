const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')

userRouter.get('/',userController.loadHome);
userRouter.get('/aboutUs',userController.getAboutUs);

module.exports = userRouter