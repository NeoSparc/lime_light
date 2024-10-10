const articleModel = require('../models/articleModel')


exports.loadHome = async(req,res)=>{
    try{
        const articleList = await articleModel.find({});
        res.render('user/home',{articleList:articleList})//articleList:articleList
    }
    catch(err){
        console.log('error on login',err);
        res.status(500).json('Internal server error');
    }
}

exports.getAboutUs = async (req, res) => {
    try {
       
             res.render('user/aboutUs');
        
      
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getArticleDetails = async (req, res) => {
    try {
        const articleId = req.query.id;
        console.log(articleId);
        
        // Use findById directly with articleId
        const articleData = await articleModel.findById(articleId);
        
        if (!articleData) {
            return res.status(404).json('Article not found');
        }
        
        res.render('user/articleDetails', { articleData });
    } catch (err) {
        console.log('Error in fetching article', err);
        res.status(500).json('Internal server error');
    }
}
