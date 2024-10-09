const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    
    Name: {
        type: String,
        required: true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})

const adminModel = mongoose.model('admin',adminSchema)

module.exports = adminModel