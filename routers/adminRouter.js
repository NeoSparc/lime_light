const express = require('express')
const adminRouter = express.Router()

const adminController = require('../controllers/adminControllers');
const articleController = require('../controllers/articleController');

//admin login
adminRouter.get('/',adminController.loadLogin);
adminRouter.post('/login',adminController.adminLoginPost);

//Dashboard
adminRouter.get('/dashboard',adminController.loadDashboard);

//create admin
adminRouter.get('/adminCreate',adminController.loadAdminCreate);
adminRouter.post('/adminCreate',adminController.adminCreatePost);

//Articles
adminRouter.get('/article',articleController.loadArticles);
//add
adminRouter.get('/addArticle',articleController.loadaddArticles);
adminRouter.post('/addArticle',articleController.addArticlesPost);
//edit
adminRouter.get('/editArticle',articleController.loadEditArticle);
adminRouter.post('/editArticle',articleController.updateArticle);


module.exports = adminRouter