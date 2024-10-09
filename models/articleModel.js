const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    
      Name: {
        type: String,
        required: true,
      },
      Category: {
        type: String,
      },
      Author: {
        type: String,
        required: true,
      },
      Institution: {
        type: String,
        required: true,
      },
      Description: {
        type: String,
        default: '',
      },
      Content: {
        type: String,
        required: true,
      },
      articleImage: {
        type: String,
        required: true,
      },
      imageDeleteHash:{
        type:String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );


const articleModel = mongoose.model('articles',articleSchema)

module.exports = articleModel