const multer = require('../middlewares/multer')
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
        }= req.body

        // const articleImage = req.file;

        // if (!articleImage) {
        //     // 'No file uploaded'
        // }

        const imgurResponse = await multer.uploadToImgur(articleImage.buffer);
        const imageUrl = imgurResponse.link;
        const imageDeleteHash = imgurResponse.deletehash;
        

        const article = new articleModel({
            Name: Name,
            Category: Category,
            Author: Author,
            Institution : Institution,
            Description : Description,
            Content : Content,
            articleImage : imageUrl,
            imageDeleteHash : imageDeleteHash
            
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
        }= req.body

        const articleImage = req.file;

        if (!articleImage) {
            // 'No file uploaded'
        }

        const imgurResponse = await multer.uploadToImgur(articleImage.buffer);
        const imageUrl = imgurResponse.link;
        const imageDeleteHash = imgurResponse.deletehash;

        // if (article.imageDeleteHash) {
        //     await multer.deleteFromImgur(article.imageDeleteHash);
        // }

        // articleImage : imageUrl,
        // imageDeleteHash : imageDeleteHash

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