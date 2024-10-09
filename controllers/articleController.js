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

        const articleImage = req.file;

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
        const articleData = await articleModel.findById({ _id: id });
      
      if (articleData) {
        res.render('admin/editArticle', { articleData: articleData });
        } 
    } catch (err) {
        console.error('Error on render', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.updateArticle = async (req, res) => {
    try {
        const articleId = req.body.id;
        if (!articleId) {
            return res.status(400).json({ message: "Article ID is required" });
        }

        const existingArticle = await articleModel.findById(articleId);
        if (!existingArticle) {
            return res.status(404).json({ message: "Article not found" });
        }

        const { Name,Category,Author,Institution,Description,Content } = req.body;

        const articleImage = req.file;
        let imageUrl;
        let imageDeleteHash;

        if (articleImage) {
            const imgurResponse = await multer.uploadToImgur(articleImage.buffer);
            imageUrl = imgurResponse.link;
            imageDeleteHash = imgurResponse.deletehash;

            // Delete old image if it exists
            if (existingArticle.ImageDeleteHash) {
                await multer.deleteFromImgur(existingArticle.ImageDeleteHash);
            }
        }

        const updatedArticle = await articleModel.findOneAndUpdate(
            { _id:articleId },
            {
                Name,
                Category,
                Author,
                Institution,
                Description,
                Content,
                articleImage:imageUrl,
                imageDeleteHash
            },
            { new: true } 
        );

        res.redirect("/admin/article");
    } catch (err) {
        console.error('Error updating article:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};