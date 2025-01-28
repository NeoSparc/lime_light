const articleModel = require('../models/articleModel');

exports.loadHome = async (req, res) => {
    try {
        // Redirect logged-in admin users
        if (req.session.email) {
            return res.redirect('/admin/dashboard');
        }

        // Fetch all articles, sorted by creation date (newest first)
        const articleList = await articleModel.find({}).sort({ _id: -1 });

        // Render home page with article list
        res.render('user/home', { articleList });
    } catch (err) {
        console.error('Error loading home page:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAboutUs = async (req, res) => {
    try {
        // Redirect logged-in admin users
        if (req.session.email) {
            return res.redirect('/admin/dashboard');
        }

        // Render About Us page
        res.render('user/aboutUs');
    } catch (error) {
        console.error('Error loading About Us page:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getArticleDetails = async (req, res) => {
    try {
        // Redirect logged-in admin users
        if (req.session.email) {
            return res.redirect('/admin/dashboard');
        }

        // Extract article ID from query parameters
        const articleId = req.query.id;

        if (!articleId) {
            return res.status(400).json({ message: 'Article ID is required' });
        }

        // Fetch article data by ID
        const articleData = await articleModel.findById(articleId);

        // Handle case where article is not found
        if (!articleData) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Render article details page with fetched data
        res.render('user/articleDetails', { articleData });
    } catch (err) {
        console.error('Error fetching article details:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
