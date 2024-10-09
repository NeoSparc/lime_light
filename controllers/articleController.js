const articleModel = require('../models/articleModel')

//Articles
exports.loadArticles = async (req, res) => {
    try {
        const articleList = await articleModel.find({});
      res.render('admin/article',{articleList:articleList})
      
    } catch (err) {
        console.error('Error on render', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.loadaddArticles= async (req, res) => {
    try {
        res.render('admin/addArticle');
    } catch (err) {
        console.error('Error on render:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.addArticlesPost= async (req, res) => {
    try {
        const {
            Name,
            Category,
            Author,
            Institution,
            Description,
            Content,
            image
        }= req.body
        const article = new articleModel({
            Name: Name,
            Category: Category,
            Author: Author,
            Institution : Institution,
            Description : Description,
            Content : Content,
            image : image,
            
        });
        const articleDatas = await article.save();
        res.redirect('/admin/article')

    } catch (err) {
        console.error('Error on render:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.loadEditArticle = async (req, res) => {
    try {
        const id = req.query.id
        console.log(id);
        const articleData = await articleModel.findById({ _id: id });
      
      if (articleData) {
        res.render('admin/editArticle', { articleData: articleData });
        } 
    } catch (err) {
        console.error('Error on render', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateArticle= async (req, res) => {
    try {
        const {
            Name,
            Category,
            Author,
            Institution,
            Description,
            Content,
            image
        }= req.body
        console.log(req.body);
        const article = new articleModel({
            Name: Name,
            Category: Category,
            Author: Author,
            Institution : Institution,
            Description : Description,
            Content : Content,
            image : image,
            
        });
        console.log(article);
        const articleDatas = await article.save();
        res.redirect('/admin/article')

    } catch (err) {
        console.error('Error on render:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};