const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/connection');
const mongoStore = require('connect-mongo');
const session=require('express-session');
const nocache=require('nocache');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; 
const secret = process.env.SECRET

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret,
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: process.env.MONGOURL })
}))
app.use(nocache())

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/admin',express.static('./public/admin'))
app.use('/user',express.static('./public/user'))
app.use(express.static('./public'))


// For admin route
const admin = require("./routers/adminRouter");
app.use("/admin", admin);

// For user route
const user = require("./routers/userRouter");
app.use("/", user);

// Database connection and server start
dbConnect().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((err) => {
    console.error('Database connection failed:', err);
});
