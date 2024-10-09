const multer = require('multer');
const express = require('express')
const adminRouter = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const adminController = require('../controllers/adminControllers');
const articleController = require('../controllers/articleController');

//admin login
adminRouter.get('/',adminController.loadLogin);
adminRouter.post('/login',adminController.adminLoginPost);

//logout
adminRouter.get('/logout',adminController.logoutGet);

//Dashboard
adminRouter.get('/dashboard',adminController.loadDashboard);

//create admin
adminRouter.get('/adminCreate',adminController.loadAdminCreate);
adminRouter.post('/adminCreate',adminController.adminCreatePost);

//Articles
adminRouter.get('/article',articleController.loadArticles);
//add
adminRouter.get('/addArticle',articleController.loadaddArticles);
adminRouter.post('/addArticle', upload.single('articleImage'),articleController.addArticlesPost);
//edit
adminRouter.get('/editArticle',articleController.loadEditArticle);
adminRouter.post('/editArticle', upload.single('articleImage'),articleController.updateArticle);
//remove
adminRouter.delete('/article',articleController.removeArticle);

module.exports = adminRouter