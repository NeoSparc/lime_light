

exports.loadHome = async(req,res)=>{
    try{
        res.render('user/home')
    }
    catch(err){
        console.log('error on login',err);
        res.status(500).json('Internal server error');
    }
}