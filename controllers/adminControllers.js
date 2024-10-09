const adminModel = require('../models/adminModel');
const bcrypt = require("bcrypt");

exports.loadDashboard = async (req, res) => {
    try {
        if (!req.session.id) {
            return res.redirect('/admin');
        }
        res.render('admin/dashboard');
      
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

//login
exports.loadLogin = async (req, res) => {
    try {
        if (req.session.id) {
            res.redirect('/admin/dashboard'); 
        } else {
            res.render('/admin/login');
        }
    } catch (err) {
        console.error('Error on login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getLogin = async (req, res) => {
    try {
            res.render('/admin/login');
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.adminLoginPost = async (req, res) => {
    try {
        const {Email,Password} = req.body
        const exisistUser = await adminModel.findOne({ Email })
        if(!exisistUser){
            return res.json('admin does not exist ')
        }else{
            const passwordCheck = await bcrypt.compare(Password,exisistUser.Password)
            if(passwordCheck){
                res.redirect('/admin/dashboard');
            }else{
                res.status(400).json('Invalid password')
            }
        }
    
    } catch (err) {
        console.error('Error on login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//admin Create
exports.loadAdminCreate = async (req, res) => {
    try {
        if (!req.session.id) {
            return res.redirect('/admin/login');
        }
        res.render('admin/adminCreate');
    } catch (err) {
        console.error('Error on render:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.adminCreatePost = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;

        //Regex expressions
        const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        // Check if email already exists
        const existUser = await adminModel.findOne({ Email: Email });
        
        if (existUser) {
            return res.status(422).json({ message: 'Already used this email' });
        }

        // Validate email and password format using regex
        else if (!emailRegex.test(Email)) {
            return res.status(422).json({ message: 'Invalid email address' });
        }

        else if (!passwordRegex.test(Password)) {
            return res.status(422).json({ message: 'Invalid Password' });
        }
        else {
            const hashedPassword = await bcrypt.hash(Password, 10);
            const admin = new adminModel({
                Name: Name,
                Email: Email,
                Password: hashedPassword,
            });
            const adminData = await admin.save();

            res.redirect('/admin/dashboard');
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.logoutGet=(req,res)=>{
    req.session.destroy()
    res.redirect("/admin/login")
}

